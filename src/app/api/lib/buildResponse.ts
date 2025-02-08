interface ResponseParams {
  message: string;
  data: unknown;
  status: number;
}

export default function buildResponse({ message, data, status }: ResponseParams) {
  return new Response(JSON.stringify({ message, data }), {
    status,
  });
}
