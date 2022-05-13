import { Story, Meta } from "@storybook/react";
import { ColorSelect, ColorSelectProps } from "./index";

export default {
  component: ColorSelect,
  title: "ColorSelect",
} as Meta;

const Template: Story<ColorSelectProps> = (args) => <ColorSelect {...args} />;

export const Primary = Template.bind({});
Primary.args = { selectedColor: 1, setSelectedColor: () => null };
