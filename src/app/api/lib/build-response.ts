interface ResponseParams {
  data: object;
  status: number;
}

export default function buildResponse({ data, status }: ResponseParams) {
  return Response.json(data, {
    status,
  });
}
