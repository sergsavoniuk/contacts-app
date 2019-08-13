import React from "react";

import { Wrapper, Child } from "./Loader.components";

function Loader({ alignment, size, color }) {
  return (
    <Wrapper alignment={alignment} size={size}>
      {Array.from({ length: 12 }, (_, index) => (
        <Child key={index} color={color} />
      ))}
    </Wrapper>
  );
}

export default Loader;
