
export default function UserInputBox() {
  return (
    <div className="flex-1">
      <input 
        className="w-full h-10 rounded-lg px-3 border border-gray-600 bg-gray-20 text-gray-600 placeholder:text-xs" 
        placeholder="Input your answer, no peaking :>"
        type="text"
      />
    </div>
  )
}