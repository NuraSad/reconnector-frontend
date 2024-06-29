import React, { useEffect } from "react";

function StravaEmbed({ embedType, embedId, style }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://strava-embeds.com/embed.js";
    script.async = true;
    script.onload = () => {
      console.log("Strava embed script loaded");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="strava-embed-placeholder"
      data-embed-type={embedType}
      data-embed-id={embedId}
      data-style={style}
    ></div>
  );
}

export default StravaEmbed;
