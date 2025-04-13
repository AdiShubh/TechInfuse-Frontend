// src/components/tiptap/TiptapEditor.tsx
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { useEffect } from "react";
import MenuBar from "./Menu-bar";
import TextAlign from "@tiptap/extension-text-align";

type TiptapEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const TiptapEditor = ({ value, onChange }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3   ",
        
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="bg-base-100 p-4 rounded-md shadow editor-content    border border-base-300">
      <MenuBar editor={editor} />
      <EditorContent editor={editor}  />
    </div>
  );
};

export default TiptapEditor;
