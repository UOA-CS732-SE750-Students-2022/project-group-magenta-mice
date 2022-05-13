import { Permission } from "@simulate-exchange/gql";
import { Story, Meta } from "@storybook/react";
import {
  ExchangeUserSummary,
  ExchangeUserSummaryProps,
  useMockExchangeUserSummaryController,
} from "./index";

export default {
  component: ExchangeUserSummary,
  title: "ExchangeUserSummary",
} as Meta;

const Template: Story<ExchangeUserSummaryProps> = (args) => (
  <ExchangeUserSummary {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  permission: Permission.Admin,
  user: {
    name: "John Doe",
    email: "john@doe.com",
    profitLoss: 500,
    profilePicUrl:
      "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png",
  },
  useController: useMockExchangeUserSummaryController,
};
