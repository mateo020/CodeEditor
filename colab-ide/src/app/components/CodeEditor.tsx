"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Editor from '@monaco-editor/react';
import { Box, HStack} from '@chakra-ui/react';
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "../constants/constants";
import { createClient } from "@liveblocks/client";
import Output from "./Output";


import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom } from "@liveblocks/react/suspense";

import styles from "./CollaborativeEditor.module.css";
// import { Avatars } from "./Avatars"
import { editor } from "monaco-editor";
import { MonacoBinding } from "y-monaco";
import { Awareness } from "y-protocols/awareness";
// import { Cursors } from "./Cursors";
// import { Toolbar } from "./Toolbar";
const roomId = "liveblocks-tutorial-nx5iWVYRzDivq03oL1v_m";


type Language = keyof typeof LANGUAGE_VERSIONS;
const client = createClient({
  publicApiKey: "pk_dev_VCh7d4WcySNap5Xmb-zpjamfLzahUsquAlF5FYiQ3sS09DygPBuK1v_4ltOtXA-N-N",
});

const { room, leave } = client.enterRoom("your-room-id");
// Collaborative code editor with undo/redo, live cursors, and live avatars
export function CollaborativeEditor() {
  // const room = useRoom();
  
  const [value, setValue] = useState<string>('');
  const [language, setLanguage] = useState<Language>('javascript')
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);


  // Set up Liveblocks Yjs provider and attach Monaco editor
  // useEffect(() => {
    let yProvider: LiveblocksYjsProvider;
    let yDoc: Y.Doc;
  //   let binding: MonacoBinding;

    

  //   if (editorRef) {
  //     yDoc = new Y.Doc();
  //     const yText = yDoc.getText("monaco");
  //     yProvider = new LiveblocksYjsProvider(room, yDoc);
  //     setProvider(yProvider);

  //     // Attach Yjs to Monaco
  //     binding = new MonacoBinding(
  //       yText,
  //       editorRef.getModel() as editor.ITextModel,
  //       new Set([editorRef]),
  //       yProvider.awareness as unknown as Awareness
  //     );
  //   }

  //   return () => {
  //     yDoc?.destroy();
  //     yProvider?.destroy();
  //     binding?.destroy();
  //   };
  // }, [editorRef, room]);

  const handleOnMount = useCallback((e: editor.IStandaloneCodeEditor) => {
    editorRef.current = e;
    e.focus();
  }, []);

  const onSelect= (language: Language) =>{
    setLanguage(language)
    setValue(CODE_SNIPPETS[language as Language])
};

  return (
    <div className={styles.container}>
      {/* {provider ? <Cursors yProvider={provider} /> : null} */}
      {/* <div className={styles.editorHeader}>
        <div>{editorRef ? <Toolbar editor={editorRef} /> : null}</div>
        <Avatars />
      </div> */}
      <div className={styles.editorContainer}>
      <Box>
        <HStack spacing={4}>
          <Box w="50%">
            <LanguageSelector language={language} onSelect={onSelect} />
            <Editor
            
              height="75vh"
              theme="vs-dark"
              language={language}
              defaultValue={CODE_SNIPPETS[language]}
              onMount={handleOnMount}
              value={value}
              onChange={(value) => setValue(value || '')}
            />
          </Box>
        <Output editorRef={editorRef} language={language}/>
        </HStack>
      </Box>

      </div>
    </div>
  );
}