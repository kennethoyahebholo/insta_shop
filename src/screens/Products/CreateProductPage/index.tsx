"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

import { OnboardingLayout } from "@/screens/Onboarding/_partials";
import {
  AmountInput,
  InputField,
  MultiValueInput,
  MultiValueInventoryInput,
  ToggleSwitch,
} from "@/components";
import { IFormData, ImageData } from "./CreateProductPage.types";
import { useGlobalContext } from "@/context/store";
import AuthMiddleware from "@/authMiddleware";

import MarkIcon from "../../../../public/assets/svgs/MarkIcon";
import ArrowHeadIcon from "../../../../public/assets/svgs/ArrowHeadIcon";
import AddImageIcon from "../../../../public/assets/svgs/AddImageIcon";
import BreadCrumbs from "../../../../public/assets/svgs/BreadCrumbs";
import CheckboxIcon from "../../../../public/assets/svgs/CheckboxIcon";
import PlusIcon from "../../../../public/assets/svgs/PlusIcon";
import useToast from "@/utils/useToasts";

const CheckboxComp = ({
  type,
  checked,
  handleToggle,
}: {
  type: string;
  checked: boolean;
  handleToggle: () => void;
}) => (
  <div className="flex items-center w-full justify-between">
    <h6 className="text-[12px] leading-[15.62px] tracking-[0.5%] text-[#000000E5]">
      {type}
    </h6>
    <div className="cursor-pointer" onClick={handleToggle}>
      {checked ? (
        <CheckboxIcon />
      ) : (
        <div className="w-[16px] h-[16px] rounded-[3px] border border-[#00000033]"></div>
      )}
    </div>
  </div>
);

const CreateProductPage = () => {
  const router = useRouter();
  const { setProductData, productData } = useGlobalContext();
  const [sectionsVisibility, setSectionsVisibility] = useState({
    basicDetails: true,
    productImages: true,
    inventoryVariations: false,
    shipping: true,
  });
  const [images, setImages] = useState<ImageData[]>([]);
  const toast = useToast();
  const [isInventoryVariationsChecked, setIsInventoryVariationsChecked] =
    useState(false);
  const [selectedShipping, setSelectedShipping] = useState<
    "self" | "instaShop" | null
  >("self");

  const toggleSection = (section: keyof typeof sectionsVisibility) => {
    setSectionsVisibility((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const createProductPageFormikValidationSchema = Yup.object().shape({
    productTitle: Yup.string().required("Required"),
    productDescription: Yup.string().required("Required"),
    price: Yup.string().required("Required"),
    oldPrice: Yup.string().required("Required"),
    productCollection: Yup.array()
      .min(1, "Must select at least one feature")
      .required("Required"),
    inventoryStocks: Yup.string().required("Required"),
    isInventoryVariations: Yup.boolean(), // Add this field to track variation toggle
    color: isInventoryVariationsChecked
      ? Yup.array()
          .min(1, "Must select at least one feature")
          .required("Required")
      : Yup.array().notRequired(),
    size: isInventoryVariationsChecked
      ? Yup.array()
          .min(1, "Must select at least one feature")
          .required("Required")
      : Yup.array().notRequired(),
    weight: isInventoryVariationsChecked
      ? Yup.array()
          .min(1, "Must select at least one feature")
          .required("Required")
      : Yup.array().notRequired(),
    shippingInventoryStocks: Yup.string().required("Required"),
  });

  const createProductPageFormik = useFormik<IFormData>({
    validationSchema: createProductPageFormikValidationSchema,
    initialValues: {
      productTitle: "",
      inventoryStocks: "",
      productDescription: "",
      productCollection: [],
      price: "",
      oldPrice: "",
      size: ["Large", "Small", "XL"],
      color: ["Red", "White", "Black"],
      weight: ["Red", "White", "Black"],
      shippingInventoryStocks: "",
    },
    onSubmit: async (values) => {
      if (images?.length < 1) {
        toast.error(
          "Please upload at least one product image before proceeding."
        );
        return;
      }
      setProductData({
        ...values,
        shippingType: selectedShipping as string,
        productsImages: images as ImageData[],
      });
      router.push("/products/overview");
    },
  });

  const handleRadioToggle = (id: number) => {
    setImages((prevImages) =>
      prevImages.map((img) =>
        img.id === id ? { ...img, isEnabled: !img.isEnabled } : img
      )
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevImages) => [
          ...prevImages,
          {
            id: prevImages.length + 1,
            src: reader.result as string,
            name: file.name,
            isEnabled: false,
          },
        ]);
      };
      reader.readAsDataURL(file); // Convert image to Base64
    }
  };

  const handleShippingToggle = (type: "self" | "instaShop") => {
    setSelectedShipping((prev) => (prev === type ? prev : type));
  };

  useEffect(() => {
    if (productData) {
      const fieldsToUpdate = [
        { key: "productTitle", value: productData.productTitle },
        { key: "inventoryStocks", value: productData.inventoryStocks },
        { key: "productDescription", value: productData.productDescription },
        { key: "productCollection", value: productData.productCollection },
        { key: "price", value: productData.price },
        { key: "oldPrice", value: productData.oldPrice },
        { key: "size", value: productData.size },
        { key: "color", value: productData.color },
        { key: "weight", value: productData.weight },
        {
          key: "shippingInventoryStocks",
          value: productData.shippingInventoryStocks,
        },
      ];

      fieldsToUpdate.forEach(({ key, value }) => {
        if (value) {
          createProductPageFormik.setFieldValue(key, value);
        }
      });

      if (productData.shippingType) {
        setSelectedShipping(
          productData.shippingType as "self" | "instaShop" | null
        );
      }
      if (productData.productsImages) {
        setImages(productData.productsImages);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData]);

  return (
    <AuthMiddleware>
      <OnboardingLayout
        onContinue={createProductPageFormik.handleSubmit}
        routeBackTo="/onboarding/store-setup"
        navigationText="Create a product"
        hideStepsIndication
        showBreadCrumbs
        actionBtnTitle="Save"
        showCancelBtn
      >
        <div className="flex items-start xxxs:items-center gap-2 justify-between pb-2 border-b-[0.5px] border-[#00000033] px-[16px] flex-col xxxs:flex-row">
          <div className="flex items-center gap-[6px] border border-[#0000001A] py-[3px] px-[10px] rounded-[90px]">
            <p className="text-[12px] leading-[15.62px] tracking-[0.5%] text-[#00000099]">
              Draft
            </p>
            <MarkIcon />
          </div>
          <h6 className="text-[12px] font-medium leading-[15.62px] tracking-[0.5%] text-[#8A226F]">
            Preview product
          </h6>
        </div>

        <div className="border-b-[0.5px] border-[#00000033]">
          <div
            onClick={() => toggleSection("basicDetails")}
            className="cursor-pointer flex items-center justify-between pt-[17px] px-[16px] pb-[8px]"
          >
            <h6 className="font-medium text-[14px] leading-[18.23px] tracking-[0.5%] text-[#000000]">
              Basic details
            </h6>
            <ArrowHeadIcon
              className={`transform transition-transform duration-300 ${
                !sectionsVisibility.basicDetails ? "rotate-180" : ""
              }`}
            />
          </div>
          {sectionsVisibility.basicDetails && (
            <div className="animate-fade-in transform duration-1000 px-4 py-2 w-full">
              <div className="mb-[10px]">
                <InputField
                  type="text"
                  label="Product Title"
                  name="productTitle"
                  value={createProductPageFormik?.values?.productTitle}
                  placeholder="Product Title"
                  onChange={createProductPageFormik.handleChange}
                  error={
                    createProductPageFormik.submitCount > 0 &&
                    createProductPageFormik.errors.productTitle
                  }
                />
              </div>
              <div className="mb-[10px]">
                <InputField
                  type="text"
                  label="Product description"
                  name="productDescription"
                  value={createProductPageFormik?.values?.productDescription}
                  placeholder="Product description"
                  onChange={createProductPageFormik.handleChange}
                  error={
                    createProductPageFormik.submitCount > 0 &&
                    createProductPageFormik.errors.productDescription
                  }
                  className="min-h-[78px]"
                />
              </div>
              <div className="mb-[10px] flex items-center gap-3">
                <AmountInput
                  placeholder="Price"
                  name="price"
                  value={createProductPageFormik?.values?.price}
                  onChange={(value: number | string | undefined) =>
                    createProductPageFormik.setFieldValue("price", value || "")
                  }
                  error={
                    createProductPageFormik.submitCount > 0 &&
                    createProductPageFormik.errors.price
                  }
                />
                <AmountInput
                  placeholder="Old price"
                  name="oldPrice"
                  value={createProductPageFormik?.values?.oldPrice}
                  onChange={(value: number | string | undefined) =>
                    createProductPageFormik.setFieldValue(
                      "oldPrice",
                      value || ""
                    )
                  }
                  error={
                    createProductPageFormik.submitCount > 0 &&
                    createProductPageFormik.errors.oldPrice
                  }
                />
              </div>
              <div className="mb-[10px]">
                <MultiValueInput
                  tagsToBeUpdated={
                    createProductPageFormik?.values?.productCollection
                  }
                  label="Product collection"
                  placeholder="Product collection"
                  field="productCollection"
                  handleVariationChange={(field, value) => {
                    createProductPageFormik.setFieldValue(field, value);
                  }}
                  error={
                    createProductPageFormik.touched.productCollection &&
                    createProductPageFormik.errors.productCollection
                  }
                />
              </div>
              <div className="mb-[20px]">
                <InputField
                  type="text"
                  label="Inventory stocks"
                  name="inventoryStocks"
                  value={createProductPageFormik?.values?.inventoryStocks}
                  placeholder="Inventory stocks"
                  onChange={createProductPageFormik.handleChange}
                  error={
                    createProductPageFormik.submitCount > 0 &&
                    createProductPageFormik.errors.inventoryStocks
                  }
                />
              </div>
            </div>
          )}
        </div>

        <div className="border-b-[0.5px] border-[#00000033]">
          <div
            onClick={() => toggleSection("productImages")}
            className="cursor-pointer flex items-center justify-between pt-[17px] px-[16px] pb-[8px]"
          >
            <h6 className="font-medium text-[14px] leading-[18.23px] tracking-[0.5%] text-[#000000]">
              Product images
            </h6>
            <ArrowHeadIcon
              className={`transform transition-transform duration-300 ${
                !sectionsVisibility.productImages ? "rotate-180" : ""
              }`}
            />
          </div>
          {sectionsVisibility.productImages && (
            <div className="animate-fade-in transform duration-1000 px-4 pt-2 pb-[20px] w-full">
              <div className="flex flex-col gap-[2px] mb-2">
                {images?.map((img) => (
                  <div
                    key={img.id}
                    className="flex items-center justify-between p-2"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-[60px] h-[60px] bg-slate-500 rounded-[8px]"
                        style={{
                          backgroundImage: `url(${img.src})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                      <h6 className="text-[14px] text-[#000000E5] leading-[18.23px] tracking-[0.5%] font-medium">
                        {img.name}
                      </h6>
                    </div>
                    <div className="flex items-center gap-[22px]">
                      <div className="flex items-center gap-[22px]">
                        <BreadCrumbs className="rotate-90 cursor-pointer" />
                        <div>
                          <ToggleSwitch
                            checked={img.isEnabled}
                            imgId={img.id}
                            onChange={() => handleRadioToggle(img.id)}
                            label={img.isEnabled ? "Enabled" : "Disabled"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <label
                htmlFor="imageUpload"
                className="cursor-pointer rounded-[90px] p-[10px] flex items-center gap-[6px] bg-[#00000008] justify-center"
              >
                <h6 className="text-[14px] text-[#8A226F] leading-[18.23px] tracking-[0.5%] font-medium cursor-pointer">
                  Add Image
                </h6>
                <span>
                  <AddImageIcon />
                </span>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          )}
        </div>

        <div className="border-b-[0.5px] border-[#00000033]">
          <div
            onClick={() => toggleSection("inventoryVariations")}
            className="cursor-pointer flex items-center justify-between pt-[17px] px-[16px] pb-[8px]"
          >
            <h6 className="font-medium text-[14px] leading-[18.23px] tracking-[0.5%] text-[#000000]">
              Inventory variations
            </h6>
            <ArrowHeadIcon
              className={`transform transition-transform duration-300 ${
                !sectionsVisibility.inventoryVariations ? "rotate-180" : ""
              }`}
            />
          </div>
          {sectionsVisibility.inventoryVariations && (
            <div className="animate-fade-in transform duration-1000 px-4 pt-2 pb-[20px] w-full">
              <div className="flex items-center gap-3 p-2 mb-3">
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    setIsInventoryVariationsChecked((prev) => !prev)
                  }
                >
                  {isInventoryVariationsChecked ? (
                    <CheckboxIcon />
                  ) : (
                    <div className="w-[16px] h-[16px] rounded-[3px] border border-[#00000033]"></div>
                  )}
                </div>
                <h6 className="text-[14px] leading-[18.23px] tracking-[0.5%] text-[#00000099]">
                  This product is variable; has different colors, sizes, weight,
                  materials, etc.
                </h6>
              </div>
              {isInventoryVariationsChecked && (
                <div className="animate-fade-in transform duration-1000">
                  <div className="mb-[10px]">
                    <MultiValueInventoryInput
                      tagsToBeUpdated={createProductPageFormik?.values?.color}
                      label="Option 1"
                      type="Color"
                      placeholder="Enter values"
                      field="color"
                      handleVariationChange={(field, value) => {
                        createProductPageFormik.setFieldValue(field, value);
                      }}
                      error={
                        createProductPageFormik.touched.color &&
                        createProductPageFormik.errors.color
                      }
                    />
                  </div>
                  <div className="mb-[10px]">
                    <MultiValueInventoryInput
                      tagsToBeUpdated={createProductPageFormik?.values?.size}
                      label="Option 2"
                      type="Size"
                      placeholder="Enter values"
                      field="size"
                      handleVariationChange={(field, value) => {
                        createProductPageFormik.setFieldValue(field, value);
                      }}
                      error={
                        createProductPageFormik.touched.size &&
                        createProductPageFormik.errors.size
                      }
                    />
                  </div>
                  <div className="mb-[10px]">
                    <MultiValueInventoryInput
                      tagsToBeUpdated={createProductPageFormik?.values?.weight}
                      label="Option 3"
                      type="Weight"
                      placeholder="Enter values"
                      field="weight"
                      handleVariationChange={(field, value) => {
                        createProductPageFormik.setFieldValue(field, value);
                      }}
                      error={
                        createProductPageFormik.touched.weight &&
                        createProductPageFormik.errors.weight
                      }
                    />
                  </div>
                  <div className="cursor-pointer rounded-[90px] p-[10px] flex items-center gap-[11px] bg-[#00000008] justify-center">
                    <span>
                      <PlusIcon />
                    </span>
                    <h6 className="text-[14px] text-[#8A226F] leading-[18.23px] tracking-[0.5%] font-medium cursor-pointer">
                      Add new option
                    </h6>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="">
          <div
            onClick={() => toggleSection("shipping")}
            className="cursor-pointer flex items-center justify-between pt-[17px] px-[16px] pb-[8px]"
          >
            <h6 className="font-medium text-[14px] leading-[18.23px] tracking-[0.5%] text-[#000000]">
              Shipping
            </h6>
            <ArrowHeadIcon
              className={`transform transition-transform duration-300 ${
                !sectionsVisibility.shipping ? "rotate-180" : ""
              }`}
            />
          </div>
          {sectionsVisibility.shipping && (
            <div className="animate-fade-in transform duration-1000 px-4 pt-2 pb-[20px] w-full">
              <div className="flex flex-col mb-[10px] gap-[26px]">
                <CheckboxComp
                  type="Self shipping"
                  checked={selectedShipping === "self"}
                  handleToggle={() => handleShippingToggle("self")}
                />
                <CheckboxComp
                  type="InstaShop shipping"
                  checked={selectedShipping === "instaShop"}
                  handleToggle={() => handleShippingToggle("instaShop")}
                />
              </div>
              <div className="mb-[10px]">
                <InputField
                  type="text"
                  label="Inventory stocks"
                  name="shippingInventoryStocks"
                  value={
                    createProductPageFormik?.values?.shippingInventoryStocks
                  }
                  placeholder="Inventory stocks"
                  onChange={createProductPageFormik.handleChange}
                  error={
                    createProductPageFormik.submitCount > 0 &&
                    createProductPageFormik.errors.shippingInventoryStocks
                  }
                />
              </div>
            </div>
          )}
        </div>
      </OnboardingLayout>
    </AuthMiddleware>
  );
};

export default CreateProductPage;
