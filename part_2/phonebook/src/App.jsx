import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let newPersons = [];

    const newObj = { name: newName, number: newNumber };

    // Check the name being added is already in the array
    const isEqual = persons.some(
      (item) => JSON.stringify(item) === JSON.stringify(newObj)
    );
    if (isEqual === false) {
      newPersons = [...persons, newObj];

      setPersons(newPersons);
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  // Get the value of name
  const handleName = (event) => {
    setNewName(event.target.value);
  };

  // Get the value of input number
  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form method="post" onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          Numbers: <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        );
      })}
    </div>
  );
};

export default App;
