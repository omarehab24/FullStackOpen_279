import { useContactDeletion } from "../../hooks/useContactDeletion";

export const ContactItem = ({ contact, setContacts, setNotification }) => {
  const { deleteContact } = useContactDeletion(setContacts, setNotification);

  return (
    <li className="contact-item">
      <span className="contact-info">
        {contact.name} {contact.number}
      </span>
      {" "}
      <button 
        onClick={() => {
          deleteContact(contact);
        }}
        className="delete-button"
      >
        delete
      </button>
    </li>
  );
};
