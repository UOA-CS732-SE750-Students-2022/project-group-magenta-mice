import { InstrumentType } from "@simulate-exchange/gql";
import { Story, Meta } from "@storybook/react";
import { InstrumentCard, InstrumentCardProps } from ".";

export default {
  component: InstrumentCard,
  title: "InstrumentCard",
} as Meta;

const Template: Story<InstrumentCardProps> = (args) => (
  <div className="max-w-2xl">
    <InstrumentCard {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  instrument: {
    instrumentType: InstrumentType.Bond,
    name: "bond",
    recentTrades: [
      { instrumentId: "123", price: 10 },
      { instrumentId: "123", price: 12 },
      { instrumentId: "123", price: 14 },
      { instrumentId: "123", price: 17 },
      { instrumentId: "123", price: 15 },
    ],
  },
};
