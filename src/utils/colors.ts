import { colorMap, struggleColorMap } from "@/constants/colors"

const colorKeys = Object.keys(colorMap) as (keyof typeof colorMap)[]

export const getRandomColor = (
  id: string,
  exclude: (keyof typeof colorMap)[] = [],
) => {
  const filteredKeys = colorKeys.filter((key) => !exclude.includes(key))
  if (filteredKeys.length === 0) {
    throw new Error("No colors left to choose from!")
  }

  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash += id.charCodeAt(i)
  }
  const key = filteredKeys[hash % filteredKeys.length]
  return colorMap[key]
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
