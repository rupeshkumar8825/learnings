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


# PROMISE In JS
Promise class gives you a promise, that I will return you something in the future. Similar to how setTimeout(fn, 3000) calls the fn in future. Meaning we can always use either : 
* Callback based approach 
* Promise based approach. 
Calling a promise is easy, defining our own promise is where things get hard. 

A promise in JavaScript is an object that represents the eventual completion or failure of an asynchronous operation and its resulting value. Promises are used to handle the asynchronous operations more effectively than traditional callback functions, providing a cleaner and more manageable way to deal with code that executes asynchronously, such as API calls, file I/O, or timers. 

The example of a promisied function is as follows : 
```js 
// this is the promisified version of the settimeout function implementation
// returns an object of the promise class
function setTimeoutPromisified(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// this is callback function which needs to be called once 
// the promise is resolved
function callback()
{
  console.log("3 seconds have passed")
}

setTimeoutPromisified(3000).then(callback)

```

Meaning the promises are just a syntactically superior way to write instead of callbacks. 
Whenever the resolve function is called then it will call the callback function which is passed in the .then(callback) function part. 

```js
function random(resolve) { // note that resolve is also a function
  // after some point call the resolve 
  // resolve()

  // meaning please call the resolve after 3 seconds
  setTimeout(resolve, 3000);
}

let p = new Promise(random);

function callback()
{
  console.log("promise resolved");
}


p.then(callback);
```
There are 3 components of the promises : 
1. The function which returns the promise. 
2. The function which is passed as an argument to the promise() which will eventually call the resolve at some condition 
3. And then the callback function that we need to call once the promise is resolved. 


Lets look at the another example use case of the promises. Lets write the function to implement the promisified version of the readfile function 

``` js
const fs = require("fs")

function readFile(resolve)
{
  fs.readFile("a.out", "utf-8", function(err, data){
    resolve(data)
  })
}


function readFilePromisifiedVersion()
{
  return new Promise(readFile)
}



// this is the callback function
function callback(contents)
{
  console.log("The contents of the files are : ", contents)
}


readFilePromisifiedVersion().then(callback)


```
So a promisified version of a given function can be implemented by wrapping its actual functionality inside the new Promise()


# Callback Hell vs Promises 
Lets see an example of callback hell. Consider a requirement where we need to print  "hi" after 1 seocond. Then once the "hi" is printed then after 3 seconds print "hello". and after "hello" is printed then after 4 seconds print the "hello there". 

``` js 
setTimeout(function () {
  console.log("hi")
  setTimeout(function() {
      console.log("hello")
      setTimeout(function(){
        console.log("hello there")
      }, 4000)
  }, 3000)
}, 1000)

```
The above expression could be simplified as following without having the callback and also without having the promises too. 

```js

function step3Done(){
  console.log("hello there")
}

function step2Done(){
  console.log("hello");
  setTimeout(step3Done, 4000);
}

function step1Done(){
  console.log("hi");
  setTimeout(step2Done, 3000);
}

setTimeout(step1Done, 1000);

```
Now using the promise chaining we can write some logics as follows: 
``` js 

function setTimeout(resolve, ms)
{
  setTimeout(resolve, ms)
}

// lets implement the promisified version of the settimeout 
setTimeoutPromisified(ms){
  return new Promise(setTimeout)
}


setTimeoutPromisified(1000)
.then(function () {
  console.log("hi")
  return setTimeoutPromisified(3000)
}).then(function () {
  console.log("hello")
  return setTimeoutPromisifed(5000)
})
.then(function () {
    console.log("hello there")
})
```

# Error handling in NodeJS Application 
Refer to the following resources to learn about the error handling in ExpessJs 
* [youtube video 1](https://www.youtube.com/watch?v=EUYnERcOGpA) which talks about the best practices to be followed for the error handling. 
* [youtube video 2](https://www.youtube.com/watch?v=udvGMDVyz84)
* [Medium Blog 1](https://medium.com/@sajaldewangan/mastering-40x-error-handling-in-node-js-with-typescript-a-peaceful-approach-eedd8eb99c41)
* [Medium Blog 2](https://medium.com/@pradeep.tarakar17/error-handling-in-express-the-better-way-1ec1e4853a44)

* [Medium Blog 3](https://blog.devgenius.io/build-a-custom-error-handling-middleware-for-expressjs-78c03087d4e7)


By the way the detailed explanation with example code examples is as follows: 
## Step 1 : Error Handling in Node.js + TypeScript Backend

This section documents standard error-handling patterns, utilities, and best practices
for a Node.js backend built using TypeScript and Express.

---


## Summary 
In Express 5, async errors bubble automatically — just write clean code and throw errors. We can use the global error handler middleware. We should always throw errors in the service layer without writing the try catch in the controller. This is because in express 5 onwards suppose if the service layer throws the error then in that case since there is no try catch in controller the error will bubble up and eventually reach the global middleware.
We only use the try catch in the controller when we need to do some custom handling in case of the controller. After customization we again need to throw the error from the controller which will be eventually captured to global error middleware. 

But generally following is the final Takeaway
* You do NOT need try-catch for controller errors either
* Service + Controller errors both bubble automatically
* Use try-catch ONLY for custom logic, not for forwarding

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
modify something in the error. In that case we will catch the error and then throw it again after modifying it. 
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