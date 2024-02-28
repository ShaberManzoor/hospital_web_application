import aboutImg from "../assets/images/about.png"
import aboutCard from "../assets/images/about-card.png"
import { Link } from "react-router-dom"

const About = () => {
  return (
    <section>
        <div className="container">
            <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
                <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
                    <img src={aboutImg} alt="" />
                    <div className="absolute z-20 bottom-4 w-[200px] lg:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
                        <img src={aboutCard} alt="" />
                    </div>
                </div>
                <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
                    <h2 className="heading">Proud to be one of the nations best</h2>
                    <p className="text_para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore et, sunt quo eos labore vero incidunt iusto ab nesciunt quidem eaque dolorum saepe? Eius quibusdam maiores minus obcaecati non tempore enim vel rerum suscipit veritatis ex illum, molestiae sunt facilis ratione mollitia hic aliquid excepturi in necessitatibus ducimus aut delectus.</p>
                    <p className="text_para mt-[30px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore et, sunt quo eos labore vero incidunt iusto ab nesciunt quidem eaque dolorum saepe? Eius quibusdam maiores minus obcaecati non tempore enim vel rerum suscipit veritatis ex illum, molestiae sunt facilis ratione mollitia hic aliquid excepturi in necessitatibus ducimus aut delectus.</p>
                    <Link to={'/'}>
                        <button className="btn">Learn More</button>
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default About