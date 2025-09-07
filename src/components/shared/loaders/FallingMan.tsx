import clsx from "clsx"
import Image from "next/image"

type FallingManProps = {
  size: number
  withAppear?: boolean
  delay?: number
}

const FallingMan = ({ size, withAppear, delay }: FallingManProps) => {
  return (
    <div
      className={clsx(
        "pointer-events-none relative flex aspect-square w-48 flex-col items-center justify-center",
        withAppear && "animate-appear opacity-0 [animation-delay:1s]",
      )}
    >
      <Image
        width={size}
        height={size}
        src="/images/fall-3.webp"
        alt=""
        className={clsx(
          "absolute top-0 animate-bounceSlow select-none object-contain",
          delay && `[animation-delay:${delay}s]`,
        )}
      />
      <Image
        width={size}
        height={size}
        src="/images/fall-2.webp"
        alt=""
        className={clsx(
          "absolute animate-bounceSlow select-none object-contain",
          delay && `[animation-delay:${delay + 0.2}s]`,
          size >= 164 ? "top-[-32px]" : "-top-5",
        )}
      />
      <Image
        width={size}
        height={size}
        src="/images/fall-1.webp"
        alt=""
        className={clsx(
          "absolute animate-bounceSlow select-none object-contain",
          delay && `[animation-delay:${delay + 0.4}s]`,
          size >= 164 ? "top-[-64px]" : "-top-10",
        )}
      />
    </div>
  )
}

export default FallingMan
