import React from "react";

const CancelIcon = () => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_1558_873"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="17"
      >
        <rect y="0.5" width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1558_873)">
        <path
          d="M12 4.5L4 12.5M4 4.5L12 12.5"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 4.5L4 12.5M4 4.5L12 12.5"
          stroke="black"
          strokeOpacity="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default CancelIcon;
