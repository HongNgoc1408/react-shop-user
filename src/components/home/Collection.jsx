import React from "react";

const Collection = () => {
  const backgroundImageStyle = {
    backgroundImage: `url("/images/collection-bg.png")`, // Use the correct path to your image
  };

  return (
    <div
      className="bg-cover bg-center bg-no-repeat xl:px-28 px-4 my-20"
      style={backgroundImageStyle}
    >
      <div className="h-[580px] flex justify-between md:flex-row items-center">
        <div className="md:w-1/2"></div>
        <div className="md:w-1/2">
          <img src="/images/zara-logo.png" alt="" />
          <p className="text-lg text-white capitalize my-8 md:w-2/3 leading-[32px]">
            Transparency plays against pops of color in sweaters, pants and
            lingerie. Checks, floral prints, paillettes and patchwork deepen the
            dimension of visual texture. Sculptural heels and jewellery add an
            accent of gleaming rigidity.
          </p>
          <button className="bg-light-button">
            See Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default Collection;
