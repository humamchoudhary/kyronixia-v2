interface Plan {
  id: number;
  name: string;
  price: number;
  currency: string;
  period: string;
  bestFor: string;
  popular: boolean;
  features: string[];
}

const PricingCard = ({ plan }: { plan: Plan }) => {
  return (
    <div className="relative flex flex-col p-[30px]  bg-foreground-sec rounded-[20px]  w-[400px]">
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}

      <p className="font-medium text-xl text-white">{plan.name}</p>

      <div className="flex flex-row gap-2.5 items-end mt-2">
        <p className="font-bold text-[40px] leading-10 text-white">
          {plan.currency}
          {plan.price}
        </p>
        <p className="font-light text-xs">{plan.period}</p>
      </div>

      <p className="font-light text-xs mt-2">
        <strong className="font-bold">Best for:</strong> {plan.bestFor}
      </p>

      <button
        className={`border border-white rounded-full flex items-center justify-center mt-5  ${plan.popular ? "bg-white hover:bg-transparent" : "bg-transparent hover:bg-white"}  transition-all duration-150 hover:cursor-pointer group`}
      >
        <p
          className={`font-light text-xs py-3 ${plan.popular ? "text-foreground group-hover:text-white" : "text-white group-hover:text-foreground"}  transition-all duration-150 cursor-pointer`}
        >
          Get Started
        </p>
      </button>

      <div className="flex flex-row gap-4 items-center justify-center my-5">
        <div className="bg-foreground-light opacity-70 w-full h-px" />
        <p className="text-xs font-light text-gray-300 whitespace-nowrap">
          Features
        </p>
        <div className="bg-foreground-light opacity-70 w-full h-px" />
      </div>

      <div className="flex flex-col gap-3 items-start">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex flex-row gap-3 items-start">
            <div className="w-min bg-foreground-light rounded-full p-1 mt-0.5 shrink-0">
              <svg
                width={12}
                height={12}
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.66671 2L3.00004 5.66667L1.33337 4"
                  stroke="#171717"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-sm">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default function Pricing() {
  const pricingPlans = [
    {
      id: 1,
      name: "Starter",
      price: 50,
      currency: "£",
      period: "per month",
      bestFor: "New businesses and entrepreneurs getting started.",
      popular: false,
      features: [
        "2 User Seats",
        "Up to 500 Marketing Contacts",
        "3 Marketing Campaign",
        "Up to 500 Chatbot Conversations/mo",
        "Full API Access",
        "Basic Analytics & Reporting",
        "Email Support",
      ],
    },
    {
      id: 2,
      name: "Growth",
      price: 100,
      currency: "£",
      period: "per month",
      bestFor: "Growing businesses ready to automate and scale.",
      popular: true,
      features: [
        "Everything from Starter",
        "Up to 10 User Seats",
        "Up to 1,000 Marketing Contacts",
        "5 Marketing Campaign",
        "Up to 1,000 Chatbot Conversations/mo",
        "Full API Access",
        "Advanced Analytics & Reporting",
        "Priority Email & Chat Support",
      ],
    },
    {
      id: 3,
      name: "Scale",
      price: 500,
      currency: "£",
      period: "per month",
      bestFor: "Established companies needing advanced features.",
      popular: false,
      features: [
        "Everything from Growth",
        "Up To 100 User Seats",
        "Up to 5,000 Marketing Contacts",
        "10 Marketing Campaign",
        "Unlimited Chatbot Conversations",
        "Full API Access",
        "Custom Reporting Dashboards",
        "External Application Integrations",
        "Dedicated Account Manager",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="w-full min-h-screen flex flex-col items-center bg-foreground relative text-white"
    >
      <div className="xl:w-7xl flex flex-col items-center justify-center w-full h-full gap-[30px] py-28 z-1">
        <div className="flex flex-col items-center gap-3.5">
          <h1 className="text-[40px] font-bold">Pricing</h1>
          <p className="text-xl font-light text-center w-[782px]">
            Simple, transparent pricing to power your business growth
          </p>
        </div>
        <div className="flex flex-row flex-wrap gap-[38px] w-full h-full mt-[60px]">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}

          <div className="relative flex flex-col p-[30px]  bg-foreground-sec rounded-[20px]  w-full items-center">
            <p className="font-medium text-[32px] text-white">Enterprise</p>

            <p className="font-bold text-xs ">Looking for a custom solution?</p>
            <p className="w-[585px] text-center my-[30px] font-light text-xs">
              For large-scale deployments with unique requirements, including
              bespoke integrations, custom feature development, and
              service-level agreements (SLAs).
            </p>

            <button
              className={`border border-white rounded-full flex items-center justify-center px-[130px] bg-white hover:bg-transparent transition-all duration-150 hover:cursor-pointer group`}
            >
              <p
                className={`font-light text-xs py-3 text-foreground group-hover:text-white  transition-all duration-150 cursor-pointer`}
              >
                Contact Sales
              </p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
