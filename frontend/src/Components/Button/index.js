import React from 'react'
import PropTypes from 'prop-types'

import * as S from './styled'
import Spinner from '../Spinner'


export default function Button({ type, disabled, isLoading, children, danger, ghost, onClick }) {
  return (
    <S.StyledButton onClick={onClick} type={type} disabled={disabled | isLoading} danger={danger} ghost={ghost}>
      {isLoading ? <Spinner size={16}/> : children}
    </S.StyledButton>
  )
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  ghost: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  danger: PropTypes.bool,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  type: 'button',
  disabled: false,
  isLoading: false,
  ghost: false,
}
