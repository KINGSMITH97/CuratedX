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

const TemplateBold = forwardRef<HTMLDivElement, TemplateProps>(
  ({ content, authorName, handle, category, url, theme, showQR }, ref) => {
    const colors = themes[theme] || themes.dark;
    const fontSize = content.length > 300 ? "42px" : content.length > 150 ? "54px" : "68px";

    return (
      <div
        ref={ref}
        style={{
          width: "1080px",
          height: "1080px",
          background: colors.bg,
          fontFamily: "'Space Grotesk', sans-serif",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Left accent bar */}
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "20px",
          height: "100%",
          background: colors.accent,
        }} />

        {/* Category tag on top */}
        <div style={{
          padding: "40px 80px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div style={{
            fontSize: "24px",
            fontWeight: 900,
            color: colors.accent,
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}>
            {category}
          </div>
          <div style={{ fontSize: "30px", fontWeight: 900, fontStyle: "italic", color: colors.text }}>
            CURATED<span style={{ color: colors.accent, fontStyle: "normal" }}>X</span>
          </div>
        </div>

        {/* Main content */}
        <div style={{
          flex: 1,
          padding: "60px 80px",
          display: "flex",
          alignItems: "center",
        }}>
          <p style={{
            fontSize,
            color: colors.text,
            lineHeight: 1.2,
            fontWeight: 900,
            letterSpacing: "-2px",
            whiteSpace: "pre-line",
          }}>
            {content}
          </p>
        </div>

        {/* Footer */}
        <div style={{
          padding: "40px 80px 60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: `2px solid ${colors.accent}30`,
        }}>
          <div>
            <div style={{ fontSize: "36px", fontWeight: 900, color: colors.text, letterSpacing: "-1px" }}>
              {authorName}
            </div>
            <div style={{ fontSize: "22px", color: colors.muted, marginTop: "4px" }}>@{handle}</div>
          </div>

          {showQR && (
            <div style={{ padding: "12px", background: "white", borderRadius: "12px" }}>
              <QRCodeSVG value={url} size={100} />
            </div>
          )}
        </div>
      </div>
    );
  }
);

TemplateBold.displayName = "TemplateBold";
export default TemplateBold;