"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { data } from "./WelcomePage.data";
import { StyledButton } from "@/components";

import WelcomeImage from "../../../public/assets/svgs/WelcomeImage";
import CheckIcon from "../../../public/assets/svgs/CheckIcon";

const WelcomePage = () => {
  const router = useRouter();
  return (
    <div className="pt-[48px] pb-[57px] px-[32px] flex flex-col justify-between h-[calc(100dvh-105px)]">
      <div>
        <div className="flex item-center justify-center mb-[25px]">
          <WelcomeImage />
        </div>
        <h4 className="text-[36px] font-bold leading-[39.6px] tracking-[0.005em] text-center mb-[8px]">
          Welcome
        </h4>
        <p className="text-[14px] leading-[18.23px] tracking-[0.005em] text-center mt-0 mb-[24px] mx-auto font-[300] max-w-[296px]">
          The safest platform to shop from social media vendors
        </p>
        <div className="rounded-[12px] py-3 px-4 flex flex-col gap-3 max-w-[296px] xs:max-w-[396px] my-0 mx-auto bg-[#ffeafa] border-[0.5px] border-[#8a226f]">
          {data?.map(({ id, content }) => (
            <div key={id} className="flex item-center gap-2 mb-0">
              <CheckIcon />
              <p className="text-[14px] font-medium leading-[18.23px] tracking-[0.005em] text-left m-0">
                {content}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex item-center justify-center">
        <StyledButton
          title="Get Started"
          className="max-w-[296px] xs:max-w-[396px]"
          onClick={() => router.push("/onboarding")}
        />
      </div>
    </div>
  );
};

export default WelcomePage;
