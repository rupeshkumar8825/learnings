## Error handling in NodeJS Application 
Refer to the following resources to learn about the error handling in ExpessJs 
* [youtube video 1](https://www.youtube.com/watch?v=EUYnERcOGpA) which talks about the best practices to be followed for the error handling. 
* [youtube video 2](https://www.youtube.com/watch?v=udvGMDVyz84)
* [Medium Blog 1](https://medium.com/@sajaldewangan/mastering-40x-error-handling-in-node-js-with-typescript-a-peaceful-approach-eedd8eb99c41)


By the way the detailed explanation with example code examples is as follows: 
## Step 1 : Error Handling in Node.js + TypeScript Backend

This section documents standard error-handling patterns, utilities, and best practices
for a Node.js backend built using TypeScript and Express.

---

## Step 10.1 : Install Required Dependencies

Install middleware to handle async errors and request validation (optional but recommended).

```bash
npm install express-async-errors
```
## Step 10.2 : Define Standard Error Types
Create a centralized error class to represent application-level errors.
File: src/utils/AppError.ts
``` ts
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
```
## Step 10.3 : Common HTTP Error Helpers (Optional)
Create reusable error helpers for frequently used HTTP errors.
File: src/utils/httpErrors.ts
``` ts
import { AppError } from "./AppError";

export const BadRequest = (message = "Bad Request") =>
  new AppError(message, 400);

export const Unauthorized = (message = "Unauthorized") =>
  new AppError(message, 401);

export const Forbidden = (message = "Forbidden") =>
  new AppError(message, 403);

export const NotFound = (message = "Resource Not Found") =>
  new AppError(message, 404);
```

## Step 10.4 : Express Async Error Support
Enable automatic error propagation from async routes.
File: src/index.ts
```ts 
import "express-async-errors";
import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

```

## Step 10.5 : Global Error Handling Middleware
Create a centralized error-handling middleware.
File: src/middlewares/error.middleware.ts
``` ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error("Unhandled Error:", err);

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
```


## Step 10.6 : Register Error Middleware
Register the error middleware after all routes.
File: src/app.ts
``` ts
import express from "express";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use(errorHandler);

export default app;
```



## Step 10.7 : Throwing Errors in Controllers
Throw errors directly inside controllers or services.
``` ts
import { Request, Response } from "express";
import { NotFound } from "../utils/httpErrors";

export const getUserById = async (req: Request, res: Response) => {
  const user = null;

  if (!user) {
    throw NotFound("User not found");
  }

  res.json(user);
};

```



## Step 10.8 : Handling Prisma Errors
Map Prisma errors to HTTP responses.

``` ts
import { Prisma } from "@prisma/client";
import { AppError } from "../utils/AppError";

export const handlePrismaError = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      throw new AppError("Unique constraint failed", 409);
    }
  }

  throw error;
};


```
Usage example:
``` ts
try {
  await prisma.user.create({ data });
} catch (error) {
  handlePrismaError(error);
}
```

## Step 10.9 : 404 Route Handling
Handle unknown routes gracefully.
File: src/app.ts
``` ts 
app.use((_req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

```

## Step 10.10 : Environment-Based Error Responses
Optionally hide stack traces in production.
``` ts
const isProduction = process.env.NODE_ENV === "production";

return res.status(500).json({
  status: "error",
  message: isProduction ? "Internal Server Error" : err.message,
});
```


## Step 10.11 : Logging Errors (Optional)
Use console logging or integrate a logging library.
``` ts
console.error({
  message: err.message,
  stack: err.stack,
  timestamp: new Date().toISOString(),
});
```