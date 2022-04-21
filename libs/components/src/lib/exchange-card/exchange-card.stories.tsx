import { Story, Meta } from "@storybook/react";
import { ExchangeCard, ExchangeCardProps } from ".";

export default {
  component: ExchangeCard,
  title: "Exchange Card",
} as Meta;

const Template: Story<ExchangeCardProps> = (args) => <ExchangeCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: "This is my Name",
  colour: "bg-rose-600",
  isAddCard: false,
};
