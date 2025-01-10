"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useToast from "@/utils/useToasts";
import { OnboardingLayout } from "@/screens/Onboarding/_partials";
import { useGlobalContext } from "@/context/store";
import AuthMiddleware from "@/authMiddleware";

import ShareIcon from "../../../../public/assets/svgs/ShareIcon";
import LikeIcon from "../../../../public/assets/svgs/LikeIcon";
import FullStar from "../../../../public/assets/svgs/FullStar";
import HalfStar from "../../../../public/assets/svgs/HalfStar";
import ArrowHeadIcon from "../../../../public/assets/svgs/ArrowHeadIcon";
import DotIcon from "../../../../public/assets/svgs/DotIcon";
import BlackStar from "../../../../public/assets/svgs/BlackStar";
import ProfileIcon from "../../../../public/assets/svgs/ProfileIcon";

const ProductOverviewPage = () => {
  const toast = useToast();
  const router = useRouter();
  const { productData, storeData } = useGlobalContext();
  const [isShowProductDescription, setIsShowProductDescription] =
    useState<boolean>(true);
  const [isShowAboutThisVendor, setIsShowAboutThisVendor] =
    useState<boolean>(true);
  const [isPublishingProduct, setIsPublishingProduct] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  const fullText =
    productData?.productDescription ||
    `Wholesale and drop shipping are both welcomed. For wholesale, we will offer discount or free express shipping which only takes 3-7 days to arrive. 
    For drop shipping, we could send the goods to your customers directly and won't leave information about us if you'd like to.
    How can track my parcel? You can track your parcel on the following website using your tracking number: www.17track.net/en 
    (Copied to the browser to open). 
    What can I do when purchase protection time is running out? If your purchase protection time is running out, please contact us and we can help you to extend it. 
    So your money will not go to my account.`;

  const truncatedText = `${fullText.substring(0, 146)}...`;

  const vendorDescText = `Vendor description: You can
              track your parcel on the following website using your tracking
              number: www.17track.net/en  (Copied to the browser to open) What
              can I do when purchase protection time is running out?`;

  const vendorQuality = [
    "Quality goods",
    "Nice designs",
    "Quality goods",
    "Nice designs",
    "Quality goods",
    "Nice designs",
  ];

  const FilterBadge = ({ className }: { className?: string }) => (
    <span
      className={`${className} flex items-center justify-center w-fit py-[3px] px-[10px] bg-[#00000008] rounded-[90px] text-[#000000E5] text-[12px] leading-[15.62px] tracking-[0.5%]`}
    >
      Filter
    </span>
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (productData?.productsImages && productData.productsImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) =>
            (prevIndex + 1) % (productData.productsImages?.length ?? 1)
        );
      }, 2000); // Change image every 2 seconds

      return () => clearInterval(interval); // Clean up interval on unmount
    }
  }, [productData?.productsImages]);

  const currentImage =
    productData?.productsImages?.[currentImageIndex]?.src || "";

  const handlePublish = () => {
    setIsPublishingProduct(true);
    setTimeout(() => {
      setIsPublishingProduct(false);
      toast.success("Product published successfully");
      router?.push("/");
    }, 3000);
  };

  return (
    <AuthMiddleware>
      <OnboardingLayout
        onContinue={handlePublish}
        routeBackTo="/products/create"
        navigationText="Product preview"
        hideStepsIndication
        showBreadCrumbs
        actionBtnTitle={isPublishingProduct ? "Publishing..." : "Publish"}
        maxWidth="max-w-[360px]"
      >
        <div
          className="animate-fade-in duration-200 ease-in relative mb-4 h-[360px] w-full bg-gray-400"
          style={{
            backgroundImage: `url(${currentImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {productData?.productsImages &&
            productData.productsImages.length > 1 && (
              <div className="absolute bottom-[7px] right-2 text-white text-[10px] leading-[13.02px] tracking-[0.5%] bg-[#0000000D] p-1 rounded-[10px]">
                <span>{currentImageIndex + 1}</span>/
                <span>{productData?.productsImages?.length}</span>
              </div>
            )}
        </div>

        <div className="pb-3 w-full px-4 border-b-[0.5px] border-[#00000033]">
          <div className="mb-2 flex items-center justify-between flex-wrap xxxs:flex-nowrap gap-2">
            <h4 className="text-[14px] font-medium leading-[18.23px] tracking-[0.5%]">
              {productData?.productTitle ||
                "Gucci bag – the epitome of luxury and sophistication"}
            </h4>
            <div className="flex items-center gap-1">
              <ShareIcon className="cursor-pointer" />
              <LikeIcon className="cursor-pointer" />
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center gap-1 flex-wrap">
              <h4 className="text-[#3B3B3B] font-medium text-[20px] leading-[22px] tracking-[0.5%]">
                {/* ₦18.0 */}
                {`₦${(
                  Number(productData?.price) -
                  Number(productData?.price) * 0.25
                ).toFixed(1)}`}
              </h4>
              <p className="text-[#ACACAC] font-medium text-[12px] leading-[15.62px] tracking-[0.5%]">
                {`₦${Number(productData?.price).toFixed(1)}`}
              </p>
              <span className="bg-[#8A226F] text-white rounded-[24px] py-[2px] px-2 text-[10px] leading-[13.02px] tracking-[0.5%]">
                25% OFF
              </span>
            </div>

            <div className="flex items-center gap-[2px] flex-wrap">
              <div className="flex items-center gap-1">
                <FullStar />
                <FullStar />
                <FullStar />
                <FullStar />
                <HalfStar />
              </div>
              <h6 className="text-[#ACACAC] text-[14px] leading-[18.23px] tracking-[0.5%] whitespace-nowrap">
                (5 sold)
              </h6>
            </div>
          </div>
        </div>

        <div className="px-4 pt-4 pb-3 border-b-[0.5px] border-[#00000033]">
          <h6 className="text-[14px] leading-[18.23px] tracking-[0.5%] text-[#000000] font-medium mb-4">
            Select variants
          </h6>
          <div className="mb-4">
            <h5 className="text-[10px] leading-[13.02px] tracking-[0.5%] text-[#00000099] font-medium mb-2">
              Size: SMALL
            </h5>
            <div className="flex items-center gap-2 flex-wrap">
              <FilterBadge className="text-white bg-[#000000E5]" />
              <FilterBadge />
              <FilterBadge />
              <FilterBadge />
              <FilterBadge />
              <FilterBadge />
            </div>
          </div>

          <div className="mb-4">
            <h5 className="text-[10px] leading-[13.02px] tracking-[0.5%] text-[#00000099] font-medium mb-2">
              Color: White
            </h5>
            <div className="flex items-center gap-2 flex-wrap">
              <FilterBadge />
              <FilterBadge />
              <FilterBadge />
            </div>
          </div>
        </div>

        <div className="border-b-[0.5px] border-[#00000033]">
          <div
            onClick={() => setIsShowProductDescription((prev) => !prev)}
            className="cursor-pointer flex items-center justify-between pt-[17px] px-[16px] pb-[8px]"
          >
            <h6 className="font-medium text-[14px] leading-[18.23px] tracking-[0.5%] text-[#000000]">
              Product description
            </h6>
            <ArrowHeadIcon
              className={`transform transition-transform duration-300 ${
                !isShowProductDescription ? "rotate-180" : ""
              }`}
            />
          </div>
          {isShowProductDescription && (
            <div className="animate-fade-in transform duration-1000 px-4 pt-2 pb-[12px] w-full">
              <p className="text-[12px] leading-[15.62px] tracking-[0.5%] text-[#000000B2] mb-[2px]">
                {isExpanded ? fullText : truncatedText}
              </p>
              <span
                onClick={() => setIsExpanded((prev) => !prev)}
                className="cursor-pointer p-[2px] text-[#8A226F] font-medium text-[12px] leading-[15.62px] tracking-[0.5%]"
              >
                {isExpanded ? "Hide" : "Read more"}
              </span>
            </div>
          )}
        </div>

        <div className="">
          <div
            onClick={() => setIsShowAboutThisVendor((prev) => !prev)}
            className="cursor-pointer flex items-center justify-between pt-[17px] px-[16px] pb-[8px]"
          >
            <h6 className="font-medium text-[14px] leading-[18.23px] tracking-[0.5%] text-[#000000]">
              About this vendor
            </h6>
            <ArrowHeadIcon
              className={`transform transition-transform duration-300 ${
                !isShowAboutThisVendor ? "rotate-180" : ""
              }`}
            />
          </div>
          {isShowAboutThisVendor && (
            <div className="animate-fade-in transform duration-1000 px-4 pt-2 pb-[23.5px] w-full">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <div
                    className="w-[52px] h-[52px] border-[1.63px] border-[#bbbbbbe5] rounded-[152.94px]"
                    style={{
                      backgroundImage: `url(${storeData?.storeLogo})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div>
                    <h4 className="text-[#000000E5] text-[12px] font-medium leading-[15.62px] tracking-[0.5%]">
                      {storeData?.storeName}
                    </h4>
                    <div className="flex items-center gap-[6px] flex-wrap">
                      <h6 className="text-[#00000066] text-[12px] font-medium leading-[15.62px] tracking-[0.5%]">
                        {storeData?.storeTagName}
                      </h6>
                      <DotIcon />
                      <div className="flex  items-center gap-[3.6px]">
                        <BlackStar />
                        <p className="text-[#00000066] text-[10px] leading-[13.02px] tracking-[0.5%]">
                          5.4
                        </p>
                      </div>
                      <DotIcon />
                      <div className="flex items-center gap-[3.2px]">
                        <ProfileIcon />
                        <p className="text-[#00000066] text-[10px] leading-[13.02px] tracking-[0.5%]">
                          100k
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <span className="cursor-pointer text-[#8A226F] text-[12px] font-medium leading-[15.62px] tracking-[0.5%]">
                  Follow
                </span>
              </div>

              <h6 className="mb-[10px] cursor-pointer text-[#000000B2] text-[12px] font-medium leading-[15.62px] tracking-[0.5%]">
                {vendorDescText.substring(0, 137)}...
              </h6>

              <div className="flex items-center gap-2 flex-wrap">
                {vendorQuality?.map((item, index) => (
                  <span
                    key={index + 1}
                    className="py-[2px] px-2 bg-[#00000008] rounded-[24px] text-[#000000E5] text-[10px] leading-[13.02px] tracking-[0.5%]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </OnboardingLayout>
    </AuthMiddleware>
  );
};

export default ProductOverviewPage;
