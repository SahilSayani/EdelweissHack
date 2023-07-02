import Image from "next/image";
import { DM_Sans } from "next/font/google";
const dm = DM_Sans({ subsets: ["latin"], weight: "700" });

export default function Hero() {
  const hero_content = {
    h1: "We're OptionWISE, so you don't have to be",
    description:
      "OptionWISE makes it simple to manage your F&O with our professional Charts and expert market analysis. Join today to get access.",
    hero_image: {
      alt: "Hero Image",
      path: "../public/next.svg"
    },
    cta: "Get Started",
  };
  return (
    <>
      <section className="flex w-full bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-8 py-8 md:grid-cols-2 ">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-8">
            <h1
              className={`${dm.className} text-5xl font-bold text-dark-blue lg:text-7xl`}
            >
              {hero_content?.h1}
            </h1>
            <p className="max-w-lg text-xl text-gray-600">
              {hero_content?.description}
            </p>
            <div>
              <button className="rounded-lg bg-green-400 px-8 py-4 font-medium text-white transition hover:bg-green-600">
                {hero_content?.cta}
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:mt-10">
            <Image
              className="h-full min-h-[24rem] w-full"
              src={hero_content?.hero_image?.path}
              alt={hero_content?.hero_image?.alt}
              width={584}
              height={640}
              priority
            />
          </div>
        </div>
      </section>
      <section className="flex w-full bg-green-300 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-8 lg:flex-row">
          <Image
            alt="Trophy"
            src="/public/assets/trophy-icon.svg"
            height={48}
            width={48}
          />
          <h2
            className={`${dm.className} text-center text-xl font-bold text-dark-blue lg:text-4xl`}
          >
            Increase your returns manifold.
            <sup className="font-sans text-green-700">§</sup>
          </h2>
        </div>
      </section>
    </>
  );
}
