"use client";

import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

import { InputField } from "@/components";
import { OnboardingLayout } from "../_partials";
import { phoneNumberFormikValidationSchema } from "./PhoneNumberPage.validation";
import { useGlobalContext } from "@/context/store";

export interface IFormData {
  phoneOrEmail: string;
}

const PhoneNumberPage = () => {
  const router = useRouter();
  const { setUserEmailOfPhone, userEmailOfPhone } = useGlobalContext();
  const phoneNumberFormik = useFormik<IFormData>({
    validationSchema: phoneNumberFormikValidationSchema,
    initialValues: {
      phoneOrEmail: "",
    },
    onSubmit: async (values) => {
      setUserEmailOfPhone(values?.phoneOrEmail);
      router.push("/onboarding/profile-setup");
    },
  });

  useEffect(() => {
    if (userEmailOfPhone) {
      phoneNumberFormik.setFieldValue("phoneOrEmail", userEmailOfPhone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmailOfPhone]);

  return (
    <OnboardingLayout
      headText="Enter your phone number or email to get started"
      subText="We will send you a verification code for confirmation"
      onContinue={phoneNumberFormik.handleSubmit}
      routeBackTo="/"
    >
      <div className="px-[20px]">
        <InputField
          type="text"
          label="Enter phone number or email"
          name="phoneOrEmail"
          value={phoneNumberFormik?.values?.phoneOrEmail}
          placeholder="Enter phone number or email"
          onChange={phoneNumberFormik.handleChange}
          error={
            phoneNumberFormik.submitCount > 0 &&
            phoneNumberFormik.errors.phoneOrEmail
          }
        />
      </div>
    </OnboardingLayout>
  );
};

export default PhoneNumberPage;
