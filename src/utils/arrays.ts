export const toggleArraySelection = <T>(
  item: T,
  setSelected: React.Dispatch<React.SetStateAction<T[]>>,
) => {
  setSelected((prev) =>
    prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
  )
}

export const arraysEqualUnordered = <T>(a: T[], b: T[]): boolean =>
  a.length === b.length && [...a].sort().every((v, i) => v === [...b].sort()[i])
