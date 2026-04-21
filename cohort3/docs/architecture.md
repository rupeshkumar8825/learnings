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
