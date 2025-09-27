import Quotes from "@/components/shared/icons/Quotes"
import clsx from "clsx"

type TestimonialProps = {
  company: string
  position: string
  review: string
}

const Testimonial = ({ company, position, review }: TestimonialProps) => {
  return (
    <div
      className={clsx(
        "mx-4 h-full min-h-[240px] w-64 rounded-2xl bg-white-mellow p-4 xs:w-96",
        "flex flex-col justify-between",
      )}
    >
      <div>
        <Quotes
          size={42}
          className="mb-4 hidden fill-purple-default xs:block"
        />
        <Quotes
          size={24}
          className="mb-4 block fill-purple-default xs:hidden"
        />
        <p className="mb-3 text-sm leading-[1.25] text-black-default xs:text-base">
          {review}
        </p>
      </div>
      <div>
        <span className="inline-block w-full text-right font-medium text-black-default">
          {position}
        </span>
        <span className="inline-block w-full text-right font-medium text-black-default opacity-50">
          {company}
        </span>
      </div>
    </div>
  )
}

export default Testimonial
