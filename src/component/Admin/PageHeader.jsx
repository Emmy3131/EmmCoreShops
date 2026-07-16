import React from "react";

const PageHeader = ({
  title,
  subtitle,
  buttonText,
  buttonIcon,
  onButtonClick,
  rightContent,
  gradient = "from-indigo-600 via-blue-600 to-cyan-600",
  children,
}) => {
  return (
    <div
      className={`
        bg-gradient-to-r
        ${gradient}
        rounded-3xl
        p-6
        md:p-8
        text-white
        shadow-xl
        mb-8
      `}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-2 text-white/80">
              {subtitle}
            </p>
          )}
        </div>

        {rightContent ? (
          rightContent
        ) : (
          buttonText && (
            <button
              onClick={onButtonClick}
              className="
                bg-white
                text-indigo-600
                px-5
                py-3
                rounded-xl
                font-semibold
                shadow
                flex
                items-center
                gap-2
                hover:scale-105
                transition
              "
            >
              {buttonIcon}
              {buttonText}
            </button>
          )
        )}
      </div>

      {children && (
        <div className="mt-6">
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;