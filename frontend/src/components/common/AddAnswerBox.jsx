export default function AddAnswerBox({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 rounded-lg px-3 h-10 text-sm text-white"
    >
      +
    </button>
  )
}