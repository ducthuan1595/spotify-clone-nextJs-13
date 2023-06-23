"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/authModal";
import UploadModal from "@/components/uploadModal";
import { ProductWithPrice } from "@/types";

interface ModalProviderProps {
  products?: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({
  products
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      {/* <SubscribeModal products={products} /> */}
      <UploadModal />
    </>
  );
}

export default ModalProvider;