import React from "react";

interface PermissionSettingsProps {
  useController: typeof usePermissionSettingsController;
}

export const PermissionSettings: React.FC<PermissionSettingsProps> = ({
  useController,
}) => {
  return (
    <p className="flex items-center gap-x-4 text-4xl font-bold text-gray-50">
      Permissions
    </p>
  );
};

export const usePermissionSettingsController = () => {
  return {};
};

export const useMockPermissionSettingsController: typeof usePermissionSettingsController =
  () => {
    return {};
  };

export default PermissionSettings;
