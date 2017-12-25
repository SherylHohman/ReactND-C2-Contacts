# Contacts App  
## https://github.com/SherylHohman/ReactND-C2L2-Contacts  
### Udacity's React NanoDegree  
### Part 2 React Fundamentals | Lessons 2 - ??  

#### Lesson 3: Create React App  
`create-react-app contacts` to bootstrap a new React project, configuration free  
`yarn start` to start react server, open browser to view app. Hot Reloading active.  

### Part 3 Managing State  
#### Backend Server for this app is ReactND-C2L2-ContactsBackendServer  
Repo for the Backend Server is https://github.com/SherylHohman/ReactND-C2L2-ContactsBackendServer  
`node server.js` (from ReactND-C2L2-ContactsBackendServer directory)
.. to start Backend Server.  

##### Back-end App server: Accessible on **port 5001** (with node server.js)  

##### Front-end Development server: Accessible on ****port 3000 (with  `yarn start` or `npm start`)  

---

#### Notes
##### Lesson 3, Module 4: Add State To A Component (notes from..)
State
`props` refer to `attributes` from parent components. In the end, props represent "read-only" data that are immutable.

A component's **state**, on the other hand, represents **mutable data** that ultimately affects what is **rendered** on the page. 
**State is managed internally by the component itself** and is meant to change over time, commonly due to user input (e.g., clicking on a button on the page).

How we  encapsulate the complexity of state management to individual components, is by adding an **object** called **`state`** to a `Component` 

        class ComponentName() extends React.Component) {
            state: {
                'name': 'Sheryl'
            }

            render() {
                return (
                    <p> Name: {this.state.name} </p>
                )
            }
        }

Note: the `state` object goes directly inside the *class*, NOT in the *constructor* method.
This is called a `class field`.

Basically, `state` are variables that we want a specific React Component to manage, as these variables represent (changing) data that the Component will be rendering to the UI/screen.

