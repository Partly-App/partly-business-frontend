import clsx from "clsx"

type WellBeingScoreProps = {
  score: number // 0-100
  prevScore?: number
  size?: number
  mini?: boolean
  className?: string
}

const SEGMENTS = [
  {
    color: "#F63F57",
    d: "M 12 71 A 53 53 0 0 1 18.91676873622339 44.82108107103576",
  },
  {
    color: "#EA8C00",
    d: "M 23.008648902174897 38.66230631323281 A 53 53 0 0 1 44.46167391803855 22.141252965809464",
  },
  {
    color: "#FFC800",
    d: "M 51.46137482940311 19.75836040396365 A 53 53 0 0 1 78.5386251705969 19.75836040396365",
  },
  {
    color: "#93D900",
    d: "M 85.53832608196146 22.14125296580947 A 53 53 0 0 1 106.99135109782512 38.662306313232826",
  },
  {
    color: "#2BD887",
    d: "M 111.08323126377661 44.82108107103576 A 53 53 0 0 1 118 71",
  },
]

const scoreToPosition = (score: number) => {
  const angle = 180 - (score / 100) * 180
  const r = 53
  const cx = 65
  const cy = 71
  const rad = (angle * Math.PI) / 180
  return {
    x: cx + r * Math.cos(rad),
    y: cy - r * Math.sin(rad),
  }
}

const WellBeingScore = ({
  score,
  prevScore,
  size = 130,
  mini,
  className,
}: WellBeingScoreProps) => {
  const clampedScore = Math.max(0, Math.min(100, score))
  const indicator = scoreToPosition(clampedScore)
  const scoreDifference = score - (prevScore || 0)

  const height = (size * 80) / 130 // keep aspect ratio

  return (
    <div
      className={clsx("relative flex items-center justify-center", className)}
      style={{ width: size, height }}
    >
      <svg width={size} height={height} viewBox="0 0 130 80">
        {SEGMENTS.map((seg, i) => (
          <path
            key={i}
            d={seg.d}
            stroke={seg.color}
            strokeWidth={6}
            strokeLinecap="round"
            fill="none"
          />
        ))}

        <circle
          cx={indicator.x}
          cy={indicator.y}
          r={6}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={3}
        />
        <circle cx={indicator.x} cy={indicator.y} r={5} fill="#7A6BF4" />
      </svg>
      <div className="absolute bottom-0 mb-1 w-full text-center">
        <div>
          <div className="relative mx-auto w-fit">
            <span
              className={clsx(
                "text-white font-montserratAlt font-black",
                size >= 280
                  ? "text-12xl"
                  : size >= 220
                    ? "text-6xl"
                    : size >= 180
                      ? "text-3xl"
                      : size >= 150
                        ? "text-base"
                        : "text-sm",
              )}
            >
              {clampedScore}
            </span>
            {!mini && prevScore && scoreDifference !== 0 ? (
              <span
                className={clsx(
                  "absolute my-auto h-fit leading-none",
                  scoreDifference > 0
                    ? "text-green-default"
                    : "text-red-default",
                  size >= 240
                    ? "-right-12 bottom-3 text-base"
                    : "-right-10 bottom-2 text-xs",
                )}
              >
                {scoreDifference >= 0 && "+"}
                {scoreDifference || ""}{" "}
                <span
                  className={clsx(
                    "font-medium text-white-default opacity-50",
                    size >= 240 ? "text-[10px]" : "text-[8px]",
                  )}
                >
                  7d
                </span>
              </span>
            ) : null}
          </div>
          {!mini && (
            <div
              className={clsx(
                "font-medium text-white-default/50",
                size >= 240 ? "text-xl" : size >= 180 ? "text-lg" : "text-base",
              )}
            >
              {clampedScore <= 29
                ? "At Risk"
                : clampedScore <= 49
                  ? "Low"
                  : clampedScore === 50
                    ? "Normal"
                    : clampedScore <= 69
                      ? "Can Improve"
                      : clampedScore <= 89
                        ? "Doing Well"
                        : clampedScore <= 100
                          ? "Thriving"
                          : "Normal"}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WellBeingScore
