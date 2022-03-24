import cx from "classnames";

export interface DividedTextProps {
  text: string;
  className?: string;
}

export const DividedText: React.FC<DividedTextProps> = ({
  text,
  className,
}) => (
  <h2 className={cx("divided-text", className)}>
    <span>{text}</span>
  </h2>
);
