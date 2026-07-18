"use client";

import { forwardRef } from "react";

interface ShareableImageProps {
  content: string;
  authorName: string;
  handle: string;
  category: string;
}

const ShareableImage = forwardRef<HTMLDivElement, ShareableImageProps>(
  ({ content, authorName, handle, category }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          width: "1080px",
          height: "1080px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
          padding: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "'Space Grotesk', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gold gradient accent */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 10 }}>
          <div style={{ 
            fontSize: "36px", 
            fontWeight: 900, 
            fontStyle: "italic", 
            color: "#fafafa",
            letterSpacing: "-1px",
          }}>
            CURATED<span style={{ color: "#fbbf24", fontStyle: "normal", fontSize: "44px" }}>X</span>
          </div>
          <div style={{
            padding: "12px 24px",
            borderRadius: "9999px",
            background: "rgba(251, 191, 36, 0.15)",
            border: "2px solid rgba(251, 191, 36, 0.3)",
            color: "#fbbf24",
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}>
            {category}
          </div>
        </div>

        {/* Main content */}
        <div style={{ position: "relative", zIndex: 10, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "40px", marginBottom: "40px" }}>
          {/* Quote mark */}
          <div style={{
            fontSize: "180px",
            color: "#fbbf24",
            lineHeight: 1,
            fontWeight: 900,
            marginBottom: "-40px",
          }}>
            &ldquo;
          </div>

          {/* Tweet content */}
          <p style={{
            fontSize: content.length > 200 ? "42px" : content.length > 100 ? "52px" : "60px",
            color: "#fafafa",
            lineHeight: 1.3,
            fontWeight: 600,
            letterSpacing: "-1px",
            whiteSpace: "pre-line",
          }}>
            {content}
          </p>
        </div>

        {/* Footer */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "40px" }}>
            {/* Avatar */}
            <div style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(251, 191, 36, 0.2)",
              border: "3px solid rgba(251, 191, 36, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fbbf24",
              fontSize: "36px",
              fontWeight: 900,
            }}>
              {authorName[0]}
            </div>

            {/* Name + handle */}
            <div>
              <div style={{ fontSize: "32px", fontWeight: 700, color: "#fafafa" }}>
                {authorName}
              </div>
              <div style={{ fontSize: "24px", color: "#71717a", marginTop: "4px" }}>
                @{handle}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "2px", background: "linear-gradient(90deg, #fbbf24 0%, transparent 100%)", marginBottom: "30px" }} />

          {/* Bottom branding */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ 
              fontSize: "22px", 
              color: "#71717a", 
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}>
              Curated Goldmine Tweets
            </div>
            <div style={{ 
              fontSize: "22px", 
              color: "#fbbf24",
              fontWeight: 700,
              letterSpacing: "2px",
            }}>
              curatedx.app
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ShareableImage.displayName = "ShareableImage";

export default ShareableImage;