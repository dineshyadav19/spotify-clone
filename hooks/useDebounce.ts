import { useEffect, useState } from 'react'

function useDebounce<T>(value: T, delay?: number): T {
  const [debouceValue, setDebounceValue] = useState<T>(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay || 500)

    return () => clearTimeout(timer)
  }, [value, delay])
  return debouceValue
}

export default useDebounce