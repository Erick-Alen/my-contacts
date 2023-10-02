import { StyledSpinner } from './styled'
import PropTypes from 'prop-types';

import React from 'react'
export default function Spinner({ size }) {
  console.log('size',size)
  return (
    <StyledSpinner size={size} />
  )
}

Spinner.propTypes = {
  size: PropTypes.number,
};
Spinner.defaultProps = {
  size: 32,
};
