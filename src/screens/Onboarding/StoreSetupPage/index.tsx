"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";

import useToast from "@/utils/useToasts";
import { OnboardingLayout } from "../_partials";
import { InputField } from "@/components";
import AuthMiddleware from "@/authMiddleware";
import { storeSetupPageFormikValidationSchema } from "./StoreSetupPage.validation";
import { useGlobalContext } from "@/context/store";

import AddAPhotoIcon from "../../../../public/assets/svgs/AddAPhotoIcon";

export interface IFormData {
  phoneOrEmail: string;
  storeName: string;
  storeTagName: string;
  storePhoneNumber: string;
  storeEmail: string;
}

const StoreSetupPage = () => {
  const toast = useToast();
  const router = useRouter();
  const { setStoreData, storeData } = useGlobalContext();
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const storeSetupPageFormik = useFormik<IFormData>({
    validationSchema: storeSetupPageFormikValidationSchema,
    initialValues: {
      phoneOrEmail: "",
      storeName: "",
      storeTagName: "",
      storePhoneNumber: "",
      storeEmail: "",
    },
    onSubmit: async (values) => {
      if (!backgroundImage) {
        toast.error("Please upload a store logo before proceeding.");
        return;
      }
      setStoreData({
        ...values,
        storeLogo: backgroundImage,
      });
      router.push("/products/create");
    },
  });

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBackgroundImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (storeData?.storeName) {
      storeSetupPageFormik.setFieldValue("storeName", storeData?.storeName);
    }
    if (storeData?.storeTagName) {
      storeSetupPageFormik.setFieldValue(
        "storeTagName",
        storeData?.storeTagName
      );
    }
    if (storeData?.storePhoneNumber) {
      storeSetupPageFormik.setFieldValue(
        "storePhoneNumber",
        storeData?.storePhoneNumber
      );
    }
    if (storeData?.storeEmail) {
      storeSetupPageFormik.setFieldValue("storeEmail", storeData?.storeEmail);
    }
    if (storeData?.storeLogo) {
      setBackgroundImage(storeData?.storeLogo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeData]);

  return (
    <AuthMiddleware>
      <OnboardingLayout
        onContinue={storeSetupPageFormik.handleSubmit}
        routeBackTo="/onboarding/profile-setup"
      >
        <div className="px-[20px]">
          <div className=" flex items-center flex-col gap-2 mb-[24px] max-w-[328px] border-[0.5px] border-[#00000033] rounded-[12px] p-4 justify-center">
            <label
              htmlFor="upload-input"
              className="cursor-pointer w-[80px] h-[80px] rounded-full bg-[#0000004D] flex items-center justify-center"
              style={{
                backgroundImage: backgroundImage
                  ? `url(${backgroundImage})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <AddAPhotoIcon />
            </label>
            <p className="text-[#00000066] text-[12px] leading-[15.62px] tracking-[0.5%]">
              Upload store logo
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              id="upload-input"
            />
          </div>

          <div className="mb-3">
            <InputField
              type="text"
              label="Store name"
              name="storeName"
              value={storeSetupPageFormik?.values?.storeName}
              placeholder="Store name"
              onChange={storeSetupPageFormik.handleChange}
              error={
                storeSetupPageFormik.submitCount > 0 &&
                storeSetupPageFormik.errors.storeName
              }
            />
          </div>
          <div className="mb-3">
            <InputField
              type="text"
              label="Store tag name"
              name="storeTagName"
              value={storeSetupPageFormik?.values?.storeTagName}
              placeholder="Store tag name"
              onChange={storeSetupPageFormik.handleChange}
              error={
                storeSetupPageFormik.submitCount > 0 &&
                storeSetupPageFormik.errors.storeTagName
              }
            />
          </div>
          <div className="mb-3">
            <InputField
              type="text"
              label="Store phone number"
              name="storePhoneNumber"
              value={storeSetupPageFormik?.values?.storePhoneNumber}
              placeholder="Store phone number"
              onChange={storeSetupPageFormik.handleChange}
              error={
                storeSetupPageFormik.submitCount > 0 &&
                storeSetupPageFormik.errors.storePhoneNumber
              }
            />
          </div>
          <div className="mb-3">
            <InputField
              type="text"
              label="Store email"
              name="storeEmail"
              value={storeSetupPageFormik?.values?.storeEmail}
              placeholder="Store email"
              onChange={storeSetupPageFormik.handleChange}
              error={
                storeSetupPageFormik.submitCount > 0 &&
                storeSetupPageFormik.errors.storeEmail
              }
            />
          </div>
        </div>
      </OnboardingLayout>
    </AuthMiddleware>
  );
};

export default StoreSetupPage;
