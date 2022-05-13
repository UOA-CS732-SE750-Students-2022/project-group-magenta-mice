import { Story, Meta } from "@storybook/react";
import {
  CopyButton,
  CopyButtonProps,
  useMockCopyButtonController,
} from "./index";

export default {
  component: CopyButton,
  title: "CopyButton",
} as Meta;

const Template: Story<CopyButtonProps> = (args) => <CopyButton {...args} />;

export const Primary = Template.bind({});
Primary.args = { useController: useMockCopyButtonController, text: "Copy" };
