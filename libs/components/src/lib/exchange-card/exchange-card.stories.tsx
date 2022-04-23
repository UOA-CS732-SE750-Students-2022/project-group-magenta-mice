import { Story, Meta } from "@storybook/react";
import { ExchangeCard, ExchangeCardProps } from ".";

export default {
  component: ExchangeCard,
  title: "Exchange Card",
} as Meta;

const Template: Story<ExchangeCardProps> = (args) => (
  <div className="max-w-xl">
    <ExchangeCard {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  name: "NASDAQ Exchange",
  colour: "bg-rose-600",
  isAddCard: false,
  currentInstruments: [
    { name: "BND", type: "Bond" },
    { name: "SPY", type: "ETF" },
    { name: "QQQ", type: "ETF" },
  ],
  participants: 4,
  profitLoss: 7300,
};
