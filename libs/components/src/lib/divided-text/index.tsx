export const DividedText: React.FC<{
  text: string;
}> = ({ text }) => (
  <h2 className="decorated">
    <span>{text}</span>
  </h2>
);
