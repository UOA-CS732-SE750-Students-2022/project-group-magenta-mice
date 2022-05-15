import cx from "classnames";
import Link from "next/link";

const color = "bg-emerald-600 hover:bg-emerald-500 transition-colors";
export function Index() {
  return (
    <>
      <div
        className="flex h-screen w-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-blend-multiply"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(23, 23, 23, 1), rgba(195, 195, 195, 0.3)), url('https://images.unsplash.com/photo-1643101810111-d364a77127b7?ixlib=rb-1.2.1)",
        }}
      >
        <h1 className="text-center font-['Inter'] text-3xl font-black text-white md:text-5xl lg:text-7xl">
          Simulate.Exchange
        </h1>
        <div className="my-3"></div>
        <p className="md:text-1xl w-1/2 text-center text-gray-300 md:w-1/3 lg:w-1/3 lg:text-2xl	">
          Create your own transparent simulated stock exchange and test out
          various trading strategies and methods
        </p>
        <div className="my-3"></div>
        <Link href="/auth" passHref>
          <button
            className={cx(
              color,
              "focus:shadow-outline rounded py-2 px-10 font-bold text-white focus:outline-none",
            )}
            type="button"
          >
            Get started
          </button>
        </Link>
      </div>
    </>
  );
}

export default Index;
