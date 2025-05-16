import { KEYBOARD_KEYS } from "../../constants/game"
import { Key } from "./Key"

export const Keyboard = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      {KEYBOARD_KEYS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {row.map((key) => {
            const isLargeKey = key === 'Enter' || key === '←';
            return (
            <Key size={isLargeKey ? "xs" : undefined}>
              {key}
            </Key>
          )
          })}
        </div>
      ))}
    </div>
  )
}