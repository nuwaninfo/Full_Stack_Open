import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let newPersons = [];

    const newNameObj = { name: newName };

    // Check the name being added is already in the array
    const isEqual = persons.some(
      (item) => JSON.stringify(item) === JSON.stringify(newNameObj)
    );
    if (isEqual === false) {
      newPersons = [...persons, newNameObj];
      setPersons(newPersons);
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  // Get the value of input field
  const handleName = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form method="post" onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return <div key={person.name}>{person.name}</div>;
      })}
    </div>
  );
};

export default App;
