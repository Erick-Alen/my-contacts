import React, { useState } from 'react'
import ToastMessage from '../ToastMessage'
import * as S from './styled'

export default function ToastContainer() {
  const [messages] = useState([])
  return (
    <S.Container>
      {messages.map((message) =>
        <ToastMessage key={message.id} text={message.text} type={message.type} />
      )}
    </S.Container>
  )
}
