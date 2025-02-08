interface ResponseParams {
  message: string;
  data: unknown;
  status: number;
}

export default function buildResponse({ message, data, status }: ResponseParams) {
  return Response.json({ message, data }, {
    status,
  });
}
