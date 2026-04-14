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
            let state = {
                count : 0
            }

            function onButtonPressed()
            {
                state.count++;
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