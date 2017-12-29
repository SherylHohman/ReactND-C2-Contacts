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

##### Link Component

How the user navigates through the app, via clicking on LINKS.

When a link is clicked, `<Link />` component talks to `<BrowserRouter>`, telling it to update the URL (browser address bar).

It supports RIGHT CLICKING to open in tab, and keyboard navigation too !

`<Link>` component compiles down to proper `<a>` anchor tags.
`to` corresponds to the anchor tag's `href` attribute.

To use:
- replace anchor tags with Link Components:  
- add a `to` property to `<Link>` Component with the desired `url`  
  (ie `href`value)


query string paramaters, and `state` can also be passed to the Linked "page", by providing an (?attriputes, paramaters ?) as an Object to the `to` paramater, as follows:  

```
<Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: { fromDashboard: true }
}}>
  Courses
</Link>
```

React Router provides a Link component which allows you to add declarative, accessible navigation around your application. 
> You'll use it in place of anchor tags (`a`) that you're typically used to. 

React Router's <Link> component is a great way to make navigation through your app accessible for users. 
Passing a to prop to your link, for example, helps guide your users to an absolute path (e.g., /about):

`<Link to="/about">About</Link>`

Since the `<Link>` component fully renders a proper anchor tag (`<a>`) with the appropriate `href`, you can expect it to behave how a normal link on the web behaves.  


##### Route Component

`<Route>` renders some UI, **if** its URL matches the App's new URL.  
    - in this way, it removes the need for conditional rendering that *we* had in our implementation of component rendering based on 'state`
    - it aslo (obviously) removes teh need for a state variable, as it uses the `path="/myPageURL"` instead of `state.screenToShow`
    - `render={() => (<myPageComponent prop1="prop1" prop2="prop2" />)}`
      replaces the need for "conditional rendering" syntax to indicate what components are to be rendered
      - Notice: **Component JSX** is used here: `<myPageComponent .../>` vs `{myPageComponent}`
    - if there is only 1 component to be rendered, and it needs NO props,      `component={myPageComponent}` property/attribute can be used instead of    `render`
      - Notice: just the *name** of the component, ***NOT the Component JSX*** is used in this case: **{myPageComponent}** vs `<myPageComponent/>`

`<Route>` component PROPS 
    - path="" the url/page/webpage this Route "responds to"
    - component={} the component that this Route Renders 
      * (use this attribute *ONLY* IF NO PROPS are to be passed to the component)
    - render={() => ()} if the Component(s) need to pass PROPS
      * (Must use this attribute instead, have more than 1 component to render, and/or need to pass PROPS to the component/page/view)
      * Can always use this attribute/syntax instead of the simplifed component= attribute.

For example:

- syntax: NO props are passed to `CreateContact` component 
- (and only 1 component)
`<Route path="/create" component={CreateContact}/>`  

- syntax: props ARE passed to `ListContacts` component 
- (and/or more than 1 component)
```
 <Route exact path="/" render={() => (
    <ListContacts
      contacts={this.state.contacts}
      onDeleteContact={this.removeContact}
    )}/>
```
- syntax (probably) if more than one component is rendered

This essentially performs the same task that we Manually did earlier, when we used `state` (I named it `state.screenToShow`).

But, instead of managing and checking against a `state` variable, it uses `the url`.  I believe `<BrowserRouter>` is in charge of controlling/updating (?and storing?) the current `url`.  

`history` probably has something to do with this as well.

`<Route>` is the piece that makes the <kbd>Back</kbd> Button Work !!

NOTE: `path='/some-path'` *will match on Partial Matches*  property of the current'url'  
use `exact` (property/ qualifier / paramater / prop) to force a *Match* only the exact url.

For example, if the current page URL is `/help` 
(in the browser address bar for the page that's to be displayed),
and we have the following Routes defined:
 - `<Route path="/">`     (Components for "/" url are controlled/rendered by this Route)
 - `<Route path="/help">` (Components for "/help" url are controlled/rendered by this Route)
 - 
then Both Routes are either *Partial* or *exact* matches to the current URL.
So, All Components *from Both Routes* are *rendered*!  
  ie: both "pages" would render, one below the other, 
(assuming we're talking about an SPA, where each Route renders components for a specific "page")



If the route matches a URL, React will Render some UI

This piece is what makes the "Back Button" work !

Route component decides which components are rendered based on the current URL path

#### Serializing Form Data

Native functionality of HTML Forms is that when the form Button is clicked,
the Browser 
  * takes the input paramaters from the `<input>` fields, and 
  * encodes that data (aka "serializes the form"), 
  * appends it to the current URL, 
  * updates the URL in the browser address bar, and
  * "sends" the resulting request back to the server, which also
  * causes a page reload.

In our case, our form has 3 input fields: avatarURL, name, email
This is what `http://localhost:3000/create-contact` becomes after `Add Contact` is clicked
`http://localhost:3000/create-contact?avatarURL=&name=Hello&email=myEmail@u.com`
And then the page undergoes a fresh Page Reload from the Server.

##### For SPA's we want to override this behaviour
Prevent Default

Prevents the Browser from taking over the form when it gets submitted.
Lets us control that ourselves.

We need to add an `onSubmit` handler to our `<form>` tag.
add a "handler" method to the component that calls `preventDefault`

```
class CreateContact extends Component {
    handleSubmit = (event) => {
        e.preventDefault();
       
        // add custom form handling code here
        ...
            // (event.target is the form itself)
    }

    render() {
        return{
    
            <form onSubmit={this.handleSubmit}>
             ...   
            </form>
        }
    }
}
```


`form-serialize` package to Serialize the data ourselves, 
  stored into a JS variable.  
Use that serialized URL, and our contacts API, to communicate with our backend server, and store that data in our database.
Our App saves the data, and adds it into our state.

`const values = serializeForm(event.target, {hash:true})`
To store the form data as an Object, use paramater `{hash:true}`

#### `history`, `history.push`, and forcing a page "reload" - page change 

Changing URL's programatically (in contrast to user initiated via <Link>)

Load home page after new contact is added

- L5_ReactRouter, 6.Finish the Contact Form, 
    Vid-3: Update Server With New Contact

<Route>'s property `render()` for CreateContact page/component
  now takes in `history` object, that is a `prop` on <Route>.
Now, that `history` object is accessible to it's child components,
  <CreateContact> in our case.
Since the component has access to it, it's props have access to `history`
Namely, the `onCreateContact` property
  which means I can access `history` inside the `onCreateContact` inline function
`history.push("/")` pushes the home page url into the `history` object,
  which updates App's state (or BrowserHistory state ?),
  triggering an App re-render.
At re-render, the last item in the history object becomes the 
  "current URL" in the browser (in the App),
Since we have effectively changed the URL, in this way, 
  App Route components re-render, 
  changing the screen/page to show "/" ListContacts screen
..and since contacts has been updated, with the "newly created contact",
  we see that it has successfully been added to the DB.


