import React from "react";

function Container({ children }) {
  return (
    <div className="w-full  mx-auto bg-black overflow-x-hidden text-white">
      {children}
    </div>
  );
}

export default Container;
