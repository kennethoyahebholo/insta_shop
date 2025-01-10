import React from "react";

const ShareIcon = ({ className }: { className: string }) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="url(#filter0_b_1558_1325)">
        <rect width="36" height="36" rx="18" fill="black" fillOpacity="0.05" />
        <mask
          id="mask0_1558_1325"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="8"
          y="8"
          width="20"
          height="20"
        >
          <rect x="8" y="8" width="20" height="20" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_1558_1325)">
          <path
            d="M25.2297 18.5062C25.4331 18.3318 25.5348 18.2446 25.5721 18.1409C25.6048 18.0498 25.6048 17.9502 25.5721 17.8591C25.5348 17.7554 25.4331 17.6682 25.2297 17.4938L18.1708 11.4433C17.8206 11.1431 17.6455 10.9931 17.4972 10.9894C17.3684 10.9862 17.2453 11.0428 17.1639 11.1427C17.0702 11.2576 17.0702 11.4883 17.0702 11.9495V15.5289C15.2913 15.8401 13.6632 16.7415 12.4533 18.0949C11.1343 19.5704 10.4046 21.48 10.4036 23.4591V23.9691C11.278 22.9157 12.3698 22.0638 13.6042 21.4716C14.6925 20.9495 15.8689 20.6403 17.0702 20.5588V24.0505C17.0702 24.5117 17.0702 24.7424 17.1639 24.8573C17.2453 24.9572 17.3684 25.0138 17.4972 25.0106C17.6455 25.0069 17.8206 24.8569 18.1708 24.5567L25.2297 18.5062Z"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25.2297 18.5062C25.4331 18.3318 25.5348 18.2446 25.5721 18.1409C25.6048 18.0498 25.6048 17.9502 25.5721 17.8591C25.5348 17.7554 25.4331 17.6682 25.2297 17.4938L18.1708 11.4433C17.8206 11.1431 17.6455 10.9931 17.4972 10.9894C17.3684 10.9862 17.2453 11.0428 17.1639 11.1427C17.0702 11.2576 17.0702 11.4883 17.0702 11.9495V15.5289C15.2913 15.8401 13.6632 16.7415 12.4533 18.0949C11.1343 19.5704 10.4046 21.48 10.4036 23.4591V23.9691C11.278 22.9157 12.3698 22.0638 13.6042 21.4716C14.6925 20.9495 15.8689 20.6403 17.0702 20.5588V24.0505C17.0702 24.5117 17.0702 24.7424 17.1639 24.8573C17.2453 24.9572 17.3684 25.0138 17.4972 25.0106C17.6455 25.0069 17.8206 24.8569 18.1708 24.5567L25.2297 18.5062Z"
            stroke="black"
            strokeOpacity="0.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_b_1558_1325"
          x="-2"
          y="-2"
          width="40"
          height="40"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="1" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_1558_1325"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_1558_1325"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default ShareIcon;
