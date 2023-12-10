import { CopyBlock, dracula } from "react-code-blocks"

export default function copyBlock({ code, language, showLineNumbers }) {
  return (
    <CopyBlock
      text={code}
      language={language}
      showLineNumbers={showLineNumbers}
      theme={dracula}
      codeBlock
    />
  );
}