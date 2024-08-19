import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api/api";
import { editor } from "monaco-editor";
import { LANGUAGE_VERSIONS } from "../constants/constants";

type Language = keyof typeof LANGUAGE_VERSIONS;

interface OutputProps {
  editorRef: React.RefObject<editor.IStandaloneCodeEditor | null>;
  language: Language;
}

const Output: React.FC<OutputProps> = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    if (!editorRef.current) return; // Ensure editorRef.current is not null
    const sourceCode = editorRef.current.getValue();

    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      let message = "Unable to run code";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }

      console.log(error);
      toast({
        title: "An error occurred.",
        description: message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};

export default Output;
