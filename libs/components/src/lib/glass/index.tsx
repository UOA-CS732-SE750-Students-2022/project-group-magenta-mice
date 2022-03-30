import React from "react";
import cx from "classnames";

interface GlassProps {
  className?: string;
}

export const Glass: React.FC<GlassProps> = ({ children, className }) => {
  return <div className={cx(className, "card")}>{children}</div>;
};
