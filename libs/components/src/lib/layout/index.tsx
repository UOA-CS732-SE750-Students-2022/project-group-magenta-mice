import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="w-full mt-8 opacity-50">
      <div className="w-full p-4 text-gray-200 text-sm text-center">
        {"Copyright © 2022 Simulate.Exchange"}
      </div>
    </div>
  );
};

const Page: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-neutral-900">
      <div className="self-center flex-grow w-full max-w-6xl px-10">
        {children}
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
