import { Components } from "@simulate-exchange/components";
import { useGetUserQuery } from "@simulate-exchange/gql";
import Image from "next/image";
import GoogleLogin from "react-google-login";
import { ReactComponent as GoogleIcon } from "@simulate-exchange/assets";
import { Glass } from "@simulate-exchange/components";
import { DividedText } from "@simulate-exchange/components";

export function Index() {
  const responseGoogle = (response) => {
    console.log(response);
  };
  // return (
  //   <div className=" flex">
  //     <div className="bg-neutral-900 p-4 h-screen max-w-lg flex-col flex justify-center items-center text-gray-50 gap-y-20">
  //       <div className="flex-col flex gap-y-2">
  //         <div className=" border-y-2 py-2 text-xl">
  //           <p className="text-center italic ">
  //             {
  //               "Without passion, you don't have energy. Without energy, you have nothing."
  //             }
  //           </p>
  //         </div>
  //         <p className="text-center italic text-neutral-200">
  //           {"- Warren Buffet"}
  //         </p>
  //       </div>

  //       <GoogleLogin
  //         render={({ onClick }) => (
  //           <button
  //             className="bg-neutral-700 p-3 rounded-md px-6 flex items-center gap-x-3 font-semibold"
  //             onClick={onClick}
  //           >
  //             <GoogleIcon className="w-6 h-6" />
  //             Continute with Google
  //           </button>
  //         )}
  //         clientId="137043782079-bd42vkkngrnvg1h1lk8rcc968ioahk1e.apps.googleusercontent.com"
  //         buttonText="Login"
  //         onSuccess={responseGoogle}
  //         onFailure={responseGoogle}
  //         cookiePolicy={"single_host_origin"}
  //       />
  //     </div>
  //     <div className="relative flex-grow">
  //       <Image
  //         layout="fill"
  //         objectFit="cover"
  //         alt="spash"
  //         src="https://images.unsplash.com/photo-1505275350441-83dcda8eeef5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
  //       />
  //     </div>
  //   </div>
  // );

  return (
    <div
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1505275350441-83dcda8eeef5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80)",
      }}
      className="h-screen w-screen justify-center items-center flex"
    >
      {/* <Image
        layout="fill"
        objectFit="cover"
        alt="spash"
        src="https://images.unsplash.com/photo-1505275350441-83dcda8eeef5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
      /> */}
      <Glass className="p-4 text-gray-50 max-w-md flex flex-col items-center gap-y-6">
        <div className="flex flex-col items-center">
          <p className="font-bold text-2xl">Sign in</p>
        </div>
        <div>
          <div className=" border-y-2 py-2 text-xl">
            <p className="text-center italic ">
              {
                "Without passion, you don't have energy. Without energy, you have nothing."
              }
            </p>
          </div>
          <p className="text-center italic text-neutral-200 ">
            {"- Warren Buffet"}
          </p>
        </div>
        <div>
          <GoogleLogin
            render={({ onClick }) => (
              <button
                className="bg-white p-3 rounded-md px-6 flex items-center gap-x-3 font-semibold text-black"
                onClick={onClick}
              >
                <GoogleIcon className="w-6 h-6" />
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
      </Glass>
    </div>
  );
}

export default Index;
