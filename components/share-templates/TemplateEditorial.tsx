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

const TemplateEditorial = forwardRef<HTMLDivElement, TemplateProps>(
  ({ content, authorName, handle, category, url, theme, showQR }, ref) => {
    const colors = themes[theme] || themes.dark;
    const fontSize = content.length > 300 ? "38px" : content.length > 150 ? "48px" : "58px";

    return (
      <div
        ref={ref}
        style={{
          width: "1080px",
          height: "1080px",
          background: colors.bg,
          padding: "80px",
          fontFamily: "'Space Grotesk', sans-serif",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top: Big number + category */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px" }}>
          <div style={{
            fontSize: "180px",
            fontWeight: 900,
            color: colors.accent,
            lineHeight: 0.8,
            letterSpacing: "-8px",
          }}>
            01
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "20px", color: colors.muted, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>
              Category
            </div>
            <div style={{ fontSize: "32px", color: colors.text, fontWeight: 700 }}>
              {category}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "2px", background: colors.text, opacity: 0.2, marginBottom: "60px" }} />

        {/* Content */}
        <div style={{ flex: 1 }}>
          <p style={{
            fontSize,
            color: colors.text,
            lineHeight: 1.35,
            fontWeight: 500,
            letterSpacing: "-0.5px",
            whiteSpace: "pre-line",
          }}>
            {content}
          </p>
        </div>

        {/* Footer */}
        <div style={{ marginTop: "60px" }}>
          <div style={{ height: "2px", background: colors.text, opacity: 0.2, marginBottom: "30px" }} />
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "16px", color: colors.muted, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>
                Author
              </div>
              <div style={{ fontSize: "28px", fontWeight: 700, color: colors.text }}>
                {authorName} <span style={{ color: colors.muted, fontWeight: 400 }}>@{handle}</span>
              </div>
            </div>

            {showQR ? (
              <div style={{ padding: "10px", background: "white", borderRadius: "8px" }}>
                <QRCodeSVG value={url} size={90} />
              </div>
            ) : (
              <div style={{ fontSize: "24px", fontWeight: 900, fontStyle: "italic", color: colors.accent }}>
                CURATED<span style={{ color: colors.text, fontStyle: "normal" }}>X</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

TemplateEditorial.displayName = "TemplateEditorial";
export default TemplateEditorial;