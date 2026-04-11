# Middlewares in Express 
Express is a routing and middleware web framework that has minimal functionality of its own: An express application is essentially a series of middleware function calls. 

Middleware functions are functions that have access to the request object (i.e. req) and the response object(i.e. res), and the next middleware function in the applications request-response cycle. The next middleware function is commonly denoted by a variable named next. 

Middleware functions can do the following things : 
1. Execute any code. 
2. Make changes to the request and the response objects. 
3. End the request-response cycle. 
4. Call the next middleware function in the stack. 

Either we can pass the middleware in every API request. But there is an alternate way to define the middleware at the top and then use the app.use() before any api call. 
Example explaning the same is as follows : 

``` js
/// Example use case of implementing the total number of requests on the server. 
// For this we can implement this as middleware as we want to first check 
// how much request call was made. This is what is implemented below.


// tell to use this middleware. 
// if this is kept at the start then this would be automatically called 
// for every API request
app.use(function(req, res, next) {
    requestCount = requestCount + 1;
})

app.get("/user", function(req, res) {
    res.status(200).json({name : "John"});
})

app.post("/user", function(req, res) {
    res.status(200).json({msg : "Created dummy user"});
})

```


Another example use case of the middleware could be to implement the rate limiter. 
Lets implement the middleware which can rate limit the requests from a user to only 5 request per second. 
Meaning if a user sends more than 5 requests in a single second, the server should block them with 404 status code.

```js 

let numberOfRequestsForUser = {};
setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000)


// global middleware 
app.use(function(req, res, next) {
    const userId = req.headers["user-id"];
    if(numberOfRequestForUser["user-id"])
    {
        numberOfRequestForUser["user-id"] = numberOfRequestForUser["user-id"];
        if(numberOfRequestForUser["user-id"] > 5)
        {
            // meaning the user has hit the max rate limit 
            res.status(404).send("no entry");
        }
        else 
        {
            // else we want to allow the request to be served to the user 
            // hence lets call the next call here for this purpose. 
            next();
        }
    }
    else 
    {
        // this means its the user's first request itself hence set it to 1
        numberOfRequestsForUser["user-id"] = 1;
        // and then lets move on to the next part. 
        next();
    }

})
```

## Error Middleware 
Suppose you have been given an express server which has a few endpoints. Your task is to : 
1. Ensure that if there is ever an exception, the end user sees a status code of 404 
2. Maintain the errorCount variable whose value should go up every time there is an exception in any endpoint. 

Note that we define the error handling middleware at the end of the list of the apis requests. 

``` js 

app.get("/user", function(req, res) {
    res.status(200).json({name : "John"});
})

app.post("/user", function(req, res) {
    throw new Error ("some error occurred")
    res.status(200).json({msg : "Created dummy user"});
})

app.use(function(err, req, res, next) {
    res.status(404).send({});
})
```

# Headers in Requests 
When we hit any end point from our browser then it sends some request either it could be GET, POST, PUT, PATCH, DELETE. Now along with this request we can send some body and headers too. For example for updating the tweet then we send the updated tweet value in the body along with some headers. 

Now generally there are two types of headers which are passed which are: 
1. Request Headers :- has lot of sensitive data. Lot of authentication data as well For example in here we send passwords too. It has typically the following fields which are there: 
    a. Accept :- value contains something like **text\html** which tells that I accept html please send me the html as response.  
2. Response Headers :- it is something which is sent by the server to the client. It may be like what is the size of the response which was sent to the client. 


## Definitions
So basically headers are key-value pait sent between client (like a web browser) and a server in an HTTP request or response. They convey metadata about the request or response, such as content type , auth information and so on. 

## Common Headers 
Below are some of the common headers : 
1. Authorization :- sends the user auth information. 
2. Content-Type :- type of information client is sending (json, binary etc)
3. Referer :- which URL is this request coming from. 







