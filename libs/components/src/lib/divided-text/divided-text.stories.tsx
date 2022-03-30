import { Story, Meta } from "@storybook/react";
import { DividedText, DividedTextProps } from ".";

export default {
  component: DividedText,
  title: "DividedText",
} as Meta;

const Template: Story<DividedTextProps> = (args) => <DividedText {...args} />;

export const Primary = Template.bind({});
Primary.args = { text: "This is my Title", className: "text-gray-800" };
