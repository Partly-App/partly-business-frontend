import Marquee from "react-fast-marquee"
import Testimonial from "./Testimonial"

import TESTIMONIALS_DATA from "./data.json"

const Testimonials = () => {
  return (
    <section className="py-12">
      <div className="px-4">
        <h2 className="mx-auto mb-12 text-center font-montserratAlt text-6xl font-black xs:text-12xl">
          What people say <br />
          about{" "}
          <span
            style={{ textShadow: "0px 0px 7px #FFF7DF" }}
            className="mb-2 select-none text-yellow-light"
          >
            Partly
          </span>
        </h2>
      </div>
      <Marquee speed={100} loop={0}>
        {TESTIMONIALS_DATA.map((item) => (
          <Testimonial
            key={item.company + item.position}
            company={item.company}
            position={item.position}
            review={item.review}
          />
        ))}
      </Marquee>
    </section>
  )
}

export default Testimonials
