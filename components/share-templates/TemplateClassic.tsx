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
  dark: { bg: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)", text: "#fafafa", accent: "#fbbf24", muted: "#71717a" },
  light: { bg: "linear-gradient(135deg, #fafafa 0%, #e4e4e7 100%)", text: "#18181b", accent: "#d97706", muted: "#71717a" },
  gold: { bg: "linear-gradient(135deg, #78350f 0%, #451a03 100%)", text: "#fef3c7", accent: "#fbbf24", muted: "#fde68a" },
  purple: { bg: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", text: "#fafafa", accent: "#a78bfa", muted: "#c4b5fd" },
  ocean: { bg: "linear-gradient(135deg, #0c4a6e 0%, #082f49 100%)", text: "#fafafa", accent: "#38bdf8", muted: "#7dd3fc" },
};

const TemplateClassic = forwardRef<HTMLDivElement, TemplateProps>(
  ({ content, authorName, handle, category, url, theme, showQR }, ref) => {
    const colors = themes[theme] || themes.dark;
    const fontSize = content.length > 300 ? "36px" : content.length > 150 ? "48px" : "56px";

    return (
      <div
        ref={ref}
        style={{
          width: "1080px",
          height: "1080px",
          background: colors.bg,
          padding: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "'Space Grotesk', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: "36px", fontWeight: 900, fontStyle: "italic", color: colors.text, letterSpacing: "-1px" }}>
            CURATED<span style={{ color: colors.accent, fontStyle: "normal", fontSize: "44px" }}>X</span>
          </div>
          <div style={{
            padding: "12px 24px",
            borderRadius: "9999px",
            background: `${colors.accent}25`,
            border: `2px solid ${colors.accent}50`,
            color: colors.accent,
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}>
            {category}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 0" }}>
          <div style={{ fontSize: "140px", color: colors.accent, lineHeight: 1, fontWeight: 900, marginBottom: "-20px" }}>
            &ldquo;
          </div>
          <p style={{
            fontSize,
            color: colors.text,
            lineHeight: 1.3,
            fontWeight: 600,
            letterSpacing: "-0.5px",
            whiteSpace: "pre-line",
          }}>
            {content}
          </p>
        </div>

        {/* Footer */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "30px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: `${colors.accent}30`,
                border: `3px solid ${colors.accent}50`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.accent,
                fontSize: "32px",
                fontWeight: 900,
              }}>
                {authorName[0]}
              </div>
              <div>
                <div style={{ fontSize: "28px", fontWeight: 700, color: colors.text }}>{authorName}</div>
                <div style={{ fontSize: "22px", color: colors.muted, marginTop: "4px" }}>@{handle}</div>
              </div>
            </div>

            {showQR && (
              <div style={{ padding: "12px", background: "white", borderRadius: "12px" }}>
                <QRCodeSVG value={url} size={100} />
              </div>
            )}
          </div>

          <div style={{ height: "2px", background: `linear-gradient(90deg, ${colors.accent} 0%, transparent 100%)`, marginBottom: "20px" }} />

          <div style={{ fontSize: "20px", color: colors.muted, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", textAlign: "center" }}>
            Curated Goldmine Tweets
          </div>
        </div>
      </div>
    );
  }
);

TemplateClassic.displayName = "TemplateClassic";
export default TemplateClassic;