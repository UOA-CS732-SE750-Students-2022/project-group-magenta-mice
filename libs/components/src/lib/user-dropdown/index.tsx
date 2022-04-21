import { getAuth } from "@firebase/auth";
import { Popover, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  CodeIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import React, { Fragment, useMemo, useState } from "react";
import { usePopper } from "react-popper";
import cx from "classnames";
import { useIsLoggedIn } from "@simulate-exchange/hooks";

const iconClass = "bg-teal-100 text-teal-500 rounded-lg p-2.5";

const UserDropdown: React.FC = () => {
  const [referenceElement, setReferenceElement] = useState<Element | null>();
  const [popperElement, setPopperElement] = useState<HTMLElement | null>();
  const { styles, attributes } = usePopper(referenceElement, popperElement);

  const { user } = useIsLoggedIn();

  const dropdownOptions = useMemo(
    () => [
      {
        name: "Github",
        description: "View the App's Source on Github",
        action: () => {
          window.open(
            "https://github.com/UOA-CS732-SE750-Students-2022/simulate.exchange",
            "__blank",
          );
        },
        icon: () => <CodeIcon className={iconClass} />,
      },
      {
        name: "Logout",
        description: "Logout of the Simulate Exchange.",
        action: async () => {
          await getAuth().signOut();
        },
        icon: () => <LogoutIcon className={iconClass} />,
      },
    ],
    [],
  );

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={cx(
              { "text-opacity-90": !open },
              "rounded-md bg-gray-800 bg-opacity-0 px-3 py-2 text-gray-200 transition-all hover:bg-opacity-5",
            )}
            ref={setReferenceElement}
          >
            <div className="flex flex-row gap-x-4">
              <div className="flex flex-col text-right">
                <span className="-mb-1 mt-0.5 font-bold text-gray-200">
                  {user?.displayName ?? "Anonymous User"}
                </span>
                <span className="hidden text-gray-400 sm:block">
                  {user?.email ?? "Anonymous Email"}
                </span>
              </div>
              <img
                src={user?.photoURL ?? ""}
                referrerPolicy="no-referrer"
                alt="User Avatar"
                className="w-12 rounded-full"
              />
              <ChevronDownIcon className="w-4 text-gray-200" />
            </div>
          </Popover.Button>
          {/* Hack to align the popper on the right */}
          <div className="relative ml-auto w-px">
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                className="absolute z-40 mt-2 w-screen max-w-sm -translate-x-96 transform px-4 sm:px-0"
                ref={setPopperElement}
                style={styles["popper"]}
                {...attributes["popper"]}
              >
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-neutral-700 p-6 lg:grid-cols-1">
                    {dropdownOptions.map((item) => (
                      <button
                        key={item.name}
                        onClick={item.action}
                        className="-m-3 flex items-center rounded-lg p-4 text-left transition duration-150 ease-in-out hover:bg-neutral-600"
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                          <item.icon aria-hidden="true" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-200">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>{" "}
          </div>
        </>
      )}
    </Popover>
  );
};

export default UserDropdown;
