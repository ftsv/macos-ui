import { RefObject, useEffect } from 'react'

function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !("nodeType" in e)) {
      throw new Error(`Node expected`)
  }
}

export const useOutsideClick = (ref: RefObject<HTMLElement>, cb: (...args: any[]) => void) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      assertIsNode(event.target)

      if (!ref.current?.contains(event.target)) {
        cb(event)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    };
  }, [ref])
}