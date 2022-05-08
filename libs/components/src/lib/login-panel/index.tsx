import { LockClosedIcon, MailIcon } from "@heroicons/react/solid";
import { ReactComponent as GoogleIcon } from "@simulate-exchange/assets";
import { useCreateUserMutation } from "@simulate-exchange/gql";
import { useIsLoggedIn } from "@simulate-exchange/hooks";
import cx from "classnames";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { DividedText, Glass } from "../..";

export interface LoginPanelProps {
  useController: typeof useLoginPanelController;
  invite?: string;
}

export const LoginPanel: React.FC<LoginPanelProps> = ({
  useController,
  invite,
}) => {
  const { onClick } = useController(invite);

  const color = "bg-emerald-600 hover:bg-emerald-500 transition-colors";

  return (
    <Glass className="mx-4 flex w-full max-w-md flex-col items-center gap-y-10 p-4 text-gray-50">
      <div className="flex flex-col items-center">
        <h1 className="pt-5 text-2xl font-bold">Sign in</h1>
      </div>

      <div className=" w-full px-8 ">
        <button
          className={cx(
            color,
            "flex w-full items-center justify-center gap-x-3 rounded-md p-3 px-6 text-center font-semibold text-gray-50",
          )}
          onClick={onClick}
        >
          <GoogleIcon className="h-6 w-6 fill-white text-white" />
          Continue with Google
        </button>
      </div>

      <DividedText text="Or sign in with email" className="text-gray-200" />
      <form className="mb-4 w-full rounded bg-transparent px-8 pb-8 ">
        <div className="mb-4">
          <label
            className="block text-sm font-bold text-white"
            htmlFor="username"
          >
            Email
          </label>
          <div className="flex">
            <MailIcon className="h-12 w-12 rounded-l-md bg-gray-800 p-2" />
            <input
              className="w-full appearance-none rounded-r border-l border-gray-700 bg-gray-900 py-2 px-3 leading-tight text-gray-50 outline-none"
              id="username"
              type="text"
              placeholder="Your Email"
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            className="block text-sm font-bold text-white"
            htmlFor="password"
          >
            Password
          </label>
          <div className="flex">
            <LockClosedIcon className="h-12 w-12 rounded-l-md bg-gray-800 p-2" />
            <input
              className="w-full appearance-none rounded-r border-l border-gray-700 bg-gray-900 py-2 px-3 leading-tight text-gray-50 outline-none"
              id="username"
              type="text"
              placeholder="Your Password"
            />
          </div>
        </div>
        <div className="mt-12 flex items-center justify-between">
          <button
            className={cx(
              color,
              "focus:shadow-outline rounded py-2 px-4 font-bold text-white focus:outline-none",
            )}
            type="button"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline text-sm font-bold  text-emerald-600 transition-colors hover:text-emerald-500"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </Glass>
  );
};

export const useLoginPanelController = (invite?: string) => {
  const router = useRouter();

  const provider = useMemo(() => new GoogleAuthProvider(), []);
  const auth = useMemo(() => getAuth(), []);

  const { loggedIn } = useIsLoggedIn();
  useEffect(() => {
    if (loggedIn) {
      if (invite) {
        router.push(`/invite/${invite}`);
      } else {
        router.push("/");
      }
    }
  }, [loggedIn, router, invite]);

  const [createUser] = useCreateUserMutation();

  const onClick = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        createUser({
          variables: {
            id: user.uid,
            email: user.email ?? "",
            name: user?.displayName ?? "Anonymous",
            profilePicUrl: user.photoURL,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return {
    onClick,
  };
};

export const useMockLoginPanelController: typeof useLoginPanelController =
  () => {
    return {
      onClick: () => console.log("Clicked signin"),
    };
  };

export default LoginPanel;
