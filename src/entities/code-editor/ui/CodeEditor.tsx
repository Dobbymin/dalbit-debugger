import { useEffect, useMemo, useRef } from "react";

import { DalbitYaksokApplier, LANG_ID } from "@dalbit-yaksok/monaco-language-provider";
import MonacoEditor, { type BeforeMount, type OnMount } from "@monaco-editor/react";
import type { editor as MonacoEditorType } from "monaco-editor";

const DEFAULT_CODE = `나이 = 20

만약 나이 >= 18 이면
    "성인입니다" 보여주기
아니면
    "미성년자입니다" 보여주기
`;

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  currentLine?: number | null;
  readOnly?: boolean;
};

export const CodeEditor = ({ value = DEFAULT_CODE, onChange, currentLine = null, readOnly = false }: Props) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const applier = useMemo(() => new DalbitYaksokApplier(value), []);
  const editorRef = useRef<MonacoEditorType.IStandaloneCodeEditor | null>(null);
  const decorationsRef = useRef<MonacoEditorType.IEditorDecorationsCollection | null>(null);

  const handleBeforeMount: BeforeMount = (monaco) => {
    void applier.register(monaco.languages);
  };

  const handleMount: OnMount = (editor) => {
    editorRef.current = editor;
    decorationsRef.current = editor.createDecorationsCollection([]);
    applier.configEditor(editor);
  };

  useEffect(() => {
    const editor = editorRef.current;
    const collection = decorationsRef.current;
    if (!editor || !collection) return;

    if (currentLine == null) {
      collection.set([]);
      return;
    }

    collection.set([
      {
        range: {
          startLineNumber: currentLine,
          startColumn: 1,
          endLineNumber: currentLine,
          endColumn: Number.MAX_SAFE_INTEGER,
        },
        options: {
          isWholeLine: true,
          className: "active-line-highlight",
          glyphMarginClassName: "active-line-glyph",
        },
      },
    ]);

    editor.revealLineInCenter(currentLine);
  }, [currentLine]);

  return (
    <>
      <style>{`
        .active-line-highlight {
          background-color: rgba(99, 102, 241, 0.15) !important;
          border-left: 2px solid rgb(99, 102, 241);
        }
      `}</style>
      <MonacoEditor
        language={LANG_ID}
        value={value}
        onChange={(val) => {
          if (val !== undefined) {
            onChange?.(val);
          }
        }}
        beforeMount={handleBeforeMount}
        onMount={handleMount}
        options={{
          fontSize: 14,
          fontFamily: "monospace",
          lineHeight: 1.6,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          readOnly,
          wordWrap: "on",
          automaticLayout: true,
          padding: { top: 12, bottom: 12 },
          renderLineHighlight: "none",
        }}
      />
    </>
  );
};
