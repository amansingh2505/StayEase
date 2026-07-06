function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">

      <div className="flex flex-col items-center">

        <div className="relative">

          <div className="h-20 w-20 rounded-full border-[6px] border-slate-200"></div>

          <div className="absolute left-0 top-0 h-20 w-20 animate-spin rounded-full border-[6px] border-transparent border-t-orange-500"></div>

        </div>

        <h2 className="mt-8 text-2xl font-semibold text-slate-700">
          Finding Best Hotels...
        </h2>

        <p className="mt-2 text-slate-500">
          Please wait a moment
        </p>

        <div className="mt-8 flex gap-2">

          <span className="h-3 w-3 animate-bounce rounded-full bg-orange-500"></span>

          <span
            className="h-3 w-3 animate-bounce rounded-full bg-orange-500"
            style={{ animationDelay: "0.2s" }}
          ></span>

          <span
            className="h-3 w-3 animate-bounce rounded-full bg-orange-500"
            style={{ animationDelay: "0.4s" }}
          ></span>

        </div>

      </div>

    </div>
  );
}

export default Loader;