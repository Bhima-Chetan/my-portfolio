import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0,
  baseRotation = 2,
  blurStrength = 6,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "center center",
  wordAnimationEnd = "center center"
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    // Split by words but preserve spaces and punctuation
    return text.split(/(\s+)/).filter(Boolean).map((word, index) => {
      if (word.match(/^\s+$/)) {
        return <span key={`space-${index}`}>{word}</span>;
      }
      return (
        <span className="word" key={`word-${index}`} style={{ display: 'inline-block' }}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    // Refresh ScrollTrigger to ensure accurate calculations
    ScrollTrigger.refresh();

    // Set initial states
    gsap.set(el, { 
      transformOrigin: '0% 50%', 
      rotate: baseRotation,
      opacity: 1
    });

    const wordElements = el.querySelectorAll('.word');
    
    gsap.set(wordElements, {
      opacity: baseOpacity,
      filter: enableBlur ? `blur(${blurStrength}px)` : 'blur(0px)',
      willChange: 'opacity, filter',
      y: 10
    });

    // Rotation animation
    gsap.to(el, {
      ease: 'power2.out',
      rotate: 0,
      duration: 1,
      scrollTrigger: {
        trigger: el,
        scroller,
        start: 'top 85%',
        end: 'top 30%',
        scrub: 1,
        refreshPriority: 1,
        invalidateOnRefresh: true
      },
    });

    // Word-by-word reveal animation
    gsap.to(wordElements, {
      ease: 'power2.out',
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: {
        amount: 1.5,
        from: 'start'
      },
      scrollTrigger: {
        trigger: el,
        scroller,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1.5,
        refreshPriority: 1,
        invalidateOnRefresh: true
      },
    });

    // Blur removal animation
    if (enableBlur) {
      gsap.to(wordElements, {
        ease: 'power2.out',
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: {
          amount: 1.2,
          from: 'start'
        },
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1.5,
          refreshPriority: 1,
          invalidateOnRefresh: true
        },
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === el || el.contains(trigger.trigger)) {
          trigger.kill();
        }
      });
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <div className={`scroll-reveal-text ${textClassName}`}>
        {splitText}
      </div>
    </div>
  );
};

export default ScrollReveal;
