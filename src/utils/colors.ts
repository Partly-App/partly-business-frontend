import { colorMap, struggleColorMap } from "@/constants/colors"

export const getRandomColor = (exclude: (keyof typeof colorMap)[] = []) => {
  const colorKeys = Object.keys(colorMap) as (keyof typeof colorMap)[]
  const filteredKeys = colorKeys.filter((key) => !exclude.includes(key))
  if (filteredKeys.length === 0) {
    throw new Error("No colors left to choose from!")
  }
  const randomKey =
    filteredKeys[Math.floor(Math.random() * filteredKeys.length)]
  return colorMap[randomKey]
}

export const getStruggleColor = (weight: number): string => {
    const w = Math.max(0, Math.min(100, weight))
    const thresholds = Object.keys(struggleColorMap)
      .map(Number)
      .sort((a, b) => a - b)
    for (const t of thresholds) {
      if (w <= t) {
        return struggleColorMap[t as keyof typeof struggleColorMap]
      }
    }
    return struggleColorMap[100]
  }