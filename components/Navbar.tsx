"use client";

import Link from "next/link";
import { UserRound } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const [hasScrolled, setHasScrolled] = useState(false);
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Solutions", href: "/#solutions" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Contact", href: "/#contact" },
    { label: "Blog", href: "/" },
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
      const width = element.offsetWidth + 80; // 40px padding on each side
      const left = element.offsetLeft - 40; // Offset by 40px to center
      setIndicatorStyle({ width, left });
    }
  };

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <nav className="flex flex-row w-full justify-between items-center xl:w-7xl mx-auto absolute z-100 top-[25px] left-0 right-0 px-4">
      <p className="text-3xl font-null">kyro.</p>
      <div
        className={`w-min fixed mx-auto left-0 right-0 flex flex-row items-center justify-center gap-[50px] bg-white px-10 rounded-full transition-all duration-300 ${
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
            className={`cursor-pointer z-10 transition-all h-full py-3 px-3 duration-300 ${
              activeIndex === index ? "font-bold text-white" : "text-black"
            }`}
            onClick={() => handleClick(index)}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex flex-row gap-2">
        <UserRound /> <p>Create Account</p>
      </div>
    </nav>
  );
}
