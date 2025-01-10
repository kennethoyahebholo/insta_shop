"use client";

import { ImageData } from "@/screens/Products/CreateProductPage/CreateProductPage.types";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";

interface IProfileData {
  fullName?: string;
  userName?: string;
  phone?: string | number;
  email?: string;
}

interface IStoreData {
  storeName?: string;
  storeTagName?: string;
  storePhoneNumber?: string;
  storeEmail?: string;
  storeLogo?: string;
}

interface IProductData {
  productTitle?: string;
  inventoryStocks?: string;
  productDescription?: string;
  productCollection?: string[];
  price?: string;
  oldPrice?: string;
  size?: string[];
  color?: string[];
  weight?: string[];
  shippingInventoryStocks?: string;
  shippingType?: string;
  productsImages?: ImageData[];
}

interface ContextProps {
  userEmailOfPhone: string;
  setUserEmailOfPhone: Dispatch<SetStateAction<string>>;
  profileData: IProfileData;
  setProfileData: Dispatch<SetStateAction<IProfileData>>;
  storeData: IStoreData;
  setStoreData: Dispatch<SetStateAction<IStoreData>>;
  productData: IProductData;
  setProductData: Dispatch<SetStateAction<IProductData>>;
}

const GlobalContext = createContext<ContextProps>({
  userEmailOfPhone: "",
  setUserEmailOfPhone: () => {},
  profileData: {},
  setProfileData: () => {},
  storeData: {},
  setStoreData: () => {},
  productData: {},
  setProductData: () => {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [profileData, setProfileData] = useState<IProfileData>({});
  const [storeData, setStoreData] = useState<IStoreData>({});
  const [productData, setProductData] = useState<IProductData>({});
  const [userEmailOfPhone, setUserEmailOfPhone] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        userEmailOfPhone,
        setUserEmailOfPhone,
        profileData,
        setProfileData,
        storeData,
        setStoreData,
        productData,
        setProductData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
