import React from "react";

interface OverviewSettingsProps {
  useController: typeof useOverviewSettingsController;
}

export const OverviewSettings: React.FC<OverviewSettingsProps> = ({
  useController,
}) => {
  return (
    <p className="flex items-center gap-x-4 text-4xl font-bold text-gray-50">
      Overview
    </p>
  );
};

export const useOverviewSettingsController = () => {
  return {};
};

export const useMockOverviewSettingsController: typeof useOverviewSettingsController =
  () => {
    return {};
  };

export default OverviewSettings;
