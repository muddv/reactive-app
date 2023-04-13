import { createSignal, createEffect, createComputed, onClick } from "./lib"

const [count, setCount] = createSignal(0)
  const button = document.createElement("button")
  button.textContent = "+1"
  document.body.append(button)
  onClick(button, () => { setCount(count() + 1) })


function Counter(props) {
  const element = document.createElement("div")
  document.body.append(element)
  let text = ''
  createComputed(() => { count() % 2 === 0 ? text = 'even' : text = 'odd'})
  createEffect(() => element.textContent = "Count is " + props.count() + ", " + text)
  return element
}

Counter({ count: count })
