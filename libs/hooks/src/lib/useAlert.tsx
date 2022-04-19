import { XIcon } from "@heroicons/react/outline";
import React, { useCallback, useContext, useEffect, useState } from "react";

interface AlertProps {
  message?: string;
  mode?: Mode;
  icon?: JSX.Element;
}

interface AlertContext {
  resetAlert: () => void;
  createAlert: (props: AlertProps, autoTimeout?: number) => void;
}

type Mode = "success" | "error" | "warning" | "info";

export const CornerAlertVar: AlertContext = {
  createAlert: (props: AlertProps, autoTimeout?: number) => null,
  resetAlert: () => null,
};

const CornerAlertContext = React.createContext<AlertContext>(CornerAlertVar);

/**
 * Utility for creating corner alerts.
 *
 * Calling createAlert will create an alert. The alert will be dismissed once
 * resetAlert() is called.
 *
 * The first argument is an object specifying the alert type, text and icon.
 *
 * An optional second argument can be provided to specify the time in
 * milliseconds before the alert is dismissed. If no time is provided, the alert
 * will remain until resetAlert() is called.
 *
 * @returns Function to create an alert, function to manually hide the alert.
 *
 * @example
 * // basic usage
 * const { createAlert } = useAlert();
 * createAlert({ icon: <ExclamationCircleIcon />, message: 'My Message', mode: 'warning' })
 */
export const useAlert = () => useContext(CornerAlertContext);

export const CornerAlertManager: React.FC = ({ children }) => {
  const [state, setState] = React.useState<AlertProps>({
    icon: undefined,
    message: "",
    mode: "info",
  });

  const resetAlert = useCallback(() => {
    setState({
      icon: undefined,
      message: "",
      mode: "info",
    });
  }, []);

  const create = useCallback(
    (p: AlertProps, autoTimeout?: number) => {
      setState(p);
      if (autoTimeout) {
        setTimeout(() => {
          resetAlert();
        }, autoTimeout);
      }
    },
    [resetAlert],
  );

  return (
    <CornerAlertContext.Provider value={{ createAlert: create, resetAlert }}>
      <CornerAlert {...state} onDismiss={() => resetAlert()} />
      {children}
    </CornerAlertContext.Provider>
  );
};

interface CornerAlertProps extends AlertProps {
  onDismiss: () => void;
}

export const CornerAlert: React.FC<CornerAlertProps> = ({
  message,
  mode = "info",
  onDismiss,
  icon,
}) => {
  const colorMap: Record<Mode, string> = {
    success: "text-green-500",
    error: "text-red-500",
    info: "text-blue-500",
    warning: "text-yellow-500",
  };

  const [topClassValue, setTopClassValue] = useState("-bottom-14");

  const [internalMessage, setInternalMessage] = useState(message);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (message) {
      setTopClassValue("bottom-10");
      return setInternalMessage(message);
    }

    if (internalMessage) {
      setTopClassValue("-bottom-14");
      timeout = setTimeout(() => {
        setInternalMessage("");
      }, 1000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [message, internalMessage]);

  return (
    <div
      className={`transition-all duration-300 ease-out ${topClassValue} left-14 z-50 fixed`}
    >
      <div className="bg-gradient-to-r from-blue-400 to-emerald-500 p-px rounded">
        <div
          className={`shadow-lg rounded py-2 px-4 bg-neutral-800 text-gray-100 `}
        >
          <div className="flex w-full items-center justify-between gap-x-4">
            <div
              className={`min-w-[1.5rem] ${colorMap[mode]} motion-safe:animate-pulse`}
            >
              {icon}
            </div>
            <div className="text-sm font-medium">{internalMessage}</div>
            <div
              onClick={onDismiss}
              className="ml-6 rounded outline-none focus:outline-none"
            >
              <XIcon className="w-8 p-1 cursor-pointer" onClick={onDismiss} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
