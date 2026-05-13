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


# React + Tailwind Project Setup 
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


Path A (Recommended): Tailwind v4 + Vite plugin (no init -p)
1) Install Tailwind + the official Vite plugin

From your Vite React TS project root:

npm install tailwindcss @tailwindcss/vite

2) Update vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});

3) Import Tailwind in your CSS

Open src/index.css (or whatever your main CSS is) and put:

@import "tailwindcss";

4) Run
npm run dev

✅ Done. Tailwind should work immediately.
