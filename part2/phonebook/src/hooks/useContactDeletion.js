import nameService from "../services/names";

export const useContactDeletion = (setContacts, setNotification) => {
  const deleteContact = async (contact) => {
    if (!window.confirm(`Delete ${contact.name}?`)) {
      return;
    }

    try {
      await nameService.deleteName(contact.id);
      setContacts(prevContacts => 
        prevContacts.filter(p => p.id !== contact.id)
      );
      setNotification(`Deleted ${contact.name}`);
    } catch (error) {
      setNotification("Contact already deleted");
    }
  };

  return { deleteContact };
};
