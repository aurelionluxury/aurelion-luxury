"use client";

import { useState } from "react";

interface ImageUploaderProps {
  value: string;
  onChange: (urls: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const urls = value
    ? value.split(",").map((u) => u.trim()).filter(Boolean)
    : [];

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    setError("");

    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        const data = await res.json();
        newUrls.push(data.url);
      } else {
        const d = await res.json();
        setError(d.error ?? "Upload failed");
      }
    }

    const combined = [...urls, ...newUrls].join(", ");
    onChange(combined);
    setUploading(false);
    e.target.value = "";
  }

  function removeUrl(url: string) {
    const updated = urls.filter((u) => u !== url).join(", ");
    onChange(updated);
  }

  return (
    <div className="space-y-3">
      {label && (
        <p className="text-[11px] tracking-widest uppercase text-[#6B6B6B]">{label}</p>
      )}

      {/* Preview */}
      {urls.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {urls.map((url) => (
            <div key={url} className="relative group">
              <img
                src={url}
                alt=""
                className="w-20 h-20 object-cover border border-[#C9A84C]/20"
              />
              <button
                type="button"
                onClick={() => removeUrl(url)}
                className="absolute top-0 right-0 bg-red-500/80 text-white text-xs w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* URL input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Comma-separated image URLs, or upload below"
        className="w-full bg-[#1A1A1A] border border-[#C9A84C]/15 text-[#FFFAEC] text-sm px-3 py-2.5 outline-none focus:border-[#C9A84C]/50 transition-colors placeholder:text-[#6B6B6B]"
      />

      {/* Upload button */}
      <label className="inline-flex items-center gap-2 border border-[#C9A84C]/20 text-[#C9A84C] text-[10px] tracking-widest uppercase px-4 py-2 cursor-pointer hover:bg-[#C9A84C]/5 transition-colors">
        {uploading ? "Uploading…" : "↑ Upload Images"}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
        />
      </label>

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}
