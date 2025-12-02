"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const solutionTile = [
  {
    image: "/images/web.png",
    title: "Tailored Web Solutions",
    description:
      "Elevate your online presence. We design high-performance websites to engage audiences and drive conversions.",
  },
  {
    image: "/images/mobile_dev.png",
    title: "Bespoke Mobile App Development",
    description:
      "Connect with customers everywhere. We craft intuitive and powerful mobile applications, delivering seamless experiences.",
  },
  {
    image: "/images/cloud_sol.png",
    title: "Cloud Solutions",
    description:
      "Future-proof your operations. Our scalable and secure cloud solutions, ensure your digital assets are available, secure, and optimized.",
  },
  {
    image: "/images/custom_tech.png",
    title: "Custom Technology Solutions",
    description:
      "Your business is unique. We build tailored software to solve your specific challenges and streamline complex operations.",
  },
];

export default function GetQuoteClient() {
  const searchParams = useSearchParams();
  const [solution, setSolution] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    details: "",
  });

  useEffect(() => {
    const solutionParam = searchParams.get("solution");
    if (solutionParam) {
      setSolution(solutionParam);
    }
  }, [searchParams]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async () => {
    // Validation
    if (!formData.name || !formData.email || !solution || !formData.details) {
      setSubmitStatus({
        type: "error",
        message: "Please fill in all required fields",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          solution,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form");
      }

      // Success
      setSubmitStatus({
        type: "success",
        message:
          "Quote request sent successfully! We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        details: "",
      });
      setSolution("");
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to submit form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative z-10 flex flex-col items-center px-4 py-20 mt-44">
      {/* Header Section */}
      <div className="text-center mb-20 max-w-4xl">
        <div className="inline-block mb-6 animate-fade-in">
          <span className="px-5 py-2 bg-primary text-background rounded-full text-sm font-semibold tracking-wide">
            REQUEST A QUOTE
          </span>
        </div>
        <h1 className="text-6xl md:text-7xl font-bold text-primary mb-6 leading-tight tracking-tight">
          Let's Build
          <span className="block text-foreground-sec mt-2">
            Something Great
          </span>
        </h1>
        <p className="text-xl text-foreground-light max-w-2xl mx-auto leading-relaxed">
          Share your vision with us and we'll create a tailored solution that
          brings your ideas to life.
        </p>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl border border-background-sec p-8 md:p-12 transition-all duration-300 hover:shadow-3xl">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Field */}
              <div className="group">
                <label
                  className="block text-foreground-sec font-bold mb-3 tracking-wide uppercase text-xs"
                  htmlFor="name"
                >
                  Full Name *
                </label>
                <input
                  className="w-full py-4 px-5 bg-background border-2 border-background-sec rounded-lg text-foreground placeholder-foreground-light focus:outline-none focus:border-primary focus:bg-white transition-all duration-300"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="group">
                <label
                  className="block text-foreground-sec font-bold mb-3 tracking-wide uppercase text-xs"
                  htmlFor="email"
                >
                  Email Address *
                </label>
                <input
                  className="w-full py-4 px-5 bg-background border-2 border-background-sec rounded-lg text-foreground placeholder-foreground-light focus:outline-none focus:border-primary focus:bg-white transition-all duration-300"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Company Field */}
              <div className="group">
                <label
                  className="block text-foreground-sec font-bold mb-3 tracking-wide uppercase text-xs"
                  htmlFor="company"
                >
                  Company Name
                </label>
                <input
                  className="w-full py-4 px-5 bg-background border-2 border-background-sec rounded-lg text-foreground placeholder-foreground-light focus:outline-none focus:border-primary focus:bg-white transition-all duration-300"
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Acme Inc."
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>

              {/* Solution Selector */}
              <div className="group">
                <label
                  className="block text-foreground-sec font-bold mb-3 tracking-wide uppercase text-xs"
                  htmlFor="solution"
                >
                  Select Solution *
                </label>
                <div className="relative">
                  <select
                    className="w-full py-4 px-5 bg-background border-2 border-background-sec rounded-lg text-foreground appearance-none focus:outline-none focus:border-primary focus:bg-white transition-all duration-300 cursor-pointer"
                    id="solution"
                    name="solution"
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Choose your solution
                    </option>
                    {solutionTile.map((s) => (
                      <option key={s.title} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-foreground">
                    <svg
                      className="fill-current h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {solution && (
              <div className="p-6 bg-background-sec border-l-4 border-primary rounded-lg animate-fade-in">
                <h3 className="text-foreground-sec font-bold mb-2">
                  {solution}
                </h3>
                <p className="text-sm text-foreground-light leading-relaxed">
                  {solutionTile.find((s) => s.title === solution)?.description}
                </p>
              </div>
            )}

            {/* Project Details */}
            <div className="group">
              <label
                className="block text-foreground-sec text-sm font-bold mb-3 tracking-wide uppercase text-xs"
                htmlFor="details"
              >
                Project Details *
              </label>
              <textarea
                className="w-full py-4 px-5 bg-background border-2 border-background-sec rounded-lg text-foreground placeholder-foreground-light focus:outline-none focus:border-primary focus:bg-white transition-all duration-300 resize-none"
                id="details"
                name="details"
                placeholder="Tell us about your vision, goals, timeline, and any specific requirements..."
                rows={6}
                value={formData.details}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                className="w-full bg-primary hover:bg-foreground-sec text-background font-bold py-5 px-8 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-lg group uppercase tracking-wider text-sm"
                onClick={handleSubmit}
              >
                <span className="flex items-center justify-center gap-3">
                  <span>Request Your Quote</span>
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-foreground-light text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>We typically respond within 24 hours</span>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white rounded-xl border border-background-sec hover:shadow-lg transition-all duration-300 group">
            <div className="text-5xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
              24h
            </div>
            <div className="text-sm text-foreground-sec font-semibold mb-1 uppercase tracking-wide">
              Response Time
            </div>
            <div className="text-xs text-foreground-light">
              Fast turnaround guaranteed
            </div>
          </div>
          <div className="text-center p-8 bg-white rounded-xl border border-background-sec hover:shadow-lg transition-all duration-300 group">
            <div className="text-5xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
              500+
            </div>
            <div className="text-sm text-foreground-sec font-semibold mb-1 uppercase tracking-wide">
              Projects Delivered
            </div>
            <div className="text-xs text-foreground-light">
              Trusted by businesses worldwide
            </div>
          </div>
          <div className="text-center p-8 bg-white rounded-xl border border-background-sec hover:shadow-lg transition-all duration-300 group">
            <div className="text-5xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
              98%
            </div>
            <div className="text-sm text-foreground-sec font-semibold mb-1 uppercase tracking-wide">
              Client Satisfaction
            </div>
            <div className="text-xs text-foreground-light">
              Exceeding expectations daily
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
