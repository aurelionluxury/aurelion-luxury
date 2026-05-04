import Link from "next/link";

interface PlaceholderPageProps {
  title: string;
  subtitle?: string;
  section: string;
}

export default function PlaceholderPage({ title, subtitle, section }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* Ornament */}
        <div className="w-16 h-16 border border-[#C9A84C]/20 rotate-45 mx-auto mb-12" />

        <p className="text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4">
          {section}
        </p>
        <h1
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="text-4xl md:text-6xl font-light text-[#FFFAEC] mb-4 leading-tight"
        >
          {title}
        </h1>

        <div className="w-12 h-px bg-[#C9A84C] mx-auto my-6" />

        <p className="text-sm text-[#6B6B6B] leading-relaxed mb-10">
          {subtitle ?? "We're crafting this experience with the same care and precision we bring to everything. Check back soon."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-[#C9A84C] text-[#0A0A0A] font-medium text-xs tracking-wider uppercase px-6 py-3 hover:bg-[#D5B978] transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border border-[#C9A84C] text-[#C9A84C] text-xs tracking-wider uppercase px-6 py-3 hover:bg-[#C9A84C]/8 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
