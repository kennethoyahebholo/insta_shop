"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { StyledButton } from "@/components";
import { useGlobalContext } from "@/context/store";

import ArrowIcon from "../../../../../public/assets/svgs/ArrowIcon";
import BreadCrumbs from "../../../../../public/assets/svgs/BreadCrumbs";

const OnboardingLayout = ({
  children,
  headText,
  subText,
  onContinue,
  routeBackTo,
  navigationText,
  hideStepsIndication,
  showBreadCrumbs,
  showCancelBtn,
  actionBtnTitle,
  maxWidth,
}: {
  headText?: string;
  subText?: string;
  children: ReactNode;
  routeBackTo?: string;
  onContinue: () => void;
  navigationText?: string;
  hideStepsIndication?: boolean;
  showBreadCrumbs?: boolean;
  showCancelBtn?: boolean;
  actionBtnTitle?: string;
  maxWidth?: string;
}) => {
  const router = useRouter();
  const { userEmailOfPhone, profileData, storeData } = useGlobalContext();
  const isProfileDataStepComplete =
    profileData?.fullName &&
    profileData?.userName &&
    profileData?.phone &&
    profileData?.email;
  const isStoreDataStepComplete =
    storeData?.storeName &&
    storeData?.storeTagName &&
    storeData?.storePhoneNumber &&
    storeData?.storeEmail &&
    storeData?.storeLogo;
  return (
    <div className="h-[100dvh] flex flex-col justify-between w-full">
      <div className="w-full">
        <div
          className={`flex flex-col my-0 ${
            maxWidth || "max-w-[328px]"
          } mx-auto`}
        >
          <div className="flex items-center justify-between pt-3 px-4 pb-2 mb-[20px]">
            <Link
              href={`${routeBackTo}`}
              className="flex items-center gap-2 no-underline"
            >
              <ArrowIcon />
              <h6 className="m-0 text-[16px] font-medium leading-[17.6px] tracking-[0.005em] text-left text-[#000000e5]">
                {navigationText || "Get Started"}
              </h6>
            </Link>
            {showBreadCrumbs && (
              <span className="cursor-pointer">
                <BreadCrumbs />
              </span>
            )}
          </div>
          {!hideStepsIndication && (
            <div className="flex items-center gap-2 py-0 px-4 mb-[20px]">
              <div
                className={`h-1 w-[80px] xxs:w-[104px] rounded-[15px] ${
                  userEmailOfPhone ? "bg-[#8A226F]" : "bg-[#0000001a]"
                } `}
              ></div>
              <div
                className={`h-1 w-[80px] xxs:w-[104px] rounded-[15px] ${
                  isProfileDataStepComplete ? "bg-[#8A226F]" : "bg-[#0000001a]"
                }`}
              ></div>
              <div
                className={`h-1 w-[80px] xxs:w-[104px] rounded-[15px] ${
                  isStoreDataStepComplete ? "bg-[#8A226F]" : "bg-[#0000001a]"
                }`}
              ></div>
            </div>
          )}
          <div className="py-0">
            {headText && (
              <h2 className="px-[20px] text-[24px] font-medium leading-[26.4px] tracking-[0.005em] text-left text-[#000000e5] mb-4 max-w-[320px]">
                {headText}
              </h2>
            )}
            {subText && (
              <p className="px-[20px] text-[14px] leading-[18.23px] tracking-[0.005em] text-left text-[#000000e5] mb-6 max-w-[320px]">
                {subText}
              </p>
            )}

            {children}
          </div>
        </div>
      </div>
      <div
        className={`flex items-center justify-center border-t-[0.5px] border-[#00000033] pt-4 pb-[27px] px-[12px] ${
          showCancelBtn ? "gap-[10px] flex-col xxxs:flex-row" : ""
        } `}
      >
        {showCancelBtn && (
          <StyledButton
            title="Cancel"
            className="max-w-[156px] bg-white text-[#8A226F] border border-[#8A226F]"
            onClick={() => router.push("/")}
            color="outlined"
          />
        )}
        <StyledButton
          title={actionBtnTitle || "Continue"}
          className={`${showCancelBtn ? "max-w-[156px]" : "max-w-[296px]"} `}
          onClick={onContinue}
        />
      </div>
    </div>
  );
};

export default OnboardingLayout;
