const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">

        <div
          className="
            w-10
            h-10
            border-4
            border-gray-300
            border-t-black
            rounded-full
            animate-spin
            mx-auto
            mb-4
          "
        ></div>

        <p className="text-gray-500">
          {text}
        </p>

      </div>
    </div>
  );
};

export default Loader;