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


...


#### React LifeCycle Events
##### Adding to the DOM
These lifecycle events are called when a component is being added to the DOM:

**Mount** means **Render**
" componentWillMount is called *after* it's been *rendered* to the DOM"
**Ajax Requests** go in **componentWillMount()**

constructor()
componentWillMount()    **Ajax Requests**
render()
componentDidMount()

##### Re-rendering
These lifecycle events are called when a component is re-rendered to the DOM

componentWillReceiveProps()
shouldComponentUpdate()
componentWillUpdate()
render()
componentDidUpdate()

##### Removing from the DOM
This lifecycle event is called when a component is being removed from the DOM

componentWillUnmount()

----
#### React Router  

##### install history and React Router DOM (vs native)
react-router-dom


##### BrowserRouter Component 
It Listens for Changes in the URL (browser address bar)
  and makes sure that the right screen shows up
Allows Address Bar navigation to work as expected.

All that needs to be done with BrowserRouter is to:   
- import it into root of app (index.js)
`import { BrowserRouter } from react-router-dom`
- surround root Component of app (<App />) with <BrowserRouter></BrowserRouter>
`<BrowserRouter><App /></BrowserRouter>`  

That: 
- sets up the file to be able to work with all the other (React-Router) Components that will be installed later. 
- listens to the URL and Notifies the other React-Router Components when it changes. 
- allows URL routing from browser/address bar to work as expected.

It works by creating a `history` object. and returning a `<Router>` component with that `history` object as props.  This way every component has access to the browser's history.

`history` object allows for management of: history stack, navigate, confirm navigation, and persist state between sessions, via its API.

Some code straight from the React Router repository:
```
class BrowserRouter extends React.Component {
  static propTypes = {
    basename: PropTypes.string,
    forceRefresh: PropTypes.bool,
    getUserConfirmation: PropTypes.func,
    keyLength: PropTypes.number,
    children: PropTypes.node
  }

  history = createHistory(this.props)

  render() {
    return <Router history={this.history} children={this.props.children}  />
  }
}
```

