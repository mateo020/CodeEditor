import axios from "axios";
import { LANGUAGE_VERSIONS } from "../constants/constants"

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

type Language = keyof typeof LANGUAGE_VERSIONS;
export const executeCode = async (language: Language , sourceCode: any) => {
  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};