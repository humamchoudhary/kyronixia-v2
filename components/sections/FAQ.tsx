"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQTileProp {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQTile({ question, answer, isOpen, onToggle }: FAQTileProp) {
  return (
    <div className="flex flex-col">
      <div
        className="flex flex-row justify-between hover:cursor-pointer  mb-4"
        onClick={onToggle}
      >
        <p className="font-bold text-xl">{question}</p>
        <ChevronDown
          size={24}
          className={`transition-all duration-150 ${isOpen && "rotate-180"}`}
        />
      </div>
      <p
        className={`w-full font-light ${isOpen ? "h-full " : "h-0"} overflow-hidden transition-all duration-300`}
      >
        {answer}
      </p>

      <div className="w-full h-[1px] bg-foreground-light opacity-20 mb-4 mt-2" />
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is Kyro Hub?",
      answer:
        "Kyro Hub is our all-in-one SaaS product. It's a central platform with powerful tools for marketing, SEO, and chatbots, complete with an API to integrate with your existing software and streamline your business operations.",
    },
    {
      question: "What are your Custom Services?",
      answer:
        "Our Custom Services are for unique business challenges. We work directly with you to design and build tailored web applications, mobile apps, and complex software solutions from the ground up.",
    },
    {
      question: "Do you offer pre-built websites?",
      answer:
        "Yes. For businesses needing a professional site quickly, we offer a range of prebuilt website templates, each with a fixed price for rapid and affordable deployment.",
    },
    {
      question: "Who do you typically work with?",
      answer:
        "We specialize in helping Small to Medium-sized Enterprises (SMEs). Our solutions are designed to deliver enterprise-level results that fit the goals and budgets of growing businesses.",
    },
    {
      question: "What is your project process like?",
      answer:
        "Our process is collaborative and transparent. We start with discovery calls, move to strategic planning and prototyping with your feedback, and finish with building and launching the final, production-ready solution.",
    },
    {
      question: "How does your pricing work?",
      answer:
        "It's simple: prebuilt templates have a fixed price, custom projects are quoted based on scope, and maintenance plans come with a static monthly or annual fee. We provide clear proposals with no hidden costs.",
    },
    {
      question: "Do you provide support after launch?",
      answer:
        "Absolutely. Every project includes one month of free support, testing, and maintenance. Afterward, we offer fixed-price maintenance plans to ensure your project remains secure and up-to-date.",
    },
  ];

  return (
    <section
      id="faq"
      className="w-full h-min flex flex-col items-center bg-background-sec relative"
    >
      <div className="xl:w-7xl flex flex-row items-stretch justify-between w-full gap-[30px] py-28 z-1">
        <h1 className="font-bold text-[40px]">
          Frequently Asked
          <br />
          Questions
        </h1>
        <div className="flex flex-col w-[700px] pl-16 border-l-foreground-light/50 border-l">
          {faqs.map((item, index) => {
            return (
              <FAQTile
                {...item}
                key={index}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(index)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
