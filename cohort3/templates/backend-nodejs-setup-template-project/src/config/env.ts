// define here the environment variables
// do note that we will be using the zod validation for the environment
// variables as well 
import z from "zod"

// all the environment variables will be kept here for this purpose
// this basically make sures that all the necessary environment variables 
// should be defined here. 
// If the zod marks a field as necessary then the app will crash at the 
// startup itself 
const envSchema = z.object(
    {
        DATABASE_URL : z.string(), 
        PORT : z.string().optional(),
    }
) ;

export const ENV = envSchema.parse(process.env);