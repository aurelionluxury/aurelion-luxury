interface FieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

export function Field({ label, required, hint, children }: FieldProps) {
  return (
    <div>
      <label className="block text-[11px] tracking-widest uppercase text-[#6B6B6B] mb-1.5">
        {label} {required && <span className="text-[#C9A84C]">*</span>}
      </label>
      {children}
      {hint && <p className="text-[10px] text-[#6B6B6B] mt-1">{hint}</p>}
    </div>
  );
}

const inputClass =
  "w-full bg-[#1A1A1A] border border-[#C9A84C]/15 text-[#FFFAEC] text-sm px-3 py-2.5 outline-none focus:border-[#C9A84C]/50 transition-colors placeholder:text-[#6B6B6B]";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      rows={props.rows ?? 4}
      className={`${inputClass} resize-y ${props.className ?? ""}`}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`${inputClass} ${props.className ?? ""}`}
    />
  );
}

export function Checkbox({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" {...props} className="accent-[#C9A84C] w-4 h-4" />
      <span className="text-sm text-[#A8A8A8]">{label}</span>
    </label>
  );
}
