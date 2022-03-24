import GoogleLogin from "react-google-login";
import { ReactComponent as GoogleIcon } from "@simulate-exchange/assets";
import { Glass } from "@simulate-exchange/components";
import { DividedText } from "@simulate-exchange/components";
import { MailIcon } from "@heroicons/react/solid";
import { LockClosedIcon } from "@heroicons/react/solid";
import cx from "classnames";
import { useFullLoader, useRandomImage } from "@simulate-exchange/hooks";
import { useEffect, useState } from "react";

const color = "bg-emerald-600 hover:bg-emerald-500 transition-colors";

export function Index() {
  const { randomImage, isLoading } = useRandomImage();
  const [urlLoading, setUrlLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    const finishLoading = () => setUrlLoading(false);
    img.addEventListener("load", finishLoading);
    img.src = randomImage;
    return () => img.removeEventListener("load", finishLoading);
  }, [setUrlLoading, randomImage]);

  useFullLoader(isLoading || urlLoading);

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <>
      <div
        style={{
          backgroundImage: "url(" + randomImage + ")",
        }}
        className={"h-screen w-screen bg-no-repeat bg-cover absolute"}
      />
      <div className="h-screen w-screen justify-center items-center flex">
        <Glass className="p-4 text-gray-50 max-w-md w-full flex flex-col items-center gap-y-10 mx-4">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-2xl pt-5">Sign in</h1>
          </div>

          <div className=" w-full px-8 ">
            <GoogleLogin
              render={({ onClick }) => (
                <button
                  className={cx(
                    color,
                    "w-full p-3 rounded-md px-6 flex items-center gap-x-3 font-semibold text-gray-50 justify-center text-center",
                  )}
                  onClick={onClick}
                >
                  <GoogleIcon className="w-6 h-6 fill-white text-white" />
                  Continute with Google
                </button>
              )}
              clientId="137043782079-bd42vkkngrnvg1h1lk8rcc968ioahk1e.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>

          <DividedText text="Or sign in with email" />
          <form className="bg-transparent rounded px-8 pb-8 mb-4 w-full ">
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold"
                htmlFor="username"
              >
                Email
              </label>
              <div className="flex">
                <MailIcon className="w-12 h-12 bg-gray-800 rounded-l-md p-2"></MailIcon>
                <input
                  className="border-l border-gray-700 appearance-none rounded-r w-full py-2 px-3 text-gray-50 leading-tight outline-none bg-gray-900"
                  id="username"
                  type="text"
                  placeholder="Your Email"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                className="block text-white text-sm font-bold"
                htmlFor="password"
              >
                Password
              </label>
              <div className="flex">
                <LockClosedIcon className="w-12 h-12 bg-gray-800 rounded-l-md p-2"></LockClosedIcon>
                <input
                  className="border-l border-gray-700 appearance-none rounded-r w-full py-2 px-3 text-gray-50 leading-tight outline-none bg-gray-900"
                  id="username"
                  type="text"
                  placeholder="Your Password"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-12">
              <button
                className={cx(
                  color,
                  "text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
                )}
                type="button"
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm  text-emerald-600 hover:text-emerald-500 transition-colors"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </Glass>
      </div>
    </>
  );
}

export default Index;
