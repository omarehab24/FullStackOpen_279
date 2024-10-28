import { useEffect } from "react";
import nameService from "../../services/names";
import { ContactItem } from "./ContactItem";

export const ContactList = ({ 
  contacts, 
  setContacts, 
  filter, 
  setNotification 
}) => {

  useEffect(() => {
    nameService.getAll()
      .then(loadedContacts => setContacts(loadedContacts))
      .catch(() => setNotification("Error loading contacts"));
  }, []);

  const filteredContacts = filter
    ? contacts.filter(contact => 
        contact.name.toLowerCase().includes(filter.toLowerCase()))
    : contacts;

  return (
    <ul>
      {filteredContacts.map(contact => (
        <ContactItem
          key={contact.id}
          contact={contact}
          setContacts={setContacts}
          setNotification={setNotification}
        />
      ))}
    </ul>
  );
};
