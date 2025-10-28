import { Mail, Phone } from "lucide-react";
import CalendlyEmbed from "../CalendlyEmbed";
import Link from "next/link";

export default function Contact() {
  return (
    <section
      id="contact"
      className="w-full h-[920px] flex flex-col items-center bg-foreground-sec relative text-white"
    >
      <div className="xl:w-7xl flex flex-row items-center justify-between w-full h-full gap-[30px] py-28 z-1">
        <div className="bg-background p-[30px] flex flex-col rounded-[20px] h-full items-center ">
          <p className="font-bold text-xl text-foreground mb-4">
            Book a meeting
          </p>
          <div className="h-full w-[536px] bg-foreground-sec rounded-[20px] overflow-hidden">
            <CalendlyEmbed />
          </div>
        </div>
        <div className="flex flex-col items-end justify-between h-full">
          <div className="flex flex-col items-end ">
            <h1 className="font-bold text-[40px] w-[484px] text-end">
              Let's Build Something Amazing Together
            </h1>
            <p className="font-light text-xl mt-[50px] text-end w-[595px]">
              Schedule a free consultation to discuss your project and discover
              how we can help transform your business through technology.
            </p>
          </div>

          <div className="flex flex-col items-end w-full gap-[58px]">
            <div className="flex flex-row gap-[45px] bg-white  rounded-[20px] p-[30px] w-full items-center">
              <div className="bg-[#E5E5E5] rounded-[10px] p-2 h-min w-min">
                <Mail className="text-foreground " />
              </div>

              <div className="flex flex-col text-foreground">
                <p>Email Us</p>
                <Link href={"mailto:contact@kyronixia.com"}>
                  contact@kyronixia.com
                </Link>
              </div>
            </div>

            <div className="flex flex-row gap-[45px] bg-white  rounded-[20px] p-[30px] w-full items-center">
              <div className="bg-[#E5E5E5] rounded-[10px] p-2 h-min w-min">
                <Phone className="text-foreground " />
              </div>

              <div className="flex flex-col text-foreground">
                <p>Call Us</p>
                <Link href={"mailto:contact@kyronixia.com"}>
                  +92 300 553 1968
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
