"use client";
import Link from "next/link";
import {
  Briefcase,
  CircleDollarSign,
  Home,
  Newspaper,
  Phone,
  UserRound,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const [hasScrolled, setHasScrolled] = useState(false);
  const navItems = [
    { label: "Home", href: "/", icon: <Home size={20} /> },
    { label: "Solutions", href: "/#solutions", icon: <Briefcase size={20} /> },
    {
      label: "Pricing",
      href: "/#pricing",
      icon: <CircleDollarSign size={20} />,
    },
    { label: "Contact", href: "/#contact", icon: <Phone size={20} /> },
    { label: "Blog", href: "/articles", icon: <Newspaper size={20} /> },
  ];
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    updateIndicator(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateIndicator = (index: number) => {
    const element = itemRefs.current[index];
    if (element) {
      // Use smaller padding on mobile
      const padding = window.innerWidth < 768 ? 16 : 40; // md breakpoint = 768px
      const width = element.offsetWidth + padding * 2;
      const left = element.offsetLeft - padding;
      setIndicatorStyle({ width, left });
    }
  };

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <nav className="flex flex-row  justify-between items-center xl:w-7xl w-xs mx-auto absolute z-100 top-[25px] left-0 right-0 ">
      <Link href={"/"} className="text-3xl font-null">
        kyro.
      </Link>
      <div
        className={`w-min fixed mx-auto left-0 right-0 flex xl:flex-row flex-col items-center justify-center gap-6 xl:gap-[50px] bg-white xl:px-10 px-4 rounded-full transition-all duration-300 ${
          hasScrolled ? "shadow-lg" : ""
        }`}
      >
        <div
          className="bg-foreground z-0 absolute h-full rounded-full transition-all duration-300"
          style={{
            width: `${indicatorStyle.width}px`,
            left: `${indicatorStyle.left}px`,
          }}
        ></div>
        {navItems.map((item, index) => (
          <Link
            key={item.label}
            href={item.href}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={`cursor-pointer z-10 transition-all h-full py-3 xl:px-3 duration-300 flex items-center justify-center ${
              activeIndex === index ? "font-bold text-white" : "text-black"
            }`}
            onClick={() => handleClick(index)}
          >
            {/* Show icon on small screens, label on medium+ screens */}
            <span className="block md:hidden">{item.icon}</span>
            <span className="hidden md:block">{item.label}</span>
          </Link>
        ))}
      </div>
      <div className="flex flex-row gap-2">
        <UserRound /> <p>Create Account</p>
      </div>
    </nav>
  );
}
