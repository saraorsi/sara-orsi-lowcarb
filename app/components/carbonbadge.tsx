"use client";

import React, { useEffect } from "react";

export default function CarbonBadge() {
  useEffect(() => {
    // Assuming that the `wcb` is initialized by some external script,
    // You can use this effect to trigger that script after the component mounts.
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/website-carbon-badges@^1/b.min.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return <div id="wcb" className="carbonbadge wcb-d"></div>;
}