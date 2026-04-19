import { IconSearch } from "@tabler/icons-react"
import { useState, useRef } from "react"

export const SearchContainer = () => {
  const [value, setValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!value.trim()) return

    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(value)}`
    return
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!value.trim()) {
      e.preventDefault()
      inputRef.current?.focus()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center group">
      <button type="submit" onClick={handleButtonClick} className="absolute left-0 z-10 h-full w-15 bg-(--palm-medium) px-3 text-(--palm-deep) rounded-full flex flex-col items-center justify-center cursor-default! transition-colors duration-200 group-focus-within:cursor-pointer! group-focus-within:bg-(--palm-hard) group-focus-within:text-white group-focus-within:hover:bg-(--palm-deep)">
        <IconSearch />
      </button>

      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-(--palm) text-(--palm-soft) w-2xl py-4 pl-20 rounded-full border-2 border-transparent outline-none container-shadow transition-all duration-200 focus:border-(--palm-hard)"
        placeholder="Search anything..."
      />
    </form>
  )
}
