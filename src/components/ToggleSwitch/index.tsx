import React from "react";
import "./ToggleSwitch.css";

interface IToggleSwitch {
  label: string;
  checked?: boolean;
  onChange?: () => void;
  imgId?: number;
}
const ToggleSwitch = ({ checked, onChange, imgId }: IToggleSwitch) => (
  <div className="toggle-switch">
    <span className="switch">
      <input
        id={`toggle-${imgId}`}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={`toggle-${imgId}`} className="slider round" />
    </span>
  </div>
);
export default ToggleSwitch;
