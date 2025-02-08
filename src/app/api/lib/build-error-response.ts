import errorHandler from "./error-handler";

export default function buildErrorResponse(error: unknown) {
  const { status, body } = errorHandler(error as Error);

  return Response.json(body, {
    status,
  });
}
