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
  const [windowWidth, setWindowWidth] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0,
    top: 0,
  });
  const [hasScrolled, setHasScrolled] = useState(false);
  const navItems = [
    { label: "Home", href: "/", icon: <Home size={16} /> },
    { label: "Solutions", href: "/#solutions", icon: <Briefcase size={16} /> },
    {
      label: "Pricing",
      href: "/#pricing",
      icon: <CircleDollarSign size={16} />,
    },
    { label: "Contact", href: "/#contact", icon: <Phone size={16} /> },
    { label: "Blog", href: "/articles", icon: <Newspaper size={16} /> },
  ];
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      updateIndicator(activeIndex);
      window.addEventListener("resize", () => updateIndicator(activeIndex));
    }
    return () =>
      window.removeEventListener("resize", () => updateIndicator(activeIndex));
  }, [activeIndex]);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);

    setWindowWidth(window.innerWidth);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateIndicator = (index: number) => {
    const element = itemRefs.current[index];
    if (element) {
      if (window.innerWidth < 768) {
        // Mobile: vertical indicator
        const height = element.offsetHeight;
        const top = element.offsetTop;
        setIndicatorStyle({ width: 4, left: 0, top });
      } else {
        // Desktop: horizontal indicator
        const padding = 40;
        const width = element.offsetWidth + padding * 2;
        const left = element.offsetLeft - padding;
        setIndicatorStyle({ width, left, top: 0 });
      }
    }
  };

  const handleClick = (index: number) => setActiveIndex(index);

  return (
    <nav className="flex flex-row justify-between items-center xl:w-7xl w-xs mx-auto absolute z-100 top-[25px] left-0 right-0">
      <Link href={"/"} className="text-3xl font-null">
        kyro.
      </Link>

      {/* Navbar */}
      <div
        className={`fixed bg-white xl:rounded-full rounded-r-xl shadow-lg transition-all duration-300 overflow-hidden
        xl:flex xl:flex-row xl:left-0 xl:right-0  xl:mx-auto xl:gap-[50px] xl:px-10 
        flex flex-col left-0 max-sm:top-1/2 transform max-sm:-translate-y-1/2 gap-2 px-3 xl:w-min`}
      >
        {/* Indicator */}
        <div
          className={`bg-foreground absolute xl:rounded-full rounded-r-xl  transition-all duration-300`}
          style={{
            width: `${indicatorStyle.width}px`,
            left: `${indicatorStyle.left}px`,
            top: `${indicatorStyle.top}px`,
            height: windowWidth < 768 ? "40px" : "100%",
          }}
        ></div>

        {/* Links */}
        {navItems.map((item, index) => (
          <Link
            key={item.label}
            href={item.href}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={`cursor-pointer z-10 flex items-center justify-center py-3 xl:px-3 transition-all duration-300 ${
              activeIndex === index ? "font-bold xl:text-white" : "text-black"
            }`}
            onClick={() => handleClick(index)}
          >
            <span className="block md:hidden">{item.icon}</span>
            <span className="hidden md:block">{item.label}</span>
          </Link>
        ))}
      </div>

      {/* <div className="flex flex-row gap-2">
        <UserRound /> <p className="hidden md:block">Create Account</p>
      </div>*/}
    </nav>
  );
}
