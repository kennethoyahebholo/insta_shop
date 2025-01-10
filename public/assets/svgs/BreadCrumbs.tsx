import React from "react";

const BreadCrumbs = ({ className }: { className?: string }) => {
  return (
    <svg
      width="4"
      height="12"
      viewBox="0 0 4 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1.99563 12C1.58188 12 1.22917 11.8527 0.9375 11.5581C0.645833 11.2635 0.5 10.9094 0.5 10.4956C0.5 10.0819 0.647291 9.72917 0.941875 9.4375C1.23646 9.14583 1.59062 9 2.00437 9C2.41812 9 2.77083 9.14729 3.0625 9.44188C3.35417 9.73646 3.5 10.0906 3.5 10.5044C3.5 10.9181 3.35271 11.2708 3.05812 11.5625C2.76354 11.8542 2.40938 12 1.99563 12ZM1.99563 7.5C1.58188 7.5 1.22917 7.35271 0.9375 7.05813C0.645833 6.76354 0.5 6.40938 0.5 5.99563C0.5 5.58188 0.647291 5.22917 0.941875 4.9375C1.23646 4.64583 1.59062 4.5 2.00437 4.5C2.41812 4.5 2.77083 4.64729 3.0625 4.94188C3.35417 5.23646 3.5 5.59062 3.5 6.00437C3.5 6.41813 3.35271 6.77083 3.05812 7.0625C2.76354 7.35417 2.40938 7.5 1.99563 7.5ZM1.99563 3C1.58188 3 1.22917 2.85271 0.9375 2.55812C0.645833 2.26354 0.5 1.90937 0.5 1.49562C0.5 1.08187 0.647291 0.729167 0.941875 0.4375C1.23646 0.145833 1.59062 0 2.00437 0C2.41812 0 2.77083 0.147292 3.0625 0.441875C3.35417 0.736459 3.5 1.09063 3.5 1.50438C3.5 1.91813 3.35271 2.27083 3.05812 2.5625C2.76354 2.85417 2.40938 3 1.99563 3Z"
        fill="white"
      />
      <path
        d="M1.99563 12C1.58188 12 1.22917 11.8527 0.9375 11.5581C0.645833 11.2635 0.5 10.9094 0.5 10.4956C0.5 10.0819 0.647291 9.72917 0.941875 9.4375C1.23646 9.14583 1.59062 9 2.00437 9C2.41812 9 2.77083 9.14729 3.0625 9.44188C3.35417 9.73646 3.5 10.0906 3.5 10.5044C3.5 10.9181 3.35271 11.2708 3.05812 11.5625C2.76354 11.8542 2.40938 12 1.99563 12ZM1.99563 7.5C1.58188 7.5 1.22917 7.35271 0.9375 7.05813C0.645833 6.76354 0.5 6.40938 0.5 5.99563C0.5 5.58188 0.647291 5.22917 0.941875 4.9375C1.23646 4.64583 1.59062 4.5 2.00437 4.5C2.41812 4.5 2.77083 4.64729 3.0625 4.94188C3.35417 5.23646 3.5 5.59062 3.5 6.00437C3.5 6.41813 3.35271 6.77083 3.05812 7.0625C2.76354 7.35417 2.40938 7.5 1.99563 7.5ZM1.99563 3C1.58188 3 1.22917 2.85271 0.9375 2.55812C0.645833 2.26354 0.5 1.90937 0.5 1.49562C0.5 1.08187 0.647291 0.729167 0.941875 0.4375C1.23646 0.145833 1.59062 0 2.00437 0C2.41812 0 2.77083 0.147292 3.0625 0.441875C3.35417 0.736459 3.5 1.09063 3.5 1.50438C3.5 1.91813 3.35271 2.27083 3.05812 2.5625C2.76354 2.85417 2.40938 3 1.99563 3Z"
        fill="black"
        fillOpacity="0.6"
      />
    </svg>
  );
};

export default BreadCrumbs;
