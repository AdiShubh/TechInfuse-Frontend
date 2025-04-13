// src/components/tiptap/MenuBar.tsx
import { Editor } from "@tiptap/react";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        type="button"
        className={`btn btn-sm ${editor.isActive("bold") ? "btn-primary" : "btn-outline"}`}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        Bold
      </button>
      <button
        type="button"
        className={`btn btn-sm ${editor.isActive("italic") ? "btn-primary" : "btn-outline"}`}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        Italic
      </button>
      <button
        type="button"
        className={`btn btn-sm ${editor.isActive("code") ? "btn-primary" : "btn-outline"}`}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        Code
      </button>
      <button
        type="button"
        className={`btn btn-sm ${editor.isActive({ textAlign: "left" }) ? "btn-primary" : "btn-outline"}`}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        Left
      </button>
      <button
        type="button"
        className={`btn btn-sm ${editor.isActive({ textAlign: "center" }) ? "btn-primary" : "btn-outline"}`}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        Center
      </button>
      <button
        type="button"
        className={`btn btn-sm ${editor.isActive({ textAlign: "right" }) ? "btn-primary" : "btn-outline"}`}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        Right
      </button>
    </div>
  );
};

export default MenuBar;
