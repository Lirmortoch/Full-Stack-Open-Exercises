import { useState } from "react"

export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const onReset = (event) => {
    setValue('')
  }

  return {
    name,
    value,
    onChange,
    onReset,
  }
}