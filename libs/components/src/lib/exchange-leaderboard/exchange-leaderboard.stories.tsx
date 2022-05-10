import { Story, Meta } from "@storybook/react";
import { ExchangeLeaderboard, ExchangeLeaderboardProps } from ".";

export default {
  component: ExchangeLeaderboard,
  title: "Exchange Leaderboard",
} as Meta;

const Template: Story<ExchangeLeaderboardProps> = (args) => (
  <ExchangeLeaderboard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  topUsers: [
    {
      name: "Fraser McCallum",
      imageUrl: "https://www.w3schools.com/w3images/avatar2.png",
      profitLoss: 4000,
    },
    {
      name: "Fuki",
      imageUrl: "https://www.w3schools.com/w3images/avatar2.png",
      profitLoss: 3750,
    },
    {
      name: "Bruce",
      imageUrl: "https://www.w3schools.com/w3images/avatar2.png",
      profitLoss: 2500,
    },
    {
      name: "Brendon",
      imageUrl: "https://www.w3schools.com/w3images/avatar2.png",
      profitLoss: 1500,
    },
    {
      name: "James",
      imageUrl: "https://www.w3schools.com/w3images/avatar2.png",
      profitLoss: -6800,
    },
  ],
};
