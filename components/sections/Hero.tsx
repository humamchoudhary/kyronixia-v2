import { ArrowUpRight, RefreshCw } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="#"
      className="w-full min-h-screen flex flex-col items-center bg-background-sec relative"
    >
      {/* Grid pattern overlay with fade from sides */}
      <div className="absolute z-0 inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.05),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,119,158,0.05),transparent_50%),radial-gradient(circle_at_40%_80%,rgba(120,200,255,0.05),transparent_50%)]"></div>
      <div className="absolute z-0 inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      <div className="absolute z-0 inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.8)_70%,rgb(255,255,255)_100%)] pointer-events-none"></div>

      <div className="xl:w-7xl flex flex-col items-center justify-center w-full h-full gap-[30px] pb-[36px] mt-[340px] z-1">
        <h1 className="text-8xl font-bold text-center w-[820px] pb-4 bg-gradient-to-br from-foreground to-foreground-light bg-clip-text text-transparent">
          The Future of Digital Innovation
        </h1>
        <p className="text-2xl w-[820px] text-center">
          Transforming ideas into digital experiences that drive growth and
          power business transformation.
        </p>
        <div className="flex flex-row gap-[30px]">
          <div className="bg-white rounded-full px-6 py-3 font-medium transition-all duration-300 hover:bg-foreground cursor-pointer group">
            <p className="text-foreground group-hover:text-white transition-all duration-300  cursor-pointer">
              Explore Solutions
            </p>
          </div>

          <div className="bg-foreground rounded-full px-6 py-3 font-medium flex flex-row items-center justify-center gap-[4px] group hover:bg-white transition-all duration-150 cursor-pointer ">
            <p className=" text-white group-hover:text-foreground  transition-all duration-150 cursor-pointer ">
              Open App
            </p>
            <ArrowUpRight className="size-[16px] group-hover:size-20px transition-all duration-150 group-hover:text-foreground text-white cursor-pointer " />
          </div>
        </div>

        <div className="flex flex-row gap-[60px] items-end justify-center h-full">
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
