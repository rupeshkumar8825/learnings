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



