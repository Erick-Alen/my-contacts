import React, { useCallback, useEffect, useState } from 'react'
import ToastMessage from '../ToastMessage'
import * as S from './styled'
import { toastEventManager } from '../../../utils/toast'

export default function ToastContainer() {
  const [messages,setMessages] = useState([
    // {id: Math.random(), type: 'default', text: 'Default text'},
    // {id: Math.random(), type: 'success', text: 'Success text'},
    // {id: Math.random(), type: 'danger', text: 'Danger text'}
  ])

  useEffect(() => {
    const handleAddToast = ({ type, text }) => {
      // const { type, text } = ev.detail;
      setMessages((prev) => [
        ...prev,
        { id: Math.random(), type, text },
      ]);
    }

    // document.addEventListener('addtoast', handleAddToast);
    toastEventManager.on('addtoast', handleAddToast);

    //cleanup function to remove the liste
    return () => {
      // document.removeEventListener('addtoast', handleAddToast)
      toastEventManager.removeListener('addtoast', handleAddToast)
    }
  }, [])

  // callback to memorize the function, to not cause rerenders on the toastMessage's useEffect
  const handleRemoveMessage = useCallback((id) => {
    setMessages((prev) => prev.filter((message) => message.id !== id))
  }, [])

  return (
    <S.Container>
      {messages.map((message) =>
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      )}
    </S.Container>
  )
}
