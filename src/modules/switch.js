import { useState } from "react";
import "./switch.css";

export default function Switch({ onClick, bool }) {
  const [check, setCheck] = useState(bool);

  return (
    <div
      className="switch"
      onClick={() => {
        setCheck(!check);
        if (onClick) onClick();
      }}
    >
      <div className="back"></div>
      <div className={`circle ${bool ? "disabled" : "enabled"}`}></div>
      <div className={` background ${bool ? "disabled" : "enabled"}`}></div>
    </div>
  );
}
