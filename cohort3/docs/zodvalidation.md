# ZOD validation 
This is a inbuilt typescript library which helps to define the schema rules. This can be used for data validation and defining rules of the data that we are getting from the user. 
Generally in the backend applications we first try to first validate the user input and once the input is valid then we proceed with the business logic. Please note that there is no need to define the rules of the database schema using the zod for mongoose/mongodb. 

But for applications who use the prisma or postgresql I think we could use the zod rules in the database schemas too. (TODO : please check whether this is true or not)



# Example 
There are multiple rules that we can write in the zod. Following are the msot used ones for complex full stack applications too.

Below is an example which defines the zod rules for the complex applications like defining the user schema, password schema, registration schemas, payment schemas, 

``` ts 

// zod.validation.js

const { z } = require("zod");

//
// 1. Primitive + Advanced Field Validation
//
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 chars")
  .max(20)
  .regex(/[A-Z]/, "Must contain uppercase")
  .regex(/[a-z]/, "Must contain lowercase")
  .regex(/[0-9]/, "Must contain number")
  .regex(/[^A-Za-z0-9]/, "Must contain special char");

//
// 2. Reusable Schemas
//
const objectIdSchema = z
  .string()
  .length(24, "Invalid Mongo ObjectId");

const emailSchema = z
  .string()
  .email("Invalid email")
  .transform((val) => val.toLowerCase());

//
// 3. Nested Object Schema
//
const addressSchema = z.object({
  street: z.string().min(5),
  city: z.string(),
  state: z.string(),
  pincode: z.string().length(6),
});

//
// 4. Array + Complex Items
//
const moduleSchema = z.object({
  title: z.string().min(3),
  durationInMinutes: z.number().positive(),
});

const courseContentSchema = z.array(moduleSchema).min(1);

//
// 5. User Schema (Advanced)
//
const userSchema = z.object({
  name: z.string().min(3),

  email: emailSchema,

  password: passwordSchema,

  role: z.enum(["student", "instructor", "admin"]),

  age: z.number().int().positive().optional(),

  address: addressSchema.optional(),

  skills: z.array(z.string()).max(10).optional(),

  createdAt: z.date().default(() => new Date()),
});

//
// 6. Course Schema (with Business Logic)
//
const baseCourseSchema = z.object({
  title: z.string().min(5),

  price: z.number().positive(),

  discount: z.number().min(0).max(100).optional(),

  instructorId: objectIdSchema,

  content: courseContentSchema,

  tags: z.array(z.string()).min(1).max(5),

  isPublished: z.boolean().default(false),

  publishedAt: z.date().optional(),
});

// Conditional validation using superRefine
const courseSchema = baseCourseSchema.superRefine((data, ctx) => {
  if (data.isPublished && !data.publishedAt) {
    ctx.addIssue({
      path: ["publishedAt"],
      message: "publishedAt is required when course is published",
      code: z.ZodIssueCode.custom,
    });
  }

  if (data.discount && data.discount > 50 && data.price < 1000) {
    ctx.addIssue({
      path: ["discount"],
      message: "High discount not allowed for low price courses",
      code: z.ZodIssueCode.custom,
    });
  }
});

//
// 7. Cross-field Validation (Register)
//
const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

//
// 8. Discriminated Union (Payments)
//
const cardPayment = z.object({
  type: z.literal("card"),
  cardNumber: z.string().length(16),
});

const upiPayment = z.object({
  type: z.literal("upi"),
  upiId: z.string().includes("@"),
});

const paymentSchema = z.discriminatedUnion("type", [
  cardPayment,
  upiPayment,
]);

//
// 9. Preprocessing (String → Number)
//
const ageSchema = z.preprocess(
  (val) => Number(val),
  z.number().positive()
);

//
// 10. CRUD Helpers
//
const updateUserSchema = userSchema.partial();

const publicUserSchema = userSchema.omit({
  password: true,
});

const loginSchema = userSchema.pick({
  email: true,
  password: true,
});

//
// 11. Validation Middleware (Express-ready)
//
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({   
      message: "Validation failed",
      errors: formatZodError(result.error),
    });
  }

  req.validatedData = result.data;
  next();
};

//
// 12. Error Formatter
//
const formatZodError = (error) => {
  return error.errors.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
};

//
// 13. Example Usage (Simulation)
//
const testData = {
  name: "Rupesh Kumar",
  email: "RUPESH@GMAIL.COM",
  password: "Password@123",
  role: "instructor",
};

const result = userSchema.safeParse(testData);

if (!result.success) {
  console.log("❌ Validation Errors:", formatZodError(result.error));
} else {
  console.log("✅ Valid Data:", result.data);
}

//
// 14. Exports
//
module.exports = {
  userSchema,
  courseSchema,
  registerSchema,
  paymentSchema,
  loginSchema,
  updateUserSchema,
  publicUserSchema,
  validate,
};
```

# Generic Middleware that uses the zod validation 
``` ts 

// src/middleware/validationMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

import { StatusCodes } from 'http-status-codes';q

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue: any) => ({
            message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid data', details: errorMessages });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
      }
    }
  };
}

```

# References 
Following are very good list of resources to refer for learning about the zod; 
* [Blog Post 1](https://dev.to/osalumense/validating-request-data-in-expressjs-using-zod-a-comprehensive-guide-3a0j) gives the complete implementation of the zod rules and then validate middlewares as well. 
* ChatGPT 
* [Blog Post 2](https://medium.com/@enescidem/jwt-authentication-user-management-with-typescript-express-bcac5ed28248):- This has the detailed explanation about the JWT authentication implementation using the auth middleware. This also explains how we can store the userId in request header and then pass it to the routes layer for this purpose. 

