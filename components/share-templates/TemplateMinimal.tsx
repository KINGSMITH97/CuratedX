"use client";

import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";

interface TemplateProps {
  content: string;
  authorName: string;
  handle: string;
  category: string;
  url: string;
  theme: string;
  showQR: boolean;
}

const themes: Record<string, { bg: string; text: string; accent: string; muted: string }> = {
  dark: { bg: "#0a0a0a", text: "#fafafa", accent: "#fbbf24", muted: "#71717a" },
  light: { bg: "#fafafa", text: "#18181b", accent: "#d97706", muted: "#71717a" },
  gold: { bg: "#451a03", text: "#fef3c7", accent: "#fbbf24", muted: "#fde68a" },
  purple: { bg: "#1e1b4b", text: "#fafafa", accent: "#a78bfa", muted: "#c4b5fd" },
  ocean: { bg: "#082f49", text: "#fafafa", accent: "#38bdf8", muted: "#7dd3fc" },
};

const TemplateMinimal = forwardRef<HTMLDivElement, TemplateProps>(
  ({ content, authorName, handle, url, theme, showQR }, ref) => {
    const colors = themes[theme] || themes.dark;
    const fontSize = content.length > 300 ? "40px" : content.length > 150 ? "52px" : "64px";

    return (
      <div
        ref={ref}
        style={{
          width: "1080px",
          height: "1080px",
          background: colors.bg,
          padding: "120px 100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontFamily: "'Space Grotesk', sans-serif",
          position: "relative",
        }}
      >
        <p style={{
          fontSize,
          color: colors.text,
          lineHeight: 1.4,
          fontWeight: 500,
          letterSpacing: "-1px",
          whiteSpace: "pre-line",
          marginBottom: "60px",
        }}>
          {content}
        </p>

        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          borderTop: `1px solid ${colors.muted}40`,
          paddingTop: "40px",
        }}>
          <div>
            <div style={{ fontSize: "32px", fontWeight: 700, color: colors.accent }}>— {authorName}</div>
            <div style={{ fontSize: "22px", color: colors.muted, marginTop: "8px" }}>@{handle}</div>
          </div>

          {showQR && (
            <div style={{ padding: "10px", background: "white", borderRadius: "8px" }}>
              <QRCodeSVG value={url} size={90} />
            </div>
          )}
        </div>

        <div style={{
          position: "absolute",
          bottom: "50px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "18px",
          color: colors.muted,
          fontWeight: 700,
          letterSpacing: "4px",
          textTransform: "uppercase",
        }}>
          curated<span style={{ color: colors.accent }}>x</span>
        </div>
      </div>
    );
  }
);

TemplateMinimal.displayName = "TemplateMinimal";
export default TemplateMinimal;