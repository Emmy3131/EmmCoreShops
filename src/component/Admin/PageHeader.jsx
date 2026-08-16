import React from "react";

const PageHeader = ({
  title,
  subtitle,
  buttonText,
  buttonIcon,
  onButtonClick,
  rightContent,
  gradient = "from-blue-600 via-blue-600 to-cyan-500",
  children,
}) => {
  return (
    <section
      className={`
        relative
        overflow-hidden
        bg-gradient-to-br
        ${gradient}
        rounded-3xl
        p-6
        sm:p-7
        md:p-8
        lg:p-9
        text-white
        shadow-xl
        shadow-blue-500/10
        mb-8
      `}
    >
      {/* =========================================
          DECORATIVE BACKGROUND
      ========================================= */}

      {/* TOP RIGHT GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          -top-24
          -right-20
          w-72
          h-72
          rounded-full
          bg-white/10
          blur-3xl
        "
      />

      {/* BOTTOM LEFT GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          -left-20
          w-80
          h-80
          rounded-full
          bg-cyan-300/10
          blur-3xl
        "
      />

      {/* DECORATIVE CIRCLES */}
      <div
        className="
          pointer-events-none
          absolute
          top-8
          right-24
          w-20
          h-20
          rounded-full
          border
          border-white/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          top-12
          right-28
          w-10
          h-10
          rounded-full
          border
          border-white/10
        "
      />

      {/* =========================================
          CONTENT
      ========================================= */}
      <div className="relative z-10">
        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-6
          "
        >
          {/* =====================================
              LEFT SIDE
          ===================================== */}
          <div className="min-w-0">
            {/* SMALL LABEL */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                px-3
                py-1.5
                mb-3
                rounded-full
                bg-white/10
                border
                border-white/10
                backdrop-blur-sm
              "
            >
              <span
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-cyan-300
                  shadow-sm
                  shadow-cyan-300
                "
              />

              <span
                className="
                  text-[10px]
                  sm:text-xs
                  font-bold
                  uppercase
                  tracking-widest
                  text-white/80
                "
              >
                Admin Panel
              </span>
            </div>

            {/* TITLE */}
            <h1
              className="
                text-2xl
                sm:text-3xl
                md:text-4xl
                lg:text-[2.5rem]
                font-black
                tracking-tight
                leading-tight
              "
            >
              {title}
            </h1>

            {/* SUBTITLE */}
            {subtitle && (
              <p
                className="
                  mt-2
                  max-w-2xl
                  text-sm
                  sm:text-base
                  text-white/75
                  leading-relaxed
                "
              >
                {subtitle}
              </p>
            )}
          </div>

          {/* =====================================
              RIGHT SIDE
          ===================================== */}
          <div className="shrink-0">
            {rightContent ? (
              rightContent
            ) : (
              buttonText && (
                <button
                  type="button"
                  onClick={onButtonClick}
                  className="
                    group
                    inline-flex
                    items-center
                    justify-center
                    gap-2.5
                    px-5
                    py-3
                    rounded-xl
                    bg-white
                    text-blue-600
                    font-bold
                    text-sm
                    shadow-lg
                    shadow-black/10
                    hover:bg-blue-50
                    hover:shadow-xl
                    hover:-translate-y-0.5
                    active:translate-y-0
                    transition-all
                    duration-200
                  "
                >
                  {/* BUTTON ICON */}
                  {buttonIcon && (
                    <span
                      className="
                        flex
                        items-center
                        justify-center
                        w-7
                        h-7
                        rounded-lg
                        bg-blue-50
                        text-blue-600
                        group-hover:bg-blue-100
                        transition-colors
                      "
                    >
                      {buttonIcon}
                    </span>
                  )}

                  <span>{buttonText}</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* =========================================
            CHILDREN / EXTRA CONTENT
        ========================================= */}
        {children && (
          <div
            className="
              mt-6
              pt-6
              border-t
              border-white/10
            "
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default PageHeader;