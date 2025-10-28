"use client";

import { useEffect } from "react";

export default function CalendlyEmbed() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="calendly-inline-widget bg-foreground-sec"
      data-url="https://calendly.com/kyronixia1/30min?hide_event_type_details=1&hide_gdpr_banner=1"
      style={{
        minWidth: "100%",
        height: "600px",
        maxWidth: "100%",
        overflow: "hidden",
      }}
    />
  );
}
