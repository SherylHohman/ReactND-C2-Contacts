import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {

  state = {
    contacts : []//,
    // // Temp: use 'state' to conditionally render page of Single Page App
    // // See switchScreenToShow() for valid values:
    // screenToShow: 'List Contacts Page'
  }

  componentDidMount() {
    // fetch our contacts array from our backend DB
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts }) ;          // ES6 syntax
   // this.setState({ contacts: contacts});  // ES5 syntax
    })
  }

  createContact(contact) {
    // send our serialized form data to the Server
    //  using our API, storing it in DB
    // contact comes from CreateContact onhandlesubmit, holds serialized form data
    // response from API contains the new contact
    // add the new contact to state.contacts (via concat)
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => (
        {contacts: state.contacts.concat([ contact ])}
      ));
      // see: the newContact has been added to the database.
      console.log(this.state);
    })
  }

  removeContact = (contact) => {
    this.setState( (prevState) => ({
      contacts: prevState.contacts.filter((contacts_old) => (
        contacts_old.id !== contact.id
      ))
    }) );
    // .. and delete this removed contact from backend database, using API
    ContactsAPI.remove(contact);
  }

  // switchScreenToShow = () => {
  //   // const validScreens = ['List Contacts Page', 'Create Contact Page', 'create-contact'];
  //   const validScreens = ['/', 'create-contact', 'invalidUrl-404'];
  //   const curIndex = validScreens.indexOf(this.state.screenToShow);
  //   // notice: if curIndex == -1, validScreens[0] will become the new page

  //   // cycle through all validScreens in order listed
  //   const newIndex = (curIndex + 1) % validScreens.length;
  //   const newScreen = validScreens[newIndex];
  //   this.setState({screenToShow: newScreen})
  //   // added when implemented <Route>, so we can see that 'Switch Page'
  //   //    *does* still change state.screenToShow, even though
  //   //    screenToShow NO Longer Determines what page Components to Render.
  //   //    .. that's controlled by the URL via Router, which now "owns" these
  //   //      "child" components.  Note, <button> itself always renders, as it's
  //   //      "IN" <App /> render method.  but
  //   //      "OUTSIDE" all <App/>'s <Router> components
  //   //  WE don't fmanually control the URL "state" <BrowserRouter> Does.
  //   console.log(this.state.screenToShow);
  // };

  render() {
    return (
      <div>

        {/* conditionally render "page" based on state*/}
        {/* add PROP "onAddContact" (func defined inline), so
              ListContacts can change state, hence navigate to
            '  Add Contact Page', via link near its Search Bar
            (L5 2.DynamicallyRenderPages, video2)
        */}
        {/* This gets replaced with the below Route
        {this.state.screenToShow==='List Contacts Page' && (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
            onAddContact={() => {
              this.setState({screenToShow: 'Create Contact Page'});
            }}
          />
        )}
        */}

        <Route exact path="/" render={() => (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
          />
        )} />

        {/* Replace the following with Router to render the same */}
        {/*
          {this.state.screenToShow==='Create Contact Page' && (
            <CreateContact />
          )}
        */} {/*
        <Route path="/create-contact"
               component={CreateContact}
        />*/}

        {/* Refactor component to specify render method so we can pass props for handling the New Contact Data*/}
        <Route path="/create-contact" render={( { history } )=>(
          <CreateContact
            onCreateContact={(newContact) => {
              this.createContact(newContact);
              // return to home page: newContact is now in the contacts lis 
              history.push('/');
            }
          }/>
        )}/>
        {/* contact is what we Get BACK from CreateContact,
              which is who calls this.createContact.
            Although it looks like we are "sendinf" contact (which would be confusing because we have No contact variable here..!)
          renaming to newContact, for clarification - avoid confusion, while I get accostomed to where is coming from
        */}



        {/* NOTICE: Following onClick handler NO LONGER Works
              as ROUTE, NOT state.screenToShow,
              controlls what screens/components to RENDER
            Not sure if I've got that *quite* right: as the BUTTON
              correctly renders on both pages, as Expected..
              BUT.. the onClick handler does NOT cause the screen to change.
              .. well, yeah, the URL (which is NOT changed in my handler)
                  is what triggers a re-render. *IT* is the single source of truth to determine what gets RENDERED. It is the equivalent of "STATE".  So, Yes, Button Renders.  But changing the state.screenToShow, does NOT control which ROUTE Components
                  (and hence which "child?" Components (ListContacts vs CreateContact) is Rendered !)
                In DevTools: React, click on <App> Component.
                  Here we can see that state.screenToShow DOES change
                    when "Switch Pages" is clicked on.
                  When clicking on a Child Component of App, we do NOT see
                    state.screenToShow, as that is NOT passed into any of
                    App's child components
                    In contrast, ListComponents does pass this.state.contacts,
                      so it has an Props.contacts. And IT has state.query.
              All Right, I think I *mainly* understand this.  Leave comments here for a little while, until it Fully sinks into gray matter, and fully becomes obvious to me.
              Also.. until I can/know how to code a solution that performs the same function that this does.
              Yes! - this functionality is NO longer NEEDED.  It's for Learning and Comphrehension purposes. So I can Viserally See how the code *would* translate.
        */}
        {/* button to auto swap which "page" user sees */}
        {/* <button onClick={()=>this.switchScreenToShow()}>Switch Pages</button> */}
        {/*
        */}

        {/* Note, this does not have the same "cyclic" functionality as
              The Previous Button I had.
            I had Trouble getting the current
              "pathname" (history, location, context, or whatever
              into my new onclick handler for that button.
            Abandoned after a day of no success.
            Look at branch L5_ReactRouter_issue_cantRef_pathname_in_clickHandler
            to see the abandoned code, remenants of many attempts,
            and comments about it.  Lot's of code there is commented out.
        */}
        {/* This version is simplified: adds a button for the home page only*/}
        {/* Since I want this button always visible, I left "path" parameter? off
            .. or I could have set path="/", and leave off "exact" param?
        */}

        {/* Remove Home button now that Add Contact Page has been made
        <Route path="/" render={() => (
            <Link to="/"><button>Home Page</button></Link>
        )}/>
        */}

     </div>
    );
  }
}

export default App;
