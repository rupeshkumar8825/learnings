# JWT Authentication 
JSOM web tokens are just like these bank cheques. They are issued by the backend when you sign in. Anyone can create something very similar, but the backend would reject it. If you lose the original jwt, then it is a problem. 
Meaning in the case of bank cheques as well, if we loose the original cheque book then we loose the money. But if any intruder copies the chequebook just like you then the bank is going to reject. This is similar in case of the JWT as well where if any intruder gets the exact same JWT then they can query the backend as ours. 

There are 3 important things in case of JWT which are : 
1. Generating JWT :- whenever we have a backend server or if we have a bank then generating means generating the cheque book. The banks will have their own some  very secret thing which they are printing on the cheque book. Similarly backend server generates a very long string which is just called as JWT. If this JWT comes back to this backend server again then the backend server will be able to verify this JWT token. Please note that there is a big difference between decoding the JWT and verifiying the JWT. 
2. Decoding JWT :- Anyone can decode the JWT. Meaning in case of cheques as well. intruder can see the cheque and then they can decode the important thing that was put on the cheque and they try to generate the similar signature. Similarly the JWT token can be decoded and then intruder can try to recreate the similar JWT. But it cannot be used and verified by the backend server. 
3. Verifying JWT :- 


Lets see an example of it is generated : 

``` ts 
import jwt from "jwonwebtoken"

// generate 
const value = {
    name : "harkirat", 
    accountNumber : 123123123
}


// note that we have to pass a secret
// this is what acts as a secret machine that only server has 
// hence even if the intruder decodes the JWT but they would not be able 
// to create the exact same JWT token as they do not know the secret. 
// sign and not generate 
const token = jwt.sign(value, "secret");


// this token has been created by this secret, hence this token can only be verified by this secret. This is similar to cheque book generator that the bank has. If the bank looses this then there is a problem, any one can regenerate the exact copy of the cheque book. 
console.log(token);


// now while we try to decode it then we can get the information of the value that was used by backend to create the token. But do note that while decoding you do not get back the secret. It is only with the backend. Hence decoding is possible but verifying can only be done by the backend. 


```