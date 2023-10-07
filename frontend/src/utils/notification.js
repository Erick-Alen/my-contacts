import EventManager from '../lib/EventManager'

export const toastEventManager = new EventManager()

export default function notification({ type, text, duration }) {
  toastEventManager.emit('addtoast', { type, text, duration })
}
// export default function toast({ type, text }) {
//   const event = new CustomEvent('addtoast', {
//     detail: {
//       type: type,
//       text: text
//     }
//   })
//   document.dispatchEvent(event)
// }
