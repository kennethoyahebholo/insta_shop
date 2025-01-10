"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";

import { OnboardingLayout } from "../_partials";
import { InputField } from "@/components";
import { useGlobalContext } from "@/context/store";
import AuthMiddleware from "@/authMiddleware";

import { profileSetupPageFormikValidationSchema } from "./ProfileSetupPage.validation";
import InstagramIcon from "../../../../public/assets/svgs/InstagramIcon";
import TiktokIcon from "../../../../public/assets/svgs/TiktokIcon";
import GoogleIcon from "../../../../public/assets/svgs/GoogleIcon";

export interface IFormData {
  fullName: string;
  userName: string;
  phone: string;
  email: string;
}

const ProfileSetupPage = () => {
  const router = useRouter();
  const { setProfileData, profileData } = useGlobalContext();
  const profileSetupPageFormik = useFormik<IFormData>({
    validationSchema: profileSetupPageFormikValidationSchema,
    initialValues: {
      fullName: "",
      userName: "",
      phone: "",
      email: "",
    },
    onSubmit: async (values) => {
      setProfileData({
        ...values,
      });
      router.push("/onboarding/store-setup");
    },
  });

  useEffect(() => {
    if (profileData?.fullName) {
      profileSetupPageFormik.setFieldValue("fullName", profileData?.fullName);
    }
    if (profileData?.userName) {
      profileSetupPageFormik.setFieldValue("userName", profileData?.userName);
    }
    if (profileData?.phone) {
      profileSetupPageFormik.setFieldValue("phone", profileData?.phone);
    }
    if (profileData?.email) {
      profileSetupPageFormik.setFieldValue("email", profileData?.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData]);

  return (
    <AuthMiddleware>
      <OnboardingLayout
        headText="Complete profile setup"
        subText="Connect your socials for quick setup"
        onContinue={profileSetupPageFormik.handleSubmit}
        routeBackTo="/onboarding"
      >
        <div className="px-[20px]">
          <div className="flex items-center gap-2 mb-[24px]">
            <div className="py-[14px] px-[40.67px] bg-[#00000008] w-fit rounded-[12px] flex items-center justify-center">
              <InstagramIcon />
            </div>
            <div className="py-[14px] px-[40.67px] bg-[#00000008] w-fit rounded-[12px] flex items-center justify-center">
              <TiktokIcon />
            </div>
            <div className="py-[14px] px-[40.67px] bg-[#00000008] w-fit rounded-[12px] flex items-center justify-center">
              <GoogleIcon />
            </div>
          </div>

          <h4 className="text-[14px] leading-[18.23px] tracking-[0.005em] text-left mb-4 text-[#00000099]">
            Or enter manually
          </h4>

          <div className="mb-3">
            <InputField
              type="text"
              label="Full name"
              name="fullName"
              value={profileSetupPageFormik?.values?.fullName}
              placeholder="Full name"
              onChange={profileSetupPageFormik.handleChange}
              error={
                profileSetupPageFormik.submitCount > 0 &&
                profileSetupPageFormik.errors.fullName
              }
            />
          </div>
          <div className="mb-3">
            <InputField
              type="text"
              label="Username"
              name="userName"
              value={profileSetupPageFormik?.values?.userName}
              placeholder="Username"
              onChange={profileSetupPageFormik.handleChange}
              error={
                profileSetupPageFormik.submitCount > 0 &&
                profileSetupPageFormik.errors.userName
              }
            />
          </div>
          <div className="mb-3">
            <InputField
              type="text"
              label="Phone number"
              name="phone"
              value={profileSetupPageFormik?.values?.phone}
              placeholder="Phone number"
              onChange={profileSetupPageFormik.handleChange}
              error={
                profileSetupPageFormik.submitCount > 0 &&
                profileSetupPageFormik.errors.phone
              }
            />
          </div>
          <div className="mb-3">
            <InputField
              type="text"
              label="Email"
              name="email"
              value={profileSetupPageFormik?.values?.email}
              placeholder="Email"
              onChange={profileSetupPageFormik.handleChange}
              error={
                profileSetupPageFormik.submitCount > 0 &&
                profileSetupPageFormik.errors.email
              }
            />
          </div>
        </div>
      </OnboardingLayout>
    </AuthMiddleware>
  );
};

export default ProfileSetupPage;
