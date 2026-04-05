# Synchronous vs Asynchronous Code Execution 
In JS there are two ways in which the JS code could execute. When the the code is executed line by line, in the order it's written this is called as the Synchronous code execution. Each operation waits for the previous one to complete before moving on to the next one. 

Input/Output(I/O) heavy oeprations refer to tasks in a compute program that involve a lot of data transfer between the program and external systems or devices. These operations usually require waiting for data to be read from or written to sources like disks, networks, databases or other external devices, which can be time-consuming compared to in-memory computations. 


Examples of I/O heavy operations: 
1. Reading a file 
2. Starting a clock 
3. HTTP Requests. 


**Note** We’re going to introduce imports/requires next. A require statement lets you import code/functions export from another file/module.
 
Let’s try to write code to do an I/O heavy operation - 
Open repl.it
Create a file in there (a.txt) with some text inside
Write the code to read a file synchronously

``` js
const fs = require("fs");

const contents = fs.readFileSync("a.txt", "utf-8");
console.log(contents);
```

Create another file (b.txt)
Write the code to read the other file synchronously
```js 
const fs = require("fs");

const contents = fs.readFileSync("a.txt", "utf-8");
console.log(contents);

const contents2 = fs.readFileSync("b.txt", "utf-8");
console.log(contents2);
```

What is wrong in this code above?


# Error handling in NodeJS Application 
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

Please note the following about the error handling in express.js 
* Async function exceptions are not automatically handled in case of the express 5 and older
* For other functions the express handles the exception automatically in case of express 5
* In case of express 6 all function's exception are automatically handled. 
* But by default the express returns the complete html and stack trace to the client. This is not ideal for the client. 
* Hence we need to have the custom error handling for this purpose. Using the custom 
error handling we will be able to send the correct proper message with proper 
status code and error message. 
* Even if we do not use the next in this case then also the global exception handler 
will be called. 
* The exception if occurs then if it is not handled then it will bubble up and it 
will reach to the global handler itself. 
* Mainly since the business logics will be present in case of the controller as well as 
in the services too. so we will let the error bubble up until and unless we want to 
modify something in the error. In that cas we will catch the error and then throw it again after modifying it. 
* In summary we will use the try catch whereever we feel we need to modify the error 
or we want to show some specific messages to the user. 

The overview of error traversing is upwards as shown below. 
``` bash
Service throws error
  ↓
Controller (async)
  ↓
express - 6
  ↓
Global error middleware
  ↓
HTTP 500 response
```
So overall "Only catch errors if you can do something meaningful with them."

Use this when:
You don’t want DB internals leaking to clients
You want consistent messages
Example 1: Business Meaning (Recommended)
``` ts
static async createTodo(title: string) {
  try {
    return await prisma.todo.create({ data: { title } });
  } catch {
    throw new ApiError(
      ErrorCodes.INTERNAL_ERROR,
      'Unable to create todo at this time'
    );
  }
}
```


# Defining Relations in Prisma 
Below are example models with defining different database relations 
``` ts

// user model schema 
model User{
  id Int @id @default(autoincrement())
  name String? 
  email String
  password String? // this is null because we can faciliate the login via gmail too
  created_at DateTime @default(now())

  // all relations related stuff comes here 
  // we have one to many relationship with the post. Meaning one user can have multiple
  // posts. So as far as database practices we will store the user_id in the post itself
  post  Post[]
  // there can be multiple comments which user can make. 
  // hence we need to complete the relation here 
  comment Comment[]
}

// post model schema 
model Post {
  id Int @id @default(autoincrement())
  // post will be created by a user hence we need to define the relationship with the user
  user User @relation(fields: [user_id], references: [id])
  user_id Int
  title String
  description String
  comment_count BigInt @default(0)
  created_at DateTime @default(now())

  // defining the relations here 
  // since there can be multiple comments for a given post hence we need to complete
  // the relation here
  comment Comment[]
}

// creating the comment model 
model Comment {
  id String @id @default(uuid())
  // this comment will belong to only a single post itself 
  post Post @relation(fields: [post_id], references: [id])
  post_id Int

  // this comment will be made by some user itself we need to define the relation
  // for that as well
  user User @relation(fields: [user_id], references: [id])
  user_id Int

  comment String
  created_at DateTime @default(now())
}
```


Consider the below table schema defined in the SQL itself. 
``` sql
id UUID DEFAULT gen_random_uuid() PRIMARY KEY, 
name VARCHAR(100) NOT NULL CHECK (char_length(name) > 3), 
email VARCHAR(100) UNIQUE NOT NULL, 
password TEXT NOT NULL, 
role VARCHAR(10) DEFAULT 'User' CHECK (role in ('User', 'Admin')), 
avatar JSONB DEFAULT NULL, 
reset_password_token TEXT DEFAULT NULL, 
reset_password_expires TIMESTAMP DEFAULT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```
Now the alaternative prisma model would be as follows: 
``` bash
model User {
  id                     String   @id @default(uuid()) @db.Uuid
  name                   String   @db.VarChar(100)
  email                  String   @unique @db.VarChar(100)
  password               String
  role                   Role     @default(User)
  avatar                 Json?
  resetPasswordToken     String?
  resetPasswordExpires   DateTime?
  createdAt              DateTime @default(now())

  @@check(length(name) > 3)
}

enum Role {
  User
  Admin
}
```

# SQL Injection 
Usually we write the sql queries in the following format: 
``` ts
const users = await database.query(
    `INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${password})`, 
    [name, email, password]
)
```
In the above case there is a risk of SQL INJECTION. Meaning consider that the client
sends the name value as "; delete * from users;". Then in this case the above query 
will delete the complete table. 
To avoid this we should write the query as shown below : 
``` ts
const users = await database.query(
    `INESRT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`, [name, email, password]
) 
```
This way the postgres will know that these are parameters and they are not separate
queries. This is a proper way to avoid the sql injection related things.