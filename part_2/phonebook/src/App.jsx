import { useState } from "react";

let nextId = 0;

const App = () => {
  let filteredPerson = [];
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567", id: nextId },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState([]);
  const [serchResults, setSearchResults] = useState(persons);

  const handleSubmit = (event) => {
    event.preventDefault();
    let newPersons = [];

    const newObj = { name: newName, number: newNumber, id: nextId + 1 };

    // Check the name being added is already in the array
    const isEqual = persons.some(
      (item) => JSON.stringify(item) === JSON.stringify(newObj)
    );
    if (isEqual === false) {
      newPersons = [...persons, newObj];

      setSearchResults(newPersons);
      setPersons(newPersons);
    } else {
      alert(`${newName} is already added to phonebook`);
    }

    // Clear text fields
    setNewName("");
    setNewNumber("");

    nextId = nextId + 1;
  };

  // Get the value of name
  const handleName = (event) => {
    setNewName(event.target.value);
  };

  // Get the value of input number
  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  // Fliter name in case insensitive
  const handleFilter = (event) => {
    const inputName = event.target.value;
    setFilterName(inputName);

    filteredPerson = persons.filter((person) =>
      person.name.toLowerCase().includes(inputName.toLowerCase())
    );

    setSearchResults(filteredPerson);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={filterName} onChange={handleFilter} />
      </div>
      <h2>Add a new</h2>
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
      {serchResults.map((person) => {
        return (
          <div key={person.id}>
            {person.name} {person.number}
          </div>
        );
      })}
    </div>
  );
};

export default App;
