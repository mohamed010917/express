export default function ErrorHandling(err, req, res, next) {
  if (!err) {
    return next;
  }

  if (err.name === "MongoServerError" && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    return res.status(400).json({
        success: false,
        message: `${field} already exists`,
    });
    }
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(
      (val) => val.message
    );
    return res.status(400).json({ error: messages });
  }

  if (err.name === "MongoServerError" && err.code === 11000) {
    return res.status(400).json({
      error: "Duplicate field value entered",
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      error: "Resource not found",
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "Token expired",
    });
  }

  if (err.name === "ZodError") {
    const messages = err.errors.map((val) => val.message);
    return res.status(400).json({ error: messages });
  }

  if (
    err instanceof SyntaxError &&
    err.status === 400 &&
    "body" in err
  ) {
    return res.status(400).json({
      error: "Invalid JSON",
    });
  }

  if (err.name === "ZodError") {
    return res.status(400).json({
        success: false,
        // message: err.errors[0].message,
    });
    }

    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: "Email already exists"
        });
    }


  console.error(err);

  return res.status(err.statusCode || 500).json({
    error: err.message || "Internal Server Error",
  });
}