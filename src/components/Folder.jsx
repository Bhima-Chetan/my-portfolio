import { useState, useRef, useMemo } from "react";
import "./Folder.css";

const darkenColor = (hex, percent) => {
  let color = hex.startsWith("#") ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
};

const Folder = ({
  color = "#5227FF",
  size = 1,
  items = [],
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const folderRef = useRef(null);

  const darkerColor = useMemo(
    () => darkenColor(color, 0.2),
    [color]
  );

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`folder-container ${className}`}>
      <div
        ref={folderRef}
        className={`folder ${isOpen ? "open" : ""}`}
        style={{
          "--folder-color": color,
          "--folder-back-color": darkerColor,
          transform: `scale(${size})`,
        }}
        onClick={handleClick}
      >
        <div className="folder__back">
          <div className="paper" />
          <div className="paper" />
          <div className="paper" />
        </div>
        <div className="folder__front">
          <div className="right"></div>
        </div>
      </div>
      <div className="project-card-container">
        {items}
      </div>
    </div>
  );
};

export default Folder;
