import PropTypes from 'prop-types'
import React from 'react'
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg'
import xCircleIcon from '../../../assets/images/icons/x-circle.svg'
import * as S from './styled'

export default function ToastMessage({ text, type }) {
  return (
    <S.Container type={type}>
      {type === 'danger' && <img src={xCircleIcon} alt='X'/>}
      {type === 'success' && <img src={checkCircleIcon} alt='Check'/>}
      <strong>
        {text}
      </strong>
    </S.Container>
  )
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'danger', 'default'])
}
ToastMessage.defaultProps = {
  type:'default'
}
