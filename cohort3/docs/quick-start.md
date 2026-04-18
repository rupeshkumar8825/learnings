# Quick start — Node.js (TypeScript)

**Last updated:** 2026-01-15
**Prerequisites:** Git, Node (18.x), pnpm (recommended) or npm, Docker (optional)

## Steps

1. Clone and open folder

```bash
git clone <repo-url>
cd nodejs/examples/minimal-app
```

Install dependencies
# recommended
pnpm install

# fallback
npm install
Create env file
cp .env.example .env

# edit .env if necessary
Run dev server
pnpm dev
# or

npm run dev
Expected output: Server listening on http://localhost:3000.
Run tests (if provided)
pnpm test
Build and run production image
pnpm build
pnpm start
Troubleshooting:
If port in use → change PORT in .env
If DB connection fails → verify DATABASE_URL and that Postgres is running (see docker-compose)
Dev tips:
Use VS Code Recommended Extensions such as ESLint, Prettier, TypeScript Hero
Use pnpm dlx to run one-off tools


# Setting up the Nodejs backend project using TS
This explains how to quickly get started with the NodeJS with TS based backend 
project.

## Prerequisites

Ensure the following tools are installed on your system:

- Node.js (LTS version recommended)
- npm or yarn
- Git
- Code editor (VS Code preferred)

Verify installation:

```bash
node -v
npm -v
git --version
```


## Step 1 : Initializing the project commands
```bash
mkdir node-ts-backend
cd node-ts-backend
git init
npm init -y 
npm install -D typescript ts-node nodemon
npm install -D @types/node
npx tsc --init
```

## Step 2 : Update the tsconfig.json file
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  }
}
```


## Step 3 : Ensure the Folder Structure as follows
The ideal folder structure for the NodeJS project is as follows: 

``` txt
node-ts-backend/
├── src/
│   ├── index.ts
│   ├── app.ts
│   ├── config/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── middlewares/
│   └── utils/
├── dist/
├── .env
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## Step 4 : Installation of Runtime Dependencies
``` bash
npm install express
npm install -D "@types/express"
```


## Step 5 : Creating Entry Files 
This will include creation of the index.ts, app.ts and may server.ts as well 
Lets see the contents of the files in detail


### src/index.ts
``` ts
import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### src/app.ts
``` ts
import express from "express";

const app = express();


app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});

export default app;

```

## Step 6 : Environment Variales Setup 
Install dotenv:
```bash
npm install dotenv
```

Create .env file at project root:
```bash
PORT=3000
NODE_ENV=development
```


Create .env.example:
``` bash
PORT=
NODE_ENV=
Load environment variables in src/index.ts:
import "dotenv/config";
```


## Step 7 : Configure Scrips in package.json
Update package.json
``` json
{
  "scripts": {
    "dev": "nodemon --watch src --exec ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```


## Step 8 : Run the Project 
Development mode:
``` bash
npm run dev
```
Build project:
```bash
npm run build
```
Production run:
``` bash
npm start
```


# Setting up Prisma ORM

This section explains how to set up Prisma ORM in a Node.js backend project using TypeScript.

---

## Step 9.1 : Install Prisma Dependencies

Install Prisma CLI and Prisma Client.

```bash
npm install -D prisma
npm install @prisma/client
```

## Step 9.2 : Initialize Prisma
Initialize Prisma in the project root directory.
```bash
npx prisma init
```

This will create the following structure:
``` txt
prisma/
└── schema.prisma
.env
```

## Step 9.3 : Configure Database Connection
Update the .env file with the database connection string.
Example for PostgreSQL:
``` bash
DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"
```

Ensure the database server is running before continuing.

## Step 9.4 : Update Prisma Schema Configuration
Open prisma/schema.prisma and configure it as follows:
``` json
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## Step 9.5 : Create First Prisma Model
Add a sample model inside schema.prisma.
``` json
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Step 9.6 : Run Database Migration
Create and apply the migration.
``` bash
npx prisma migrate dev --name init
```
This will:
* Create database tables
* Generate Prisma Client
* Create migration files

## Step 9.7 : Generate Prisma Client (If Needed)
Prisma Client is generated automatically during migration.
To generate it manually:
```bash
npx prisma generate
```

## Step 9.8 : Create Prisma Client Instance
Create a reusable Prisma client instance.
File: src/config/prisma.ts
``` ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
```

## Step 9.9 : Use Prisma in Application Code
Example usage of Prisma inside a service or controller file.
File: src/services/user.service.ts
``` ts
import prisma from "../config/prisma";

export const getAllUsers = async () => {
  return prisma.user.findMany();
};

export const createUser = async (email: string, name?: string) => {
  return prisma.user.create({
    data: {
      email,
      name,
    },
  });
};
```
## Step 9.10 : Graceful Prisma Shutdown
Ensure Prisma disconnects properly when the server shuts down.
Update src/index.ts:
``` ts
import "dotenv/config";
import app from "./app";
import prisma from "./config/prisma";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  server.close(() => {
    process.exit(0);
  });
});
```
## Step 9.11 : Prisma Studio (Optional)
Launch Prisma Studio to view and manage data visually.
``` bash
npx prisma studio
```
Prisma Studio runs at:
http://localhost:5555

## Step 9.12 : Prisma and Git Configuration
Ensure .env is ignored in .gitignore.
.env
Prisma schema and migration files should be committed to Git.



# Setting up PostgreSQL locally 
Generally for the projects we take the cloud hosted posgresql server. But for that we need to take the free tier. Instead of doing that, for better learning purposes, we should try setting up postgresql locally and then we should use that for our local projects. 

This section tells about how to setup the postgesql locally on developers laptop. 

## Steps to setting it up
Following are the detail steps to be able to download the postgres and also the pgadmin GUI for easy interaction with our database for this purpose. 

### 1. Install PostgreSQL
Mac (your case)
``` bash
brew install postgresql
brew services start postgresql
```

Verify:
``` bash
psql --version
```


### 2. Setup Database & User
Open terminal:
``` bash
psql postgres
```

Inside psql:
``` SQL
CREATE ROLE rupesh WITH LOGIN PASSWORD 'password123';
ALTER ROLE rupesh CREATEDB;

CREATE DATABASE myapp_db OWNER rupesh;
```


Exit: In order to exit from the postgres terminal we can use the following command.
``` bash
\q
```


### 3. Install pgAdmin (GUI)
Download from official site:
👉 https://www.pgadmin.org/download/

Configure pgAdmin
Step 1: Open pgAdmin
You’ll set a master password (this is for pgAdmin, not DB).

Step 2: Add Server
Right-click → Register → Server
Fill:
General tab
Name: Local Postgres
Connection tab
Host: localhost
Port: 5432
Username: rupesh
Password: password123
Click Save


### 4. Setup Prisma in Your Project
Inside your Node.js project:
``` bash
npm init -y
npm install prisma --save-dev
npm install @prisma/client
```

Initialize Prisma
``` bash
npx prisma init
```
This creates:
``` bash
prisma/
  schema.prisma
.env
```

### 5. Configure Database Connection
Open .env:
``` bash
DATABASE_URL="postgresql://rupesh:password123@localhost:5432/myapp_db"
```

### 6. Define Your First Model
Open prisma/schema.prisma
``` ts
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
}

```


### 7. Run Migration (Creates Tables)
``` bash
npx prisma migrate dev --name init
```

This does 3 things:
Creates table in PostgreSQL
Generates Prisma client
Tracks migration

Verify in pgAdmin

Go to:
Servers → Databases → myapp_db → Schemas → public → Tables
You’ll see User table 🎯


### 8. Use Prisma in Code
Create a simple file:
``` ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Rupesh",
      email: "rupesh@example.com",
    },
  });

  console.log(user);
}

main();
```

Run:
``` bash
npx ts-node index.ts
```


### 9. Open Prisma Studio (GUI for Data)
``` bash
npx prisma studio
``` 
This gives you a mini admin panel.

### 10. Workflow You Should Follow
This is important for real projects:
Step 1: Update schema
``` ts
model Post {
  id    Int    @id @default(autoincrement())
  title String
}
```

Step 2: Run migration
``` bash
npx prisma migrate dev --name add_post
```

Step 3: Use in code


### 11. Common Errors (You WILL Face These)
❌ "P1001: Can't reach database"
PostgreSQL not running
❌ Authentication failed
Wrong username/password
❌ Port issue
Ensure 5432
❌ Prisma not updated
npx prisma generate



### 12. Common PSQL commands to be used to get started. 
Use psql:
``` bash
psql -U postgres -h localhost -p 5432
```

It will prompt:
Password: postgres
If successful, you’ll see:
``` bash
postgres=#
```

That means you're inside the PostgreSQL shell.
#### 2. List All Databases
Inside psql, run:
``` bash
\l
or
\list
```

You’ll see something like:
   Name      |  Owner
-------------+----------
 postgres    | postgres
 myapp_db    | postgres
 template0   | postgres
 template1   | postgres
#### 3. Connect to a Specific Database
``` bash
\c myapp_db
```
After this, prompt changes:
``` bash
myapp_db=#
```
Now you're inside that database.

#### 4. List All Tables in That Database
``` bash
\dt
``` 

Example output:
 Schema |  Name   | Type  | Owner
--------+---------+-------+--------
 public | User    | table | postgres


#### 5. Describe a Table (Very Useful)
``` bash
\d User
``` 

Shows columns, types, constraints.
#### 6. See Data Inside Table
``` bash 
SELECT * FROM "User";
``` 
⚠️ Important:
Prisma uses "User" (capital U)
PostgreSQL is case-sensitive when quoted
#### 7. Full Flow (Quick Summary)
``` bash
psql -U postgres -h localhost -p 5432
``` 
Then inside:
``` bash
\l              -- list databases
\c myapp_db     -- connect to db
\dt             -- list tables
\d User         -- describe table
SELECT * FROM "User";
```


## References for Postgresql
Below are some of the important links related to postgresql setting up locally : 
* (Database setup on macos)[https://medium.com/@jade.adams517/postgresql-database-set-up-on-macos-pgadmin-and-postegreapp-7a00b7ca8f9c]
* (Download, Install, and Locally setup Postgresql)[https://talesofdancingcurls.medium.com/how-to-download-install-and-locally-set-up-postgresql-63f9ff4769aa]
* (Settting Up PostgreSQL and pgAdmin Using Docker — on macOS)[https://medium.com/@mateus2050/setting-up-postgresql-and-pgadmin-using-docker-on-macos-66cd7d275328]
