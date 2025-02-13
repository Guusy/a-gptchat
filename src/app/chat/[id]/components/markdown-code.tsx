
interface MarkdownCodeProps {
  className?: string;
  children: string;
  [key: string]: unknown;
}

export default function MarkdownCode({ className, children, ...props }: MarkdownCodeProps) {
  const isBlockCode = children.includes("\n");
  if (isBlockCode) {
    return (
      <pre className="mt-2 p-4 bg-gray-800 rounded-md text-wrap">
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
}
