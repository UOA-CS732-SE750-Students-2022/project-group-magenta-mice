import { Story, Meta } from "@storybook/react";
import { LoginPanel, LoginPanelProps } from ".";

export default {
  component: LoginPanel,
  title: "Login Panel",
} as Meta;

const Template: Story<LoginPanelProps> = (args) => <LoginPanel {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  useController: () => ({ onClick: () => console.log("Primary Clicked") }),
};

export const Secondary = Template.bind({});
Secondary.args = {
  useController: () => ({ onClick: () => console.log("Secondary Clicked") }),
};
