# Context 
React is nothing but a sophisticated way of writing the complex and dynamic websites. Under the hood its all HTML/CSS and JS itself. Also the react code gets compiled to the HTML/CSS/JS itself. React code does not go to the AWS or any of the hosted machine for that matter. 
Earlier the facebook people has made the facebook using the HTML/CSS/JS itself. They coded the difficult dynamic websites logics in HTML. Over the time they thought that its getting very difficult to code, manage, add new features of bug fixes into the codebase. Hence they created this react where they build a framework on top of HTML/CSS/JS. 


## State and Components
Facebook developers built react. At the start they noticed that every UI element can be divided into two parts which are known as : 
1. State :- state is a object that represents the current state of the application. It represents the dynamic things in your app (i.e. the things that change). For example the value of the counter. 
2. Component :- How a DOM element should render, given a state is called as component. It is reusable , dynamic, HTML snippet that changes given the state. 

So lets take an example of the counter component. Button is a component. It takes the state(currentCount) as in input and is supposed to render accordingly. 

We can think react as a dom updation engine which takes care of updating the DOM. Basically it calculates the diff between the old state and the new state of the DOM and then update the DOM elements whenever needed. 


## Rendering
A state change triggers a re-render. A re-render represents the actual DOM being manipulated when the state changes. 
You usually have to define all your components once and then all you have to do is update the state of your app. React takes care of re-rendering your app. 


## Code example Under the hood of React 
As we discussed that it consists of state and the component. Now lets try it out how the react would have written the logic under the hood. 
Basically this will consists of the state management and rendering logic too. 
Below is the example code for the same: 

``` html
<!DOCTYPE html>
<html>
    <body>
        <div id="buttonParent">

        </div>
        <script>
            // this is the state variable which will change dynamically
            let state = {
                count : 0
            }

            // click handler
            function onButtonPressed()
            {
                state.count++;
                // since the value has changed lets tell the code 
                // that we have to re-reder the button component 
                // using the new value of the count for this purpose. 
                buttonComponentReRender()
            }

            function buttonComponentReRender()
            {
                document.getElementById("buttonParent").innerHTML = "";
                const component = buttonComponent(state.count);
                document.getElementById("buttonParent").appendChild(button);
            }

            function buttonComponent(count) {
                const button = document.createElement("button");
                button.innerHTML = `Counter ${count}`;
                button.setAttribute("onClick", `onButtonPress()`);
                return button;
            }


            buttonComponentReRender();
        </script>
    </body>
</html>

```

Never do DOM manipulation in react as the whole point of react is to avoid the big codes that performs the DOM manipulation. Except on few cases where DOM manipulation may be necessary otherwise for all types of changes we must use state and components. 

Now the actual implementation of the above feature in react is as follows: 

``` jsx
export default function App()
{
    // define the state for the count 
    const [count, setCount] = useState(0);


    // define the onclickhandler here 
    function onClickHandler(){
        setState(count + 1);
    }

    <div>
        <button id='btn' onClick={onClickHandler}>
        Counter {count}
        </button>
    </div>
}
```

When the user clicks on the button we need to update the count value using the setCount() function itself because then only the react will know that the re-render needs to be done. We cannot just increment the count by using the count++.

# Hooks in React 
Any thing that starts with "use" in react is called as hook. For example useState() is one such hook, useEffect() is an another hook. 

## Lifecycle events 
There are different life cycle events which are : 
1. Mounting 
2. Re-Rendering
3. Unmounting. 

TODO :- Need to explain the above things one by one. 


## useState
useState is a Hook that lets you add state to functional components. It returns an array with the current state and a function to update it. That means it defines the state of the component. Whenever the states changes then we will hvae 



## useEffectHook 
This runs when the react component mounts. Below is an example for this purpose: 
``` jsx
function App()
{
    return <div>
    <Counter></Counter>
    </div>
}


function Counter () {
    const [count, setCount] = useState(0);

    useEffect(function () {
        // this will run only when the component renders for the first time
        setInterval(function () {
            setCount(function(count){
                return count + 1;
            })
        }, 1000);
    }, [])
}
```

Please note that we cannot use the state variable inside the useEffect if that partcular state variable is not present in the dependency array for this purpose. 

TODO :- Explain the relation between the useEffect() hook and different lifecycle of the react components. Also need to mention about the conditional rendering, cleanup, dependency array and unmounting in case of useEffect hook for this purpose. 


## VDOM 
Write some thing here about the virtual dom

## Diffing 
Write some thing about the diffing here for this purpose.

## Bulk Updates 
Write some thing about the bulk updates here for this purpose.

## Reconcilliation 
Write some thind about the bulk updates here for this purpose. 


# Start React APP 
We can do so using the following methods : 
1. Vite :- this is the best build tool till today for initializing the projects locally. 
2. Replit :- to start the project on cloud with setting up anything locally for this purpose.  
3. Create react app :- not recommended anymore.

## Vite React App 
**npm create vite@latest** is the command to start the basic react app project locally. 

### References 
* [Vite Official Documentation](https://vite.dev/guide/)


# Children Component
This is also known as the wrapper component. This is a better to pass the component as props.  The example is as follows: 

``` jsx

function App(){
    return <div style={{display : "flex"}}>
    <Card>
        <div style={{color : "green"}}>
            What do you want to post <br></br>
            <input type={"text"}/>
        </div>
    </Card>
    </div>
}


// now lets pass the html inside the <Card> component as props and then use it for this 
// purpose
function Card({children}){
    return <div style={{background: "red", borderRadius: 10, color: "white", padding: 10, margin: 10}}>
    {children}
    </div>
}

```


# React + Tailwind Project Setup  (Deprecated Steps I think)
Lets see how can we quickly set up the react + tailwind css project in typescript


Here’s the clean, standard way to start a React + TypeScript + Tailwind CSS frontend in 2026: Vite + React + TS + Tailwind.

1) Create the React + TS project (Vite)
``` bash
npm create vite@latest my-frontend -- --template react-ts
cd my-frontend
npm install
```

Run it once to confirm everything works:
``` bash
npm run dev
```

2) Add Tailwind CSS
Install Tailwind + PostCSS + Autoprefixer:
``` bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

This creates:
``` bash
tailwind.config.js
postcss.config.js
```

3) Configure Tailwind paths
Open tailwind.config.js and set content like this:
``` ts
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

```

4) Add Tailwind directives to CSS
Open src/index.css (or src/main.css depending on template) and put:
``` css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Ensure your entry file imports this CSS:
src/main.tsx should have something like:

``` tsx
import "./index.css";
```


# Path A (Recommended): Tailwind v4 + Vite plugin (no init -p)
1) Install Tailwind + the official Vite plugin

From your Vite React TS project root:

npm install tailwindcss @tailwindcss/vite

2) Update vite.config.ts
``` ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```


3) Import Tailwind in your CSS

Open src/index.css (or whatever your main CSS is) and put:
``` ts
@import "tailwindcss";
```
4) Run
``` bash
npm run dev
```

✅ Done. Tailwind should work immediately.

# Setting  Up React + Tailwind + Vite 
Refer to the following blog 
[https://tailwindcss.com/docs/installation/using-vite]





# NPM Install Cheatsheet

## Regular Package
Goes into `dependencies` — needed at runtime.

```bash
npm install axios
npm install axios react-router-dom recoil  # multiple at once
```

---

## Dev Dependency
Goes into `devDependencies` — only needed during development/build, not at runtime.

```bash
npm install -D typescript eslint prettier
npm install --save-dev typescript  # same thing, long form
```

---

## TypeScript Types
Most are dev dependencies since they're only needed at compile time.

```bash
npm install -D @types/react @types/node @types/express
```

> **Note:** Some packages bundle their own types (like `axios`, `recoil`, `react-router-dom`) so you don't need a separate `@types/` package for them. If TypeScript complains about missing types after installing a package, that's when you install the corresponding `@types/` package.

---

## Specific Version

```bash
npm install axios@1.6.0
npm install -D typescript@5.0.0
```

---

## Global Install
Available system-wide as a CLI command.

```bash
npm install -g typescript
npm install -g nodemon ts-node
```

---

## React + TypeScript Project (All at Once)

```bash
# runtime dependencies
npm install react react-dom react-router-dom axios recoil

# dev dependencies
npm install -D typescript @types/react @types/react-dom @types/node vite
```

---

## Express + TypeScript Backend (All at Once)

```bash
# runtime dependencies
npm install express cors dotenv prisma @prisma/client bcryptjs jsonwebtoken

# dev dependencies
npm install -D typescript @types/express @types/node @types/cors @types/bcryptjs @types/jsonwebtoken ts-node nodemon
```

---

## Quick Rule of Thumb

| No `@types/` needed (ships own types) | Needs `@types/` (plain JS packages) |
|---------------------------------------|--------------------------------------|
| `axios`                               | `express`                            |
| `recoil`                              | `node`                               |
| `prisma` / `@prisma/client`           | `cors`                               |
| `react-router-dom`                    | `bcryptjs`                           |
|                                       | `multer`                             |
|                                       | `cookie-parser`                      |

> You can always check on [npmjs.com](https://npmjs.com) — if a package ships its own types it will show a **"TS"** blue badge on the package page.





# React Auth Loading Guard — Notes & Best Practices

---

## The Problem — Unguarded Auth State

When a React app mounts, `useEffect` runs **after** the first render.
This means there is always a brief window where:
- `user = null`
- `isAuthenticated = false`
- `isFetchingUser = false` (if not explicitly set)

...even if the user IS actually logged in and the API just hasn't responded yet.

---

## What Goes Wrong Without a Guard

Consider a user who visits `/cart` directly in the browser.

### Execution flow (no guard):

```
1. App mounts
        ↓
2. CartPage renders immediately
   → user = null
   → isAuthenticated = false
        ↓
3. useEffect fires → fetchUserDetails() starts in background
        ↓
4a. ✅ If user IS logged in:
        API responds → isAuthenticated = true → CartPage re-renders correctly

4b. ❌ If user is NOT logged in:
        Nothing changes → CartPage stays fully visible to an unauthenticated user
```

### The core issue:

> React renders the page **synchronously** before any async work is done.
> By the time `fetchUserDetails()` finishes, the page has already been shown.

This leads to two specific bugs:

**Bug 1 — Flash of wrong content:**
A logged-in user visiting `/cart` sees a blank or "please login" state
for a brief moment before their data loads.

**Bug 2 — Unauthenticated access:**
A user who is NOT logged in can see protected pages like `/cart`, `/orders`, `/payment`
because `isAuthenticated` starts as `false` (not redirecting) and no redirect
ever fires since auth failed.

---

## Why useEffect Runs After Render

```typescript
function App() {
    // Step 1 — this runs synchronously
    const { fetchUserDetails, isAuthenticated } = useAuth();

    // Step 2 — registered but NOT run yet
    useEffect(() => {
        fetchUserDetails(); // this fires AFTER the JSX below is painted
    }, [])

    // Step 3 — React renders this FIRST before any useEffect runs
    return (
        <Routes>
            <Route path='/cart' element={<CartPage />} /> {/* ← already rendered */}
        </Routes>
    )
}
```

This is by design in React — `useEffect` is intentionally deferred to after paint.
It cannot be made `async` directly because an async function always returns a Promise,
and `useEffect` expects either nothing or a cleanup function as its return value.

---

## Previous (Broken) Approaches

### ❌ Approach 1 — No guard at all

```typescript
function App() {
    const { fetchUserDetails } = useAuth();

    useEffect(() => {
        fetchUserDetails()
    }, [])

    return (
        <Routes>
            <Route path='/cart' element={<CartPage />} /> {/* visible to everyone instantly */}
        </Routes>
    )
}
```

**Problem:** No protection whatsoever. Any unauthenticated user can visit `/cart`
directly and the page will render fully before the auth check completes.

---

### ❌ Approach 2 — Checking isAuthenticated without isFetchingUser

```typescript
function App() {
    const { fetchUserDetails, isAuthenticated } = useAuth();

    useEffect(() => {
        fetchUserDetails()
    }, [])

    return (
        <Routes>
            <Route path='/cart' element={
                isAuthenticated ? <CartPage /> : <Navigate to="/" replace />
            } />
        </Routes>
    )
}
```

**Problem:** `isAuthenticated` starts as `false` in the atom's default state.
So on the very first render, even a logged-in user gets redirected to `/`
before `fetchUserDetails` has had a chance to run and confirm they're authenticated.

**What the user sees:**
```
Logged-in user visits /cart
        ↓
isAuthenticated = false (default) → redirected to "/" instantly ❌
        ↓
fetchUserDetails completes → isAuthenticated = true
        ↓
But user is already on "/" — they never got to see /cart
```

---

## The Correct Solution — `isFetchingUser` Guard

### The key insight:

> You need a **third state** beyond just `true` and `false` for `isAuthenticated`.
> You need to know: **"we haven't checked yet"**.
> That is exactly what `isFetchingUser` represents.

### The three states of auth:

| `isFetchingUser` | `isAuthenticated` | Meaning |
|---|---|---|
| `true` | `false` (default) | Still checking — show spinner, render nothing |
| `false` | `true` | Check done — user is logged in |
| `false` | `false` | Check done — user is NOT logged in |

---

### ✅ Correct Implementation

```typescript
function App() {
    const { fetchUserDetails, isFetchingUser, isAuthenticated } = useAuth();
    const { fetchAllProducts, searchFilter } = useProduct();

    useEffect(() => {
        fetchUserDetails();
    }, [])

    useEffect(() => {
        fetchAllProducts(searchFilter);
    }, [])

    // ✅ KEY GUARD — block ALL rendering until auth check completes
    // isFetchingUser starts as false, becomes true inside fetchUserDetails,
    // and goes back to false in the finally block when the API responds
    if (isFetchingUser) {
        return <FullPageSpinner /> // show a spinner, render nothing else
    }

    return (
        <>
            <NavbarLayout />
            <Routes>
                {/* Public routes — accessible to everyone */}
                <Route path='/' element={<HomePage />} />
                <Route path='/products' element={<ProductsPage />} />
                <Route path='/products/:id' element={<ProductDetailsPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/faq' element={<FAQsPage />} />
                <Route path='/contact' element={<ContactPage />} />

                {/* Protected routes — redirect to "/" if not authenticated */}
                <Route path='/cart' element={
                    isAuthenticated ? <CartPage /> : <Navigate to="/" replace />
                } />
                <Route path='/orders' element={
                    isAuthenticated ? <OrdersPage /> : <Navigate to="/" replace />
                } />
                <Route path='/payment' element={
                    isAuthenticated ? <PaymentsPage /> : <Navigate to="/" replace />
                } />

                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </>
    )
}
```

---

### ✅ The `isFetchingUser` flow inside `useAuth`

This is what makes the guard work — the loading flag is set to `true`
at the START of the API call and `false` in the `finally` block:

```typescript
const fetchUserDetails = async () => {
    setIsFetchingUser(true);   // ← triggers spinner in App.tsx
    try {
        const response = await fetchUserDetailsApi();
        setUser(response.user);
        setIsAuthenticated(true);
    } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
    } finally {
        setIsFetchingUser(false); // ← spinner disappears, routes render
    }
}
```

---

### ✅ Step-by-step execution with the guard

```
1. App mounts
        ↓
2. isFetchingUser = false (default in atom)
   → guard does NOT trigger yet
   → BUT fetchUserDetails is called immediately in useEffect
        ↓
3. fetchUserDetails runs:
   → setIsFetchingUser(true)
   → App re-renders
   → isFetchingUser = true → guard triggers → spinner shows
        ↓
4. API call in progress... user sees spinner, no routes rendered
        ↓
5a. ✅ API responds — user IS logged in:
        → setUser(response.user)
        → setIsAuthenticated(true)
        → finally: setIsFetchingUser(false)
        → App re-renders
        → guard no longer triggers
        → routes render
        → isAuthenticated = true → protected pages are accessible

5b. ✅ API responds — user is NOT logged in (401/error):
        → setUser(null)
        → setIsAuthenticated(false)
        → finally: setIsFetchingUser(false)
        → App re-renders
        → guard no longer triggers
        → routes render
        → isAuthenticated = false → protected pages redirect to "/"
```

---

## Summary

| Scenario | Without Guard | With Guard |
|---|---|---|
| Logged-in user visits `/cart` | Flash of wrong state, then correct | Spinner → CartPage immediately |
| Logged-out user visits `/cart` | CartPage visible briefly or permanently | Spinner → redirected to "/" |
| Any user visits `/` | Works fine but products flash empty | Spinner → HomePage with data |
| Page refresh on protected route | Race condition, unpredictable | Always resolves correctly |

---

## Key Takeaways

1. **`useEffect` always runs after render** — you cannot rely on it to determine
   what to render on first mount.

2. **`isAuthenticated = false` is ambiguous** — it means either "not logged in"
   OR "we haven't checked yet". You need `isFetchingUser` to distinguish these.

3. **The guard pattern** — `if (isFetchingUser) return <Spinner />` is the correct
   way to block rendering until async auth state is resolved.

4. **`finally` is critical** — always set your loading flag to `false` in `finally`,
   not in `try` or `catch`. This ensures the spinner always disappears
   regardless of whether the API call succeeded or failed.

5. **Never make `useEffect` async directly** — always define an inner async function
   and call it, or use an IIFE. An async function returns a Promise and `useEffect`
   does not know how to handle a Promise as a return value.