export default class EventManager{
  constructor(){
    this.listeners = new Map()
  }

  on(event, listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    //push the listener into the event position
    this.listeners.get(event).push(listener);
  }

  //dispatch event
  emit(event, payload) {
    if (!this.listeners.has(event)) {
      return;
    }
    this.listeners.get(event).forEach((listener) => {
      listener(payload)
    })
  }

  removeListener(event, listenerToRemove) {
    const listeners = this.listeners.get(event)

    if (!listeners) {
      return;
    }

    const filteredListeners = listeners.filter((listener) => listener != listenerToRemove);
    this.listeners.set(event,  filteredListeners)
  }
}

// const toastEventManager = new EventManager()
// toastEventManager.on('addtoast', (payload) => {
//   console.log('addtoast Listener', payload);
// })

// toastEventManager.emit('addtoast', { type: 'danger', text: 'teste danger' })

// console.log(toastEventManager);
