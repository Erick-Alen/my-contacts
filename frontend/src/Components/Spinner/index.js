import { StyledSpinner } from './styled'
import PropTypes from 'prop-types';

import React from 'react'
export default function Spinner({ size, light }) {
  return (
    <StyledSpinner light={light} size={size} />
  )
}

Spinner.propTypes = {
  size: PropTypes.number,
  light: PropTypes.bool,
};
Spinner.defaultProps = {
  size: 32,
};
