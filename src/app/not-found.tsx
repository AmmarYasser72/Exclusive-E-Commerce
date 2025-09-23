import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="flex gap-3 mt-20 text-sm w-3/4 lg:w-5/6 mx-auto">
        <Link href="#" className="opacity-50">
          Home
        </Link>
        <span className="opacity-50">
          /
        </span>
        <span className="font-medium cursor-default">
        404 error
        </span>
      </div>
      <div className="flex flex-col items-center mx-auto h-screen justify-center">
        <div className="flex flex-col items-center">
          <h2 className="font-inter font-medium cursor-default mb-10 text-5xl md:text-6xl lg:text-7xl 2xl:text-9xl">
            404 Not Found
          </h2>
          <span className="mb-20">
            Your visited page not found. You may go home page.
          </span>
        </div>
        <Link
          href="#"
          className="bg-exclusive-secondary hover:bg-exclusive-secondary-hover duration-200 text-exclusive-text-1 text-sm font-medium mb-16 py-4 px-12 rounded md:text-base">Back to home page
        </Link>
      </div>
    </>
  );
}