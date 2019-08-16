import React from 'react';
import { string, number } from 'prop-types';

import { Wrapper, Child } from './Loader.components';

function Loader({ alignment, size, color }) {
  return (
    <Wrapper alignment={alignment} size={size}>
      {Array.from({ length: 12 }, (_, index) => (
        <Child key={index} color={color} />
      ))}
    </Wrapper>
  );
}

Loader.propTypes = {
  alignment: string,
  size: number,
  color: string
};

Loader.defaultProps = {
  alignment: undefined,
  size: undefined,
  color: undefined
};

export default Loader;
