"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExt from "@tiptap/extension-link";
import ImageExt from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useCallback } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  height?: number;
  placeholder?: string;
}

/* ─── Toolbar button ─────────────────────────────── */
function Btn({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      title={title}
      style={{
        padding: "4px 8px",
        minWidth: 28,
        height: 28,
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 1,
        cursor: "pointer",
        border: "none",
        borderRadius: 3,
        background: active ? "rgba(201,168,76,0.2)" : "transparent",
        color: active ? "#C9A84C" : "#9B9B9B",
        transition: "background 0.15s, color 0.15s",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.background =
            "rgba(255,255,255,0.08)";
          (e.currentTarget as HTMLElement).style.color = "#FFFAEC";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.background = "transparent";
          (e.currentTarget as HTMLElement).style.color = "#9B9B9B";
        }
      }}
    >
      {children}
    </button>
  );
}

function Divider() {
  return (
    <span
      style={{
        width: 1,
        height: 20,
        background: "rgba(255,255,255,0.08)",
        margin: "0 4px",
        display: "inline-block",
        alignSelf: "center",
      }}
    />
  );
}

export default function RichTextEditor({
  value,
  onChange,
  height = 320,
  placeholder = "Start writing...",
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      LinkExt.configure({ openOnClick: false }),
      ImageExt,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        style: `min-height:${height}px; outline:none; padding: 16px; box-sizing: border-box;`,
      },
    },
  });

  /* Sync external value changes (e.g. when form loads data from DB) */
  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  const insertLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL:", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  const insertImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <>
      <style>{`
        .rte-wrap .tiptap { color: #FFFAEC; font-family: 'DM Sans', sans-serif; font-size: 14px; line-height: 1.75; }
        .rte-wrap .tiptap h1 { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 300; margin: 0.75em 0 0.4em; color: #FFFAEC; }
        .rte-wrap .tiptap h2 { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 300; margin: 0.75em 0 0.4em; color: #FFFAEC; }
        .rte-wrap .tiptap h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; font-weight: 400; margin: 0.6em 0 0.3em; color: #FFFAEC; }
        .rte-wrap .tiptap p { margin: 0 0 0.75em; }
        .rte-wrap .tiptap p:last-child { margin-bottom: 0; }
        .rte-wrap .tiptap strong { color: #FFFAEC; }
        .rte-wrap .tiptap em { color: rgba(255,250,236,0.8); }
        .rte-wrap .tiptap u { text-decoration-color: rgba(201,168,76,0.6); }
        .rte-wrap .tiptap a { color: #C9A84C; text-decoration: underline; }
        .rte-wrap .tiptap ul, .rte-wrap .tiptap ol { padding-left: 1.4em; margin: 0 0 0.75em; }
        .rte-wrap .tiptap li { margin: 0.2em 0; }
        .rte-wrap .tiptap blockquote { border-left: 3px solid rgba(201,168,76,0.4); margin: 0.75em 0; padding: 0.5em 0 0.5em 1em; color: rgba(255,250,236,0.6); font-style: italic; }
        .rte-wrap .tiptap img { max-width: 100%; height: auto; border-radius: 4px; margin: 8px 0; }
        .rte-wrap .tiptap p.is-editor-empty:first-child::before { content: attr(data-placeholder); color: rgba(255,255,255,0.25); float: left; height: 0; pointer-events: none; }
        .rte-wrap .tiptap *::selection { background: rgba(201,168,76,0.25); }
      `}</style>

      <div
        className="rte-wrap"
        style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4 }}
      >
        {/* ── Toolbar ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 2,
            padding: "6px 8px",
            background: "#1A1A1F",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "4px 4px 0 0",
          }}
        >
          {/* Headings */}
          <Btn
            onClick={() => editor.chain().focus().setParagraph().run()}
            active={editor.isActive("paragraph")}
            title="Paragraph"
          >
            ¶
          </Btn>
          <Btn
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            active={editor.isActive("heading", { level: 1 })}
            title="Heading 1"
          >
            H1
          </Btn>
          <Btn
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            H2
          </Btn>
          <Btn
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            active={editor.isActive("heading", { level: 3 })}
            title="Heading 3"
          >
            H3
          </Btn>

          <Divider />

          {/* Inline formatting */}
          <Btn
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="Bold"
          >
            <strong>B</strong>
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="Italic"
          >
            <em style={{ fontStyle: "italic" }}>I</em>
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
            title="Underline"
          >
            <u>U</u>
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
            title="Strikethrough"
          >
            <s>S</s>
          </Btn>

          <Divider />

          {/* Lists */}
          <Btn
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            title="Bullet List"
          >
            ≡
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            title="Numbered List"
          >
            1≡
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            title="Blockquote"
          >
            ❝
          </Btn>

          <Divider />

          {/* Alignment */}
          <Btn
            onClick={() =>
              editor.chain().focus().setTextAlign("left").run()
            }
            active={editor.isActive({ textAlign: "left" })}
            title="Align Left"
          >
            ⬅
          </Btn>
          <Btn
            onClick={() =>
              editor.chain().focus().setTextAlign("center").run()
            }
            active={editor.isActive({ textAlign: "center" })}
            title="Align Center"
          >
            ↔
          </Btn>
          <Btn
            onClick={() =>
              editor.chain().focus().setTextAlign("right").run()
            }
            active={editor.isActive({ textAlign: "right" })}
            title="Align Right"
          >
            ➡
          </Btn>

          <Divider />

          {/* Link & Image */}
          <Btn
            onClick={insertLink}
            active={editor.isActive("link")}
            title="Insert / Edit Link"
          >
            🔗
          </Btn>
          <Btn onClick={insertImage} title="Insert Image by URL">
            🖼
          </Btn>

          <Divider />

          {/* Undo / Redo */}
          <Btn
            onClick={() => editor.chain().focus().undo().run()}
            title="Undo"
          >
            ↩
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().redo().run()}
            title="Redo"
          >
            ↪
          </Btn>
        </div>

        {/* ── Editor content area ── */}
        <div
          style={{
            background: "#111114",
            borderRadius: "0 0 4px 4px",
            cursor: "text",
          }}
          onClick={() => editor.commands.focus()}
        >
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  );
}
