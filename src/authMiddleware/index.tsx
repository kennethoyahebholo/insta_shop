"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useGlobalContext } from "@/context/store";

const AuthMiddleware = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { userEmailOfPhone, storeData, profileData, productData } =
    useGlobalContext();

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

  const isProductDataStepComplete =
    productData?.productTitle &&
    productData?.productDescription &&
    productData?.price &&
    productData?.productsImages?.length;

  const routeChecks = {
    "/onboarding/profile-setup": () => userEmailOfPhone,
    "/onboarding/store-setup": () => isProfileDataStepComplete,
    "/products/create": () => isStoreDataStepComplete,
    "/products/overview": () => isProductDataStepComplete,
  };

  const redirectPaths = {
    "/onboarding/profile-setup": "/onboarding",
    "/onboarding/store-setup": "/onboarding",
    "/products/create": "/onboarding",
    "/products/overview": "/onboarding",
  };

  useEffect(() => {
    const typedPathname = pathname as keyof typeof routeChecks; // Narrow type

    if (typedPathname in routeChecks) {
      const checkFn = routeChecks[typedPathname];
      if (checkFn && !checkFn()) {
        router.push(redirectPaths[typedPathname]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userEmailOfPhone,
    isStoreDataStepComplete,
    isProfileDataStepComplete,
    isProductDataStepComplete,
    pathname,
    router,
  ]);

  return children;
};

export default AuthMiddleware;
