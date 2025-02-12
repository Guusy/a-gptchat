import { Message as MessageDomain } from "@/shared/types";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

export function Message({ role, content }: MessageDomain) {
  const isUser = role === "user";
  //TODO: revisit this logic, should we a better way to do this, and use a code highlighter
  const parsedMessage = content
    .replace(/\\n\\n/g, "\n\n")
    .replace(/\\n/g, "\n");

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} `}>
      <div
        className={`p-3 rounded-lg max-w-2xl ${
          isUser ? "bg-[#323232d9] text-white border" : "bg-transparent"
        }`}
      >
        <div className="text-sm text-gray-900 dark:text-gray-100">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={{
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              code({ inline, className, children, ...props }) {
                if (!inline) {
                  return (
                    <pre className="mt-2 p-4 bg-gray-800 rounded-md  text-wrap">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  );
                }
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {parsedMessage}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
