import { useState } from "react";
import nameService from "../../services/names";
import { generateId } from "../../services/random";


export const ContactForm = ({ onContactAdded, existingContacts, setNotification }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!name || !number) {
      setNotification("Name or number cannot be blank");
      return;
    }

    if (existingContacts.some(contact => contact.number === number)) {
      setNotification("Number already exists");
      return;
    }

    try {
      const newContact = await nameService.create({ 
        name, 
        number,
        id: generateId()
      });
      
      onContactAdded(prevContacts => [...prevContacts, newContact]);
      setNotification(`Added ${newContact.name}`);
      setName("");
      setNumber("");
    } catch (error) {
      setNotification("Error adding contact");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="number">Number:</label>
        <input
          type="tel"
          id="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Contact</button>
    </form>
  );
};