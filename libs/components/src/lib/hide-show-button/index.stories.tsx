import { Story, Meta } from "@storybook/react";
import {
  HideShowButton,
  HideShowButtonProps,
  useMockHideShowButtonController,
} from "./index";

export default {
  component: HideShowButton,
  title: "HideShowButton",
} as Meta;

const Template: Story<HideShowButtonProps> = (args) => (
  <HideShowButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  useController: useMockHideShowButtonController,
  isShown: true,
  onClick: () => null,
};
