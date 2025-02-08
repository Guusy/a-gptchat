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
};

export default function errorHandler(error: Error) {
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
