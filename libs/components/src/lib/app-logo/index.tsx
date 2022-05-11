import React from "react";
import { Logo } from "@simulate-exchange/assets";
import Image from "next/image";

export const AppLogo: React.FC = () => {
  return <Image width={250} height={250} src={Logo} />;
};

export default AppLogo;
