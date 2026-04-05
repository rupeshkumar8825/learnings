# Common Errors and Their Possible Solutions
This will list down all the possible errors that we generally encounter again and again. 
This file will consists of the common errors and resources or steps to solve them.

## Prisma Based Errors
### Error : Getting error: @prisma/client did not initialize yet. Please run "prisma generate" and try to import it again. #19669
This is due to the wrong import itself that i used. Generally the after running the 
``` bash 
npx prisma generate
```
the updated client is generated in ./src/generated file. We need to import the prisma
from there itself.
* [Github Link](https://github.com/prisma/prisma/discussions/19669)