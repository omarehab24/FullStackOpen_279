export const SearchFilter = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="contact-filter">Filter contacts: </label>
      <input
        id="contact-filter"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search contacts..."
      />
    </div>
  );
};
