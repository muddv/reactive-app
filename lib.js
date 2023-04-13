const context = []

export function createSignal(value) {
  const subscribers = new Set()
  const read = () => {
    const current = context[context.length - 1]
    if (current) {
      subscribers.add(current)
    }
    return value
  }
  const write = (nextValue) => {
    value = nextValue
    for (const sub of subscribers) {
      sub()
    }
  }
  return [read, write]
}

export function createEffect(fn) {
  const execute = () => {
    context.push(execute)
    try {
      fn()
    } finally {
      context.pop()
    }
  }
  execute()
}

export function onClick(button, callback) {
  return button.addEventListener('click', () => {callback()})
}

export function createComputed(fn) {
  const [s, set] = createSignal()
  createEffect(() => set(fn()))
  return s
}
