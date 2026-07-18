"use client";

import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import TemplateClassic from "./share-templates/TemplateClassic";
import TemplateMinimal from "./share-templates/TemplateMinimal";
import TemplateBold from "./share-templates/TemplateBold";
import TemplateEditorial from "./share-templates/TemplateEditorial";

const isIOS = () => {
  if (typeof window === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  authorName: string;
  handle: string;
  category: string;
  url: string;
}

const templates = [
  { id: "classic", name: "Classic", component: TemplateClassic },
  { id: "minimal", name: "Minimal", component: TemplateMinimal },
  { id: "bold", name: "Bold", component: TemplateBold },
  { id: "editorial", name: "Editorial", component: TemplateEditorial },
];

const themes = [
  { id: "dark", name: "Dark", color: "#0a0a0a", accent: "#fbbf24" },
  { id: "light", name: "Light", color: "#fafafa", accent: "#d97706" },
  { id: "gold", name: "Gold", color: "#451a03", accent: "#fbbf24" },
  { id: "purple", name: "Purple", color: "#1e1b4b", accent: "#a78bfa" },
  { id: "ocean", name: "Ocean", color: "#082f49", accent: "#38bdf8" },
];

export default function ShareModal({
  isOpen,
  onClose,
  content,
  authorName,
  handle,
  category,
  url,
}: ShareModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [selectedTheme, setSelectedTheme] = useState("dark");
  const [showQR, setShowQR] = useState(true);
  const [generating, setGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const CurrentTemplate = templates.find((t) => t.id === selectedTemplate)?.component || TemplateClassic;

  const handleDownload = async () => {
  if (!previewRef.current) return;

  setGenerating(true);
  try {
    const dataUrl = await toPng(previewRef.current, {
      quality: 1,
      pixelRatio: 2,
    });

    // Convert dataUrl to Blob
    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], `curatedx-${handle}-${Date.now()}.png`, {
      type: "image/png",
    });

    // Detect iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    // Try Web Share API first (works great on iOS)
    if (isIOS && navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "CuratedX",
          text: `"${content}" — @${handle}`,
        });
      } catch (shareError) {
        // User cancelled share - not an error
        if ((shareError as Error).name !== "AbortError") {
          console.error("Share failed:", shareError);
        }
      }
    } else {
      // Fallback: Normal download (works on Android, Desktop)
      const link = document.createElement("a");
      link.download = `curatedx-${handle}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    }
  } catch (err) {
    console.error("Failed to generate image:", err);
    alert("Failed to generate image. Please try again.");
  } finally {
    setGenerating(false);
  }
};

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto pointer-events-auto shadow-2xl">
          
          {/* Header */}
          <div className="sticky top-0 bg-zinc-950 border-b border-zinc-800 p-5 flex items-center justify-between z-10">
            <div>
              <h2 className="text-lg font-black tracking-tighter">
                Design <span className="text-amber-400">Studio</span>
              </h2>
              <p className="text-xs text-zinc-500 mt-1">Customize your share image</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Preview */}
          <div className="p-5 border-b border-zinc-800">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
              Preview
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden border border-zinc-800">
              {/* Scaled down preview */}
              <div
                style={{
                  transform: "scale(0.3)",
                  transformOrigin: "top left",
                  width: "1080px",
                  height: "1080px",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                <CurrentTemplate
                  content={content}
                  authorName={authorName}
                  handle={handle}
                  category={category}
                  url={url}
                  theme={selectedTheme}
                  showQR={showQR}
                />
              </div>
            </div>
          </div>

          {/* Template Selector */}
          <div className="p-5 border-b border-zinc-800">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
              Template
            </div>
            <div className="grid grid-cols-4 gap-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                    selectedTemplate === template.id
                      ? "border-amber-400 bg-amber-400/10 text-amber-400"
                      : "border-zinc-800 bg-zinc-900/40 text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Selector */}
          <div className="p-5 border-b border-zinc-800">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
              Theme
            </div>
            <div className="grid grid-cols-5 gap-2">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`aspect-square rounded-xl border-2 transition-all relative overflow-hidden ${
                    selectedTheme === theme.id
                      ? "border-amber-400 scale-105"
                      : "border-zinc-800 hover:border-zinc-600"
                  }`}
                  style={{ background: theme.color }}
                  title={theme.name}
                >
                  <div
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-tl-lg"
                    style={{ background: theme.accent }}
                  />
                </button>
              ))}
            </div>
            <div className="mt-2 text-xs text-zinc-500 text-center">
              {themes.find((t) => t.id === selectedTheme)?.name}
            </div>
          </div>

          {/* QR Toggle */}
          <div className="p-5 border-b border-zinc-800">
            <button
              onClick={() => setShowQR(!showQR)}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="text-left">
                <div className="text-sm font-bold text-zinc-200">QR Code</div>
                <div className="text-xs text-zinc-500 mt-0.5">Link back to original tweet</div>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors relative ${
                showQR ? "bg-amber-400" : "bg-zinc-800"
              }`}>
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                  showQR ? "translate-x-6" : "translate-x-0.5"
                }`} />
              </div>
            </button>
          </div>

          {/* Download Button */}
          <div className="p-5 sticky bottom-0 bg-zinc-950 border-t border-zinc-800">
            <button
  onClick={handleDownload}
  disabled={generating}
  className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-bold py-4 text-sm uppercase tracking-widest transition-colors"
>
  {generating ? "Generating..." : isIOS() ? "📤 Share Image" : "⬇ Download Image"}
</button>
          </div>
        </div>
      </div>

      {/* Hidden full-size template for actual download */}
      <div style={{ position: "fixed", top: "-9999px", left: "-9999px", pointerEvents: "none" }}>
        <CurrentTemplate
          ref={previewRef}
          content={content}
          authorName={authorName}
          handle={handle}
          category={category}
          url={url}
          theme={selectedTheme}
          showQR={showQR}
        />
      </div>
    </>
  );
}