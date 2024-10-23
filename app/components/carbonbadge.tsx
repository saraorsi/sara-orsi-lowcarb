"use client";

import React, { useEffect, useState } from "react";

export default function CarbonBadge() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/website-carbon-badges@1.1.3/b.min.js";
    script.async = true;

    script.onload = () => setIsLoaded(true); // Set loaded state on script load

    // Append the script to the body
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {!isLoaded && <p>Loading carbon badge...</p>}
      <div
        id="wcb"
        className="carbonbadge wcb-d"
        style={{ display: isLoaded ? "block" : "none" }}
      />
    </div>
  );
}
