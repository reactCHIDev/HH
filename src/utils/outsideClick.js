/* eslint-disable no-else-return */
import { useEffect } from 'react'

export default function useOutsideClick(ref, handler, classId) {
  useEffect(() => {
    function handleClickOutside(event) {
      const containsClasses = () => {
        if (typeof classId === 'object') {
          return !classId.includes(event.target.classList?.value)
        } else {
          return !event.target.classList.contains(classId)
        }
      }
      if (classId) {
        if (ref.current && !ref.current.contains(event.target) && containsClasses()) {
          handler()
        }
      } else if (ref.current && !ref.current.contains(event.target)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
    // eslint-disable-next-line
  }, [ref])
}
