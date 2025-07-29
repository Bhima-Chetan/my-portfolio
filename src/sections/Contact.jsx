// src/sections/Contact.jsx
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMessage('');
    setMessageType('');

    const serviceID = 'service_kjgstfs';
    const templateID = 'template_nag94kb';
    const publicKey = 'UCRBAgp37vG9hpOez';

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          setStatusMessage('Your message has been sent successfully!');
          setMessageType('success');
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
          setStatusMessage('Failed to send the message. Please try again.');
          setMessageType('error');
        }
      )
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <section id="contact" className="contact-section">
      <motion.div 
        className="contact-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Contact Me
        </motion.h2>
        
        <motion.p 
          className="contact-description"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Let's work together! I'd love to hear about your project ideas.
        </motion.p>

        <motion.form 
          ref={form}
          onSubmit={sendEmail} 
          noValidate
          className="contact-form"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="form-row">
            <div className="form-group">
              <motion.input 
                type="text" 
                name="name"
                placeholder="Your Name" 
                required
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </div>

            <div className="form-group">
              <motion.input 
                type="email" 
                name="email"
                placeholder="Your Email" 
                required
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>

          <div className="form-group">
            <motion.input 
              type="text" 
              name="subject"
              placeholder="Subject" 
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <div className="form-group">
            <motion.textarea 
              name="message"
              placeholder="Your Message" 
              required
              rows="6"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            ></motion.textarea>
          </div>
          
          {statusMessage && <p className={`form-message ${messageType}`}>{statusMessage}</p>}

          <motion.button 
            type="submit"
            className="submit-button"
            disabled={isSending}
            whileHover={{ scale: isSending ? 1 : 1.05 }}
            whileTap={{ scale: isSending ? 1 : 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {isSending ? 'Sending...' : 'Send Message'}
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default Contact;