export const renderWithBlack = (text: string) => {
  const parts = text.split(/(<black>.*?<\/black>)/g)
  return parts.map((part, i) => {
    if (part.startsWith("<black>") && part.endsWith("</black>")) {
      return (
        <span key={i} className="font-black">
          {part.slice(7, -8)}
        </span>
      )
    }
    return part
  })
}
