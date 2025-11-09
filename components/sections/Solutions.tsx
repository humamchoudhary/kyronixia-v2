import { slugify } from "@/helpers/slugify";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SolutionTileProps {
  image: string;
  title: string;
  description: string;
}

function SolutionTile({ image, title, description }: SolutionTileProps) {
  // const slug = slugify(title);
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-full gap-6 lg:gap-0">
        {/* Left section: image + title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 lg:gap-10">
          <div className="w-full sm:w-auto flex-shrink-0">
            <Image
              src={image}
              alt={title}
              width={399}
              height={242}
              className="w-full sm:w-[300px] lg:w-[399px] h-auto rounded-lg"
            />
          </div>
          <h3 className="font-bold text-2xl sm:text-3xl lg:text-[32px] lg:w-[310px]">
            {title}
          </h3>
        </div>

        {/* Right section: description + arrow link */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 lg:gap-[50px]">
          <p className="font-light text-sm lg:text-[14px] lg:w-[306px]">
            {description}
          </p>
          <Link
            href={`/get-quote?solution=${title}`}
            className="rounded-full border-2 border-foreground-light/60 xl:p-3.5 p-1 flex items-center justify-center w-full xl:w-min h-min transition-transform duration-150 hover:-rotate-45 flex-shrink-0"
          >
            <ArrowRight className="transition-transform duration-150 xl:flex hidden " />
            <p className="block xl:hidden ">Get Qoute</p>
          </Link>
        </div>
      </div>

      {/* Divider line */}
      <div className="w-full h-px bg-foreground-light opacity-20 mt-6 lg:mt-10" />
    </div>
  );
}

const solutionTile = [
  {
    image: "/images/web.png",
    title: "Tailored Web Solutions",
    description:
      "Elevate your online presence. We design high-performance websites to engage audiences and drive conversions.",
  },

  {
    image: "/images/mobile_dev.png",
    title: "Bespoke Mobile App Development",
    description:
      "Connect with customers everywhere. We craft intuitive and powerful mobile applications, delivering seamless experiences.",
  },

  {
    image: "/images/cloud_sol.png",
    title: "Cloud Solutions",
    description:
      "Future-proof your operations. Our scalable and secure cloud solutions, ensure your digital assets are available, secure, and optimized.",
  },

  {
    image: "/images/custom_tech.png",
    title: "Custom Technology Solutions",
    description:
      "Your business is unique. We build tailored software to solve your specific challenges and streamline complex operations.",
  },
];

export default function Solutions() {
  return (
    <section
      id="solutions"
      className="w-full min-h-screen flex flex-col items-center bg-background-sec relative"
    >
      <div className="xl:w-7xl w-2xs flex flex-col items-center justify-center  h-full gap-[30px] py-28 z-1">
        <div className="w-full flex flex-row justify-between">
          <h2 className="text-[40px] font-bold">
            Providing
            <br />
            Best Solution
          </h2>
          <p className="font-light w-[410px] max-sm:hidden">
            Propel your business forward in a fast-evolving digital landscape.
            We partner with you to craft stunning websites, intuitive mobile
            apps, and robust cloud infrastructures, transforming your vision
            into results with cutting-edge technology.
          </p>
        </div>
        <div className="w-full h-px bg-foreground-light opacity-20 mb-10" />
        <div className="flex flex-col gap-10 w-full items-center">
          {solutionTile &&
            solutionTile.map((item, index) => (
              <SolutionTile key={index} {...item} />
            ))}
        </div>
      </div>
    </section>
  );
}
