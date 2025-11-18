import { ArrowUpRight, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="#"
      className="w-full min-h-screen flex flex-col items-center  relative bg-background"
    >
      {/* Grid pattern overlay with fade from sides */}
      <div className="absolute z-0 inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      <div className="xl:w-7xl w-2xs flex flex-col items-center justify-center  h-full gap-[30px] pb-9 mt-[340px] z-1">
        <h1 className="xl:text-8xl text-3xl font-bold text-center xl:w-[820px] w-full pb-4 bg-gradient-to-br from-foreground to-foreground-light bg-clip-text text-transparent">
          The Future of Digital Innovation
        </h1>
        <p className="xl:text-2xl text-xs  xl:w-[820px] w-full text-center">
          Transforming ideas into digital experiences that drive growth and
          power business transformation.
        </p>
        <div className="flex flex-row gap-[30px]">
          <Link
            href={"/#solutions"}
            className="bg-white rounded-full px-6 py-3 font-medium transition-all flex items-center justify-center duration-300 hover:bg-foreground cursor-pointer group"
          >
            <p className="text-foreground group-hover:text-white transition-all duration-300  cursor-pointer xl:text-lg text-xs text-nowrap">
              Explore Solutions
            </p>
          </Link>

          <div className="bg-foreground rounded-full px-6 py-3 font-medium flex flex-row items-center justify-center gap-[4px] group hover:bg-white transition-all duration-150 cursor-pointer ">
            <p className=" text-white group-hover:text-foreground  transition-all duration-150 cursor-pointer  xl:text-lg text-xs text-nowrap">
              Open App
            </p>
            <ArrowUpRight className="size-[16px] group-hover:size-20px transition-all duration-150 group-hover:text-foreground text-white cursor-pointer " />
          </div>
        </div>

        <div className="xl:flex hidden flex-row  gap-[60px] items-end justify-center h-full">
          <div className="w-[278px] h-[254px] bg-foreground rounded-3xl flex flex-col gap-[6px] p-[30px]">
            <RefreshCw color="#fff" size={24} />
            <p className="text-[32px]/[41px] text-white">
              Innovate. Build.
              <br /> Grow.
              <br /> Repeat.
            </p>
          </div>
          <div className="w-[280px] h-[156px] bg-white rounded-3xl p-[30px]">
            <p className="text-[32px]">50+</p>
            <p className="w-[134px]">Esteemed Clients and Partners</p>
          </div>
          <div className="w-[192px] h-[222px] bg-foreground-sec rounded-3xl p-[30px] flex flex-col items-center justify-center ">
            <p className="text-[32px] text-white font-medium">5+</p>
            <p className="w-[134px] text-center text-white">
              Years of Dedicated Experience
            </p>
          </div>
          <div className="w-[340px] h-[241px] bg-foreground-light rounded-3xl p-[30px] flex flex-col justify-end">
            <p className="w-[159px] text-white">Total Projects Completed</p>

            <p className="text-[32px] text-white font-medium">150+</p>
          </div>
        </div>
      </div>
    </section>
  );
}
