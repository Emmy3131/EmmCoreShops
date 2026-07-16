const ReportSummaryCard = ({ title, value, icon, color }) => {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow
      p-5
      hover:shadow-lg
      transition
      "
    >
      <div
        className="
        flex
        justify-between
        items-center
        "
      >
        <div>
          <p
            className="
            text-sm
            text-gray-500
            "
          >
            {title}
          </p>

          <h2
            className={`
            text-2xl
            font-bold
            mt-2
            ${color}
            `}
          >
            {value}
          </h2>
        </div>

        <div
          className="
          text-3xl
          text-gray-300
          "
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default ReportSummaryCard;
