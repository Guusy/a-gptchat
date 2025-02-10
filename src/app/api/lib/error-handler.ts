import { RateLimiterRes } from "rate-limiter-flexible";

interface ErrorHttp {
  status: number;
  body: object;
}

interface ErrorMapping {
  [key: string]: {
    status: number;
    message: string;
  };
}

const errorMapping: ErrorMapping = {
  ChatNotFound: {
    status: 404,
    message: "Cannot find the chat with this specific id",
  },
  MaxTokenLimit: {
    status: 400,
    message: "The request exceeds the max token permitted",
  },
};

export default function errorHandler(error: Error): ErrorHttp {
  if (error instanceof RateLimiterRes) {
    return {
      status: 429,
      body: { message: "Too many requests" },
    };
  }

  const domainError = errorMapping[error.name];

  const errorDetails = domainError || {
    status: 500,
    message: "Unexpected error",
  };

  if (!domainError) {
    console.log("Fatal error in the app", error.stack);
  }
  return {
    status: errorDetails.status,
    body: { message: errorDetails.message, data: error?.data },
  };
}
