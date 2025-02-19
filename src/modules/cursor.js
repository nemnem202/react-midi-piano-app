import { useEffect, useRef, useState } from "react";

const CursorFollower = () => {
  const yellowCircleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updatePosition = (e) => {
      if (yellowCircleRef.current) {
        yellowCircleRef.current.style.transform = `translate(${
          e.clientX - 5
        }px, ${e.clientY - 5}px)`;
        setIsVisible(true);
      }
    };

    const handleMouseOut = () => setIsVisible(false); // Cacher la div si le curseur quitte la fenêtre
    const handleMouseOver = () => setIsVisible(true); // Réafficher la div si la souris revient

    document.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    isVisible && (
      <div
        ref={yellowCircleRef}
        style={{
          position: "fixed",
          width: "10px",
          height: "10px",
          backgroundColor: "yellow",
          borderRadius: "50%",
          pointerEvents: "none",
          willChange: "transform",
          zIndex: "50",
        }}
      />
    )
  );
};

export default CursorFollower;
