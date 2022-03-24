export const DividedText: React.FC<{
  text: string;
}> = ({ text }) => (
  <h2 className="divided-text ">
    <span>{text}</span>
  </h2>
);
