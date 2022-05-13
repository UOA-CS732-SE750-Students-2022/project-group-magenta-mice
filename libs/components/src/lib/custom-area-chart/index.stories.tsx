import { Story, Meta } from "@storybook/react";
import { CustomAreaChart, CustomAreaChartProps } from "./index";

export default {
  component: CustomAreaChart,
  title: "CustomAreaChart",
} as Meta;

const Template: Story<CustomAreaChartProps> = (args) => (
  <div className="h-40 w-96">
    <CustomAreaChart {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = { color: "#ff0000", data: [1, 5, 4, 7, 8, 9, 12, 5] };
