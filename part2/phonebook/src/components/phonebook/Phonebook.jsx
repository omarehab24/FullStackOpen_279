import { useState } from "react";
import { ContactList } from "./ContactList";
import { ContactForm } from "./ContactForm";
import { SearchFilter } from "./SearchFilter";
import { NotificationBanner } from "./NotificationBanner";
import { useNotification } from '../../hooks/useNotification';
import "../../index.css";

const Phonebook = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const { notification, showNotification } = useNotification();

  return (
    <div>
      <h1>Phonebook</h1>
      <NotificationBanner message={notification} />
      
      <SearchFilter 
        value={filter}
        onChange={setFilter}
      />

      <h2>Add a New Contact</h2>
      <ContactForm
        onContactAdded={setPersons}
        existingContacts={persons}
        setNotification={showNotification}
      />

      <h2>Contacts</h2>
      <ContactList
        contacts={persons}
        setContacts={setPersons}
        filter={filter}
        setNotification={showNotification}
      />
    </div>
  );
};

export default Phonebook;
