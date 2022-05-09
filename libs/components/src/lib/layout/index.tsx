import { useRouter } from "next/router";
import React from "react";
import AppLogo from "../app-logo";
import UserDropdown from "../user-dropdown";
import cx from "classnames";

const Header: React.FC = () => {
  const { push } = useRouter();

  return (
    <div className="z-10 bg-neutral-800 p-4 shadow-lg">
      <div className="mx-6 flex items-center justify-between sm:mx-10">
        <button
          className="flex h-auto w-auto items-center bg-transparent sm:ml-0"
          onClick={() => push("/exchange")}
        >
          <AppLogo />
        </button>
        <div className="ml-auto">
          <UserDropdown />
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <div className="mt-8 w-full opacity-50">
      <div className="w-full p-4 text-center text-sm text-gray-200">
        {"Copyright © 2022 Simulate.Exchange"}
      </div>
    </div>
  );
};

interface PageProps {
  sidebar?: React.ReactNode;
  sidebarClassName?: string;
}

const Page: React.FC<PageProps> = ({ children, sidebar }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-grow">
        <div className="mx-8 flex w-full grid-cols-[20%_60%_20%] flex-col lg:grid 2xl:mx-8">
          {sidebar ? <div>{sidebar}</div> : <div></div>}
          <div className="flex w-full flex-col bg-neutral-900 pt-8 lg:mx-8">
            {children}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const Layout = {
  Page,
  Footer,
} as const;

export { Layout };
