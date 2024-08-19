// 'use client';
// import { useCallback, useEffect, useRef, useState } from "react";
// import Editor from '@monaco-editor/react';
// import { Box, HStack} from '@chakra-ui/react';
// import LanguageSelector from "./LanguageSelector";
// import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "../constants/constants";
// import { createClient } from "@liveblocks/client";
// import Output from "./Output";
// import{Liveblocks} from "@liveblocks/node";
// import {liveblocksClient} from "../lib/liveblocksClient"
// import {getUserEmail} from "../lib/userClient";


// import { RoomProvider } from "@liveblocks/react/suspense";
// import { LiveblocksYjsProvider } from "@liveblocks/yjs";


// import styles from "./CollaborativeEditor.module.css";

// import { editor } from "monaco-editor";





// type Language = keyof typeof LANGUAGE_VERSIONS;
// const client = createClient({
//   publicApiKey: "pk_dev_VCh7d4WcySNap5Xmb-zpjamfLzahUsquAlF5FYiQ3sS09DygPBuK1v_4ltOtXA-N-N",
// });


// export async function CollaborativeEditor({id}:{id:string}) {

  
//   const [value, setValue] = useState<string>('');
//   const [language, setLanguage] = useState<Language>('javascript')
//   const [provider, setProvider] = useState<LiveblocksYjsProvider>();
//   const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);




//   const handleOnMount = useCallback((e: editor.IStandaloneCodeEditor) => {
//     editorRef.current = e;
//     e.focus();
//   }, []);

//   const onSelect= (language: Language) =>{
//     setLanguage(language)
//     setValue(CODE_SNIPPETS[language as Language])
// };

//   return (
//     // <RoomProvider id ={id} initialPresence={{}} initialStorage={{}}>
//         <div className={styles.container}>

//         <div className={styles.editorContainer}>
//         <Box>
//           <HStack spacing={4}>
//             <Box w="50%">
//               <LanguageSelector language={language} onSelect={onSelect} />
//               <Editor
              
//                 height="75vh"
//                 theme="vs-dark"
//                 language={language}
//                 defaultValue={CODE_SNIPPETS[language]}
//                 onMount={handleOnMount}
//                 value={value}
//                 onChange={(value) => setValue(value || '')}
//               />
//             </Box>
//           <Output editorRef={editorRef} language={language}/>
//           </HStack>
//         </Box>

//         </div>
//         </div>


//     // </RoomProvider>

//   );
// }



'use client';

import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { TypedLiveblocksProvider, useRoom,RoomProvider } from "../../../liveblocks.config";
import { useCallback, useEffect, useState, useRef } from "react";
import styles from "./CollaborativeEditor.module.css";
import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { MonacoBinding } from "y-monaco";
import { Awareness } from "y-protocols/awareness";
import { Box, HStack} from '@chakra-ui/react';
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "../constants/constants";
import Output from "./Output";
import { Toolbar } from "./Toolbar";
import { Cursors } from "./Cusrors";
type Language = keyof typeof LANGUAGE_VERSIONS;
// Collaborative code editor with undo/redo, live cursors, and live avatars
export function CollaborativeEditor() {
  const room = useRoom();
  const [provider, setProvider] = useState<TypedLiveblocksProvider>();
  // const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor>();
  const [value, setValue] = useState<string>('');
  const [language, setLanguage] = useState<Language>('javascript')
  
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);






  // Set up Liveblocks Yjs provider and attach Monaco editor
  useEffect(() => {
    let yProvider: TypedLiveblocksProvider;
    let yDoc: Y.Doc;
    let binding: MonacoBinding;
    
    
    if (editorRef.current) {  // Access editorRef.current
      yDoc = new Y.Doc();
      const yText = yDoc.getText("monaco");
      yProvider = new LiveblocksYjsProvider(room, yDoc);
      setProvider(yProvider);
  
      // Attach Yjs to Monaco
      binding = new MonacoBinding(
        yText,
        editorRef.current.getModel() as editor.ITextModel, 
        new Set([editorRef.current]), 
        yProvider.awareness as unknown as Awareness
      );
    }

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
      binding?.destroy();
    };
  }, [editorRef, room]);

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
        {provider ? <Cursors yProvider={provider} /> : null}
        <div className={styles.editorHeader}>
          <div>{editorRef ? <Toolbar editorRef={editorRef} /> : null}</div>
        </div>

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