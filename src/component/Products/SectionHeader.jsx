import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const SectionHeader = ({
  eyebrow = "Featured for you",
  title,
  subtitle,
  viewAllLink = "/products",
}) => {
  return (
    <div
      className="
        flex
        items-end
        justify-between
        gap-4
        mb-5
      "
    >
      {/* LEFT SIDE */}

      <div className="min-w-0">

        {/* EYEBROW */}

        <div
          className="
            flex
            items-center
            gap-2
            mb-1.5
          "
        >
          <span
            className="
              w-6
              sm:w-8
              h-1
              rounded-full
              bg-gradient-to-r
              from-blue-600
              to-cyan-400
            "
          />

          <p
            className="
              text-[10px]
              sm:text-xs
              font-bold
              uppercase
              tracking-widest
              text-blue-600
            "
          >
            {eyebrow}
          </p>
        </div>

        {/* TITLE */}

        <h2
          className="
            text-xl
            sm:text-2xl
            lg:text-3xl
            font-extrabold
            text-slate-900
            leading-tight
          "
        >
          {title}
        </h2>

        {/* SUBTITLE */}

        {subtitle && (
          <p
            className="
              mt-1
              text-xs
              sm:text-sm
              text-slate-500
              line-clamp-1
            "
          >
            {subtitle}
          </p>
        )}

      </div>

      {/* VIEW ALL */}

      <Link
        to={viewAllLink}
        className="
          group
          flex
          items-center
          gap-2
          shrink-0
          text-xs
          sm:text-sm
          font-bold
          text-blue-600
          hover:text-cyan-600
          transition-colors
        "
      >
        <span>
          <span className="hidden sm:inline">
            View All
          </span>

          <span className="sm:hidden">
            View
          </span>
        </span>

        <span
          className="
            flex
            items-center
            justify-center
            w-6
            h-6
            rounded-full
            bg-blue-50
            group-hover:bg-cyan-50
            transition-colors
          "
        >
          <FaArrowRight
            size={10}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-0.5
            "
          />
        </span>
      </Link>

    </div>
  );
};

export default SectionHeader;