import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm ";
import Numbers from "./Numbers";
import axios from "axios";

let nextId = 0;

const App = () => {
  let filteredPerson = [];
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setSearchResults(response.data);
      setPersons(response.data);
      nextId = response.data.length;
    });
  }, []);

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
      <Filter filterName={filterName} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleName={handleName}
        newNumber={newNumber}
        handleNumber={handleNumber}
      />
      <h3>Numbers</h3>
      <Numbers serchResults={serchResults} />
    </div>
  );
};

export default App;
