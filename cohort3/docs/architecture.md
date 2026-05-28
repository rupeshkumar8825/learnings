# Password reset token based mechanism
A password reset token mechanism is a two-step secure workflow that proves a user owns their email inbox, allowing them to change their password without knowing the old one.
This process involves the following things : 
1. Generating a unique, time-limited, and cryptographically secure random string. 
2. Associating it with a user. 
3. Invalidating it after use. 

* Request Initiation: The user enters their email in a "Forgot Password" form.
* Generation: The backend verifies the user exists, generates a cryptographically secure, random, and unique string (token), and sets an expiration time (e.g., 15–60 minutes).
* Storage: The system stores the token (usually hashed) in the database, associated with the specific user, and records the expiration timestamp.
* Delivery: A link containing this token is emailed to the user, typically in the format: https://app.com....
* Validation & Update: The user clicks the link, bringing them to a page to enter a new password. The backend checks if the token is valid, matches the user, and hasn't expired.
* Invalidation: Upon successful password update, the token is deleted or marked as used, ensuring it cannot be used again


# Storing the files in cloudinary. 
There are multiple instances where we have to store different user files like user profile or user document, in such cases explain here how do we store these files in the backend. 

# Explain the folder structure of the code repository 
For typescript based express backend server we should follow some specific folders to organize the code better. 
Explanation of that should be done in this file. 

# Explanation of the Prisma concepts
Explain the different nuances of the prisma in detail. 

# Middlewares 
Explanation related to middlewares should come here. Explain different types of middlewares like authentication middlewares, error middlewares, file upload middlewares and so on. 

# Error Handling
We have used one of the best error handling approaches in the projects that we have built. Explanation of those middlewares should be done. How do we setup the error middleware, what is the difference between error middleware and other middlewares. 
How the error propagates and does the error bubbles up. 


# Unit testing 
Although this might not be required as of now. But going forward in this section we will first try to implement the unit testing, integration testing and other testing for our backend application and then we will populate the learnings here on how to write unit tests, integration tests and so on for this purpose. 

# Different nuances of package.config content
package.config is a vast file. But we must be aware about some of the most common things present in the file. For example it could be following : 
* Understanding the scripts section, 
* Understanding the things that needs to be updated while using the nodemon. 
* ... and so on

# Typescript essentials and difference between TS and JS. 
Understand the basic nuances of the typescript, like what is it, how does it compile using what all compilers and so on. Other important nuances of the typescript itself. 

Need to have deeper understanding about what exactly is the difference between the typescript and javascript. Why to use TS and not JS.

How to add our custom made types with examples. Like in one of the projects we added our custom type in the Request object to include the userId so that after successfull authentication by the authentication middleware, we can access the userid in the controller. 


# Event loops in the nodejs 
Explanation of the event loop with the help of proper examples using code. 



# System Design Related concepts 
Take real life scenarios and then try to explain how can we achieve the solution given a problem with system design principles. 

# Frontend Nuances using ReactJS and NextJS 
Once we are done with building the full stack project then we can explain the different nuances about the frontend too in detail. 

# About cloudinary 
Explain how we can use the cloudinary in order to manage the media, files, uploading, downloading, storing, transforming and other operations efficiently on cloud. Further also explain how to write the codes to use the cloudinary in conjunction with the express-fileupload middleware, explain why do we need it exactly for this purpose. 

## References 
* [Medum Blog 1](https://medium.com/@elijahechekwu/uploading-media-files-to-cloudinary-streamlining-content-management-for-node-js-web-applications-8894321d598d)


# Handling undefined, null, empty values
There is a lot of ambiguity while using the variables whose types could be undefined|null|string at the same time. Some thought on this would help a lot for this purpose for this purpose.
Hence jotting down some of the great examples which provides clarity to the developer would be very helpful. 

# Explain the following syntax 
Below is an example of the middleware. Normally we pass request, response and next function as an argument to middleware function but in this case we are passing the roles and then in separate function we are pasing the request, response and next function. Please write the explanation of such syntaxes in detail. 
``` ts 
export const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource.`,
          403
        )
      );
    }
    next();
  };
};
```

# Not able to use the foreach and async at the same time
Recently in one of the project I wrote the following code : 
``` ts 
images.forEach(async function(element) {
                const cloudinaryUploadResponse  = await CloudinaryService.uploadToCloudinaryService(element, {
                    folder : "product", 
                        width : 150, 
                        crop : "scale"
                })
                // check whether the upload was successfull or not 
                if(!cloudinaryUploadResponse.public_id || !cloudinaryUploadResponse.url)
                {
                    // if any of the fields are empty then we know that the upload was
                    // not successfull. In this case we will simply log on the server and continue 
                    console.log("The upload to cloudinary failed for this product image")
                    
                }else {
                    const avatar :avatarType = {
                        public_id : cloudinaryUploadResponse.public_id, 
                        url : cloudinaryUploadResponse.url
                    }
                    uploadedImages.push(avatar)
                }
            });
```

The above piece of code was not actually awaiting for the file to be uploaded. But instead the code execution was moving forward. This is because we cannot use foreach with async and await for this purpose. Although the files were uploaded successfully.
So its better to describe why does this happen in detail for this purpose. 

# Implementing the filter feature using prisma 
Generally we have to implement the filter based search in the e-commerce websites. To handle such things we use pass the different filters using the query parameters. These parameters are then received in the backend and based on the different filters values we write the custom prisma query to be made. 

Give an example of such an implementation here for this purpose. So that in future we can be aware about such methods to implement the filter algorithm properly for this purpose. 


# JOINS in database 
In websites like ecommerce we generally have to fetch the data from different tables and in postgres or sql we need to use joins too much. 
So better to explain and learn about LEFT JOINS a lot for this purpose. 

# Handling of onCascade either from DB or from Application layer
Generally we have different types of references to and from different tables. In such cases we must use it for this purpose and hence this would men


# PRISMA Workflow 
Here’s the mental model + workflows you should know to handle schema changes like a real backend dev (and be interview-ready) with Prisma + PostgreSQL.

Core mental model
1) There are two “schemas”


schema.prisma = your desired data model (source of truth for Prisma)


Database schema (tables/columns/FKs/indexes) = what actually exists in Postgres


Migrations are the controlled way to move the DB schema from one version to the next.
Prisma stores migration history in a DB table called _prisma_migrations. 

Prisma commands you must know (and when to use them)
prisma migrate dev
Use in local development.


Creates a new migration from your Prisma schema changes


Applies it to your dev DB


Uses a shadow database to detect drift / problems 


prisma migrate deploy
Use in staging/production/CI.


Applies migrations that exist in /prisma/migrations


Never resets your DB and doesn’t use shadow DB (safer for prod) 


prisma db push
Use for prototyping or when you explicitly don’t want migration history.


It “pushes” schema changes to DB without creating migration files


Not recommended for team/production workflows 


prisma migrate reset
Dev-only convenience:


Drops DB, recreates, replays migrations, runs seed


Never use on a DB with valuable data (obviously).


prisma migrate diff
Compares two schemas (DB vs schema vs migrations) and shows what would change. Useful for auditing drift. 
prisma migrate resolve
Marks a migration as applied/rolled-back in _prisma_migrations without actually running SQL.
Used when you applied SQL manually or are reconciling state.

Handling schema changes: the 3 common situations
A) No important data (early dev / empty DB)
This is the easiest case.
Workflow


Edit schema.prisma


Run:
npx prisma migrate dev -n <meaningful_name>npx prisma generate


If things go sideways, you can do:
npx prisma migrate reset


Interview note: early dev = fast iteration; resets are acceptable.

B) There IS data and you must preserve it (real world / prod-like)
Now you must think like a DBA.
Golden rules


Never “reset” production


Always use migrations (not db push) so changes are reproducible


Assume some migrations are “breaking” and require a careful rollout


Workflow


Change schema.prisma


Create a migration:
npx prisma migrate dev -n <name>


Inspect the generated SQL in prisma/migrations/.../migration.sql


Test on a copy of production data if possible


Deploy:
npx prisma migrate deploy


Key concept: “schema migration” vs “data migration”


Schema migration: add column, add FK, change type, add index


Data migration: populate new column, backfill, transform existing rows


Prisma Migrate handles schema changes; for data migrations, you often:


write a one-off script (Node/TS) and run it in deployment, or


embed SQL updates in the migration file (carefully).


Prisma has an official workflow for customizing migrations (editing migration SQL) when needed. 

C) You are adding Prisma migrations to an existing database
Typical in interviews: “join Prisma to legacy DB”.
Workflow


Introspect:
npx prisma db pull


Create a baseline migration / align schema with DB


From that point onward, Prisma migrations become the source of truth


Prisma docs cover integrating migrate into an existing project. 

The big “gotchas” you must be able to talk about
1) Adding a NOT NULL column to a table with existing rows
If you do:
newField String
DB will reject it because existing rows need a value.
Safe patterns


Add it as nullable first: String?


Backfill data


Then make it required in a later migration


This is a classic two-step (sometimes three-step) migration pattern.

2) Changing column types with data present
Example: String → Int, Decimal → Int, etc.


Might fail if existing data can’t be cast


Might lock table (downtime risk)


Interview-ready answer: do it in stages, validate/clean data, then switch.

3) Adding foreign keys / cascades after you already have data
When you add onDelete: Cascade or add a new FK, the migration will alter constraints.


If existing data violates the constraint, migration fails.


You must clean data first.


Prisma’s referential actions docs describe the behavior and options (Cascade, Restrict, SetNull, etc.). 

4) Drift (DB changed manually vs migrations)
Prisma detects “drift” in dev via shadow DB. 
In production, drift can happen if someone hotfixes the DB.
Interview-ready handling


Use migrate diff to detect mismatch 


Decide whether to:


create a new migration that matches reality, or


revert the manual change, or


use migrate resolve if the migration state differs from actual DB





5) Zero-downtime migration mindset (important)
For high-traffic systems, avoid “big bang” schema changes.
Typical safe rollout strategy


Add new columns/tables in a backward-compatible way


Deploy app that writes to both old & new (or writes new)


Backfill data


Switch reads to new


Remove old in a later migration


Even if you don’t implement it fully, being able to explain this matters a lot.

A simple “decision guide” (interview-friendly)


Solo dev / early stage / OK to lose data? → migrate dev, reset acceptable


Team / CI / production? → migrate dev to create migrations, migrate deploy to apply


Prototype quickly and don’t care about migration history? → db push (but avoid long-term) 


Legacy DB already exists? → db pull first, then baseline + migrate 



What you should say if asked “how do you handle schema changes in production?”
A strong answer:


“We use Prisma migrations committed to git.”


“We generate migrations in dev, review SQL, run tests on staging.”


“We deploy with prisma migrate deploy in CI.”


“For breaking changes (NOT NULL, type changes), we do phased migrations and backfills.”


“We avoid manual DB changes; if drift happens we use migrate diff and reconcile carefully.”


(That aligns exactly with Prisma’s intended deploy model.) 

If you want, tell me:


are you using Prisma relationMode = foreignKeys (default for Postgres) or prisma mode,


and whether you deploy on VPS / Docker / serverless,


…and I’ll outline a clean CI/CD checklist (including when to run generate, where to run deploy, and how to do safe backfills).


# Limitations of Prisma 
There are some known limitations of prisma. For example some of the complicated queries cannot be written be in Prisma due to lack of support for something. 
Need to find such examples where prisma query writing is almost not possible and then post it here for future reference and understanding for this purpose. 

# Example Complex Queries in POSTGRESQL 
Write down some of the most common complex queries that we should understand or atleast should know how to write. Listing down such queries would help us to revise faster. 
For example we could include the queries which uses the JOINs and other complex stuff. 


# Explanation of the system architecture of the Stripe based payment 

Tags to search this : - Stripe Integration, Payment Integration
Almost all the applications either it being a web app or a SAAS app we need to integrate the payments gateway with our apps to be able to implement a seamless, secure and compliant payment systems. For this there are multiple ways to do this. One such way is to use the Stripe payment gateway. Even though if we can choose between different payment gateways but at the end the underlying concepts would be almost similar. 
Its better to describe the complete architecture and the complete design here with examples. 
Complete payment lifecycle (sequence)
* Client creates order (or order already exists).
* Client → Server: “Create payment for orderId=123”
* Server:
  *  fetch order + items
  * compute amount
  * create PaymentIntent in Stripe
  * save payment_intent_id in DB
  * return client_secret
* Client → Stripe SDK: confirm payment using client_secret
* Stripe processes payment asynchronously (may take time; may require 3DS, UPI collect, etc.)
* Stripe → Server webhook: payment_intent.succeeded (or failed)
* Server updates DB to PAID + records payment, triggers fulfillment (deliver access, ship, etc.)
* Client shows final status by fetching order status (or via websockets)

## Important Stripe  Commands 
After successfull payment the Stripe sends back the webhook to the server. We give the server payment confirmation webhook url 
to the stripe and then our server will validate whether the payment intent which we got is really success or not. 
Depending on whether it was success or not we take actions on the database for this purpose. 

Now when the server is not hosted we run the server in our localhost and hence the stripe webhook server will not be able 
to reach to at our local running server. For that we use the following command to listen to the webhook request from stripe 
and this webhook received is then transferred to our the local server running port. 
``` bash 
stripe listen  --forward-to localhost:4000/api/v1/payments/webhook
```


## Resources 
* [Medium Blog 1](https://okraks.medium.com/accept-payments-seamlessly-with-stripe-a-developers-integration-guide-9102c4aaa4be)
* [ChatGPT](https://chatgpt.com/c/69f63923-4a54-8320-923e-4684363c2113)
* [Medium Blog 2](https://medium.com/@sindhujad6/how-to-set-up-stripe-cli-for-local-development-step-by-step-guide-for-developers-309b0a3a2244)
* [Medium Blog 3 :- Explaining the architecture of the stripe payment systems](https://okraks.medium.com/accept-payments-seamlessly-with-stripe-a-developers-integration-guide-9102c4aaa4be)


# Concepts related to the Promise, callbacks, async await and so on
Need to clear concepts related to promise, callbacks, async and await. Need to know when to use these and how can we use these. Post here the example codes so that we can refer these 
at the time of revision for this purpose


# ABSOLUTE AND RELATIVE RELATION
While working on the frontend part we usually come across the absolute and relative thing. Need to understand about the complete concept related to this. Understand where can we use this and typically for what features and for what purpose we would require this. 
Also its always better to add some examples related to the relative and absolute uses is preferred for better and faster revision for this purpose

# RECOIL STATE MANAGEMENT
In react or frontend application we generally require some mechanism to store the global state of some data which can then should be accessible to all of the components of the application. 
There are various state management libraries which are present. One of them is Recoil. Jot down all the important concepts about the recoil. For example jot down the difference between the atoms and selectors. When to use them. What so special about recoil so that it is now being preferred in the industry. How does this improves the performance of the application. 

Please also add some of the code examples on how to go about setting the state management store for the frontend application using recoil. Futher also mention the code and explain it in detail about how to go about defining the atom and then selectors and then how can we access these atoms and selectors across different components and further how to go about updating the atoms state for this purpose. 
If we do this then it will be very helpful for a quick revision about the concepts for this purpose
Mention everything about the recoil uses where to use atoms and where to use selectors. Please add the example code snippets for the same for a better and fast revision documentation
`
## Need to learn how the caraousel works
Generally in frontend applications we often see the usagews of the caraousel which automaticall slides by showing multiple items one by one. In order to implement that we need to know mthe concepts of the transform, translate and so on. These concepts we need to learn at any cost for this purpose. Add an note or example codes on the caraousel component so that we will be able to revise is pretty fast for this purpose


# Notes 
While working with the recoil and the frontend project it is observed that there is a compatibility issue with the react 19 and the recoil. Further safari is not good for development and debugging purpose simply because it does not give us a proper error in detail. Instead we should prefer to use the chrome itself so that we can save our time and can get better errors in detail for this purpose


# Setting up React + TailwindCSS Project using the vite @latest 
Mention the steps to be performed in order to setup and initialize the react + tailwind css project using the vite latest CLI Command. 


# Learn about the frontend architecture to follow 
In the full stack application, while working on the frontend we need to implement UI, api layer , recoils, api layer and so on. Write down teh complete code architecture to follow with separation of concerns. One such case could be the usages of the custom made hooks so that the api related code remains separate with the UI related codes. 
Give examples to support the argument for this purpose. 

# Why to use custom hooks in react js
mention with proper example explaining a scenario why do we need to use the custom made hooks in the reactjs application while working on a full stack project for this purpose