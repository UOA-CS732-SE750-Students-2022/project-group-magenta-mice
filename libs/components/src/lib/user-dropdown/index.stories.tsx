import { Story, Meta } from "@storybook/react";
import {
  UserDropdown,
  UserDropdownProps,
  useMockUserDropdownController,
} from "./index";

export default {
  component: UserDropdown,
  title: "UserDropdown",
} as Meta;

const Template: Story<UserDropdownProps> = (args) => <UserDropdown {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  inHeader: true,
  useController: useMockUserDropdownController,
};
