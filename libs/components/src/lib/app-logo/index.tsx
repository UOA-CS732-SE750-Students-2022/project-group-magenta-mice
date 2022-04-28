import React from "react";
import { Logo } from "@simulate-exchange/assets";
import Image from "next/image";

const AppLogo: React.FC = () => {
  return <Image width={50} height={50} src={Logo} />;
};

export default AppLogo;
