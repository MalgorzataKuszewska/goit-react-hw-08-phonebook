import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, addContact, deleteContact } from 'redux/ContactsSlice';
import { setFilter } from 'redux/FilterSlice';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from 'components/Navigation/Navigation';
import Register from 'components/Register/Register';
import Login from 'components/Login/Login';
import Contacts from 'components/Contacts/Contacts';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.data);
  const filter = useSelector(state => state.filter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value.toLowerCase()));
  };

  const handleAddContact = newContact => {
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <Router>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          fontSize: 24,
          color: '#010101',
        }}
      >
        <Navigation />
        <Switch>
          <Route
            path="/register"
            render={() => <Register handleFilterChange={handleFilterChange} />}
          />
          <Route
            path="/login"
            render={() => <Login handleFilterChange={handleFilterChange} />}
          />
          <Route
            path="/contacts"
            render={() => (
              <Contacts
                handleFilterChange={handleFilterChange}
                contacts={filteredContacts}
                onAddContact={handleAddContact}
                onDeleteContact={handleDeleteContact}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
