import React from "react";

const Title = ({ title, subTitle, align = "center" }) => {
  return (
    <div
      className={`flex flex-col gap-2 ${
        align === "left"
          ? "items-start text-left"
          : "items-center text-center"
      }`}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
        {title}
      </h2>
      <p className="text-gray-500 max-w-xl mb-5">
        {subTitle}
      </p>
    </div>
  );
};

export default Title;
