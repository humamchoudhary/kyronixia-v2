import {
  Bot,
  BotMessageSquare,
  Palette,
  Zap,
  Globe,
  BarChart,
  Mail,
  FileText,
  ShoppingCart,
  Mic,
  MegaphoneIcon,
  Search,
  ChartSpline,
  Waypoints,
  Workflow,
} from "lucide-react";

const hubItems = [
  {
    icon: BotMessageSquare,
    title: "Create ChatBots In One Click",
    description:
      "Build and manage intelligent chatbots in minutes with prebuilt templates.",
  },
  {
    icon: MegaphoneIcon,
    title: "Marketing Automation ",
    description:
      "Plan, execute, and measure multichannel campaigns that drive results.",
  },
  {
    icon: Search,
    title: "SEO Assistant",
    description:
      "Optimize content and monitor ranking performance with automatic auditing.",
  },
  {
    icon: ChartSpline,
    title: "Analytics Hub",
    description:
      "See the full picture with insights pulled from every connected app.",
  },
  {
    icon: Waypoints,
    title: "Integrations",
    description:
      "Connect your apps effortlessly with Github, Slack, HubSpot and dozens of other tools.",
  },
  {
    icon: Workflow,
    title: "Workflow Engine",
    description:
      "Simplify your operations by automating business processes effortlessly.",
  },
];

export default function Hub() {
  return (
    <section
      id="kyro-hub"
      className="w-full min-h-screen flex flex-col items-center bg-linear-240 to-foreground-sec from-foreground relative text-white"
    >
      <div className="xl:w-7xl flex flex-col items-center justify-center w-full h-full gap-[30px] py-28 z-1">
        <div className="flex flex-col items-center gap-3.5">
          <h2 className="text-2xl font-light">The Kyro Hub</h2>
          <h2 className="text-[40px] font-bold">
            All Your Business Solutions in One Place
          </h2>
          <p className="text-xl font-light text-center w-[782px]">
            Stop juggling between multiple platforms. Design, automate, and
            manage every part of your digital workflow from a single, powerful
            interface.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-10 w-full h-full mt-[136px]">
          {hubItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-foreground-sec w-full h-[242px] rounded-[20px] flex flex-col p-[30px] justify-between"
              >
                <IconComponent size={34} />
                <div className="flex flex-col">
                  <p className="font-medium text-[15px]">{item.title}</p>
                  <p className="font-thin text-[12px]">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
