import Link from "next/link";

export default function Footer() {
  const linkSections = {
    "Quick Links": [
      { name: "Home", href: "/" },
      { name: "Kyro Hub", href: "/kyro-hub" },
      { name: "Solutions", href: "#solutions" },
      { name: "Pricing", href: "#pricing" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "#contact" },
    ],
    Solutions: [
      { name: "Tailored Web Solutions", href: "/services/custom" },
      { name: "Bespoke Mobile App Development", href: "/services/prebuilt" },
      { name: "Cloud  Solutions", href: "/services/maintenance" },
      { name: "Custom Software Development", href: "/services/consulting" },
    ],
    Contact: [
      { name: "contact@kyronixia.com", href: "mailto:contact@kyronixia.com" },
      { name: "+92 300 553 1968", href: "tel:+923005531968" },
    ],
  };

  return (
    <footer className="bg-white py-[110px] xl:px-[84px]">
      <div className="xl:w-7xl w-2xs xl:gap-[170px] gap-24 flex xl:flex-row flex-col justify-between mx-auto">
        <div className="flex flex-col">
          <p className="text-3xl font-null">kyro.</p>
          <p className="font-thin max-sm:text-sm text-nowrap">
            The Realistic Realm Of Technology & Power
          </p>
        </div>
        <div className="flex xl:flex-row  flex-col gap-12 xl:gap-40">
          {Object.entries(linkSections).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-2">
              <p className="xl:text-lg text-sm text-nowrap">{title}</p>
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="font-thin text-foreground-light hover:text-foreground transition-colors duration-150 max-sm:text-sm text-nowrap"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
