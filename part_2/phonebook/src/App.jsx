import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm ";
import Numbers from "./Numbers";
import axios from "axios";
import phoneBookService from "./services/phonebook_service";

let nextId = 0;

const App = () => {
  let filteredPerson = [];
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState([]);
  const [serchResults, setSearchResults] = useState(persons);

  useEffect(() => {
    phoneBookService.getAll().then((intialPersons) => {
      setSearchResults(intialPersons);
      setPersons(intialPersons);

      const lastPerson = intialPersons[intialPersons.length - 1];
      nextId = lastPerson.id + 1;
    });
  }, []);

  // Handle Add button
  const handleSubmit = (event) => {
    event.preventDefault();
    let newPersons = [];

    const newObj = { name: newName, number: newNumber, id: nextId + 1 };

    const matchingObjects = persons.filter(
      (obj) => obj["name"].toLowerCase() === newName.toLowerCase()
    );
    const exists = matchingObjects.length > 0;

    if (exists === false) {
      newPersons = [...persons, newObj];

      phoneBookService.create(newObj).then((returnedPerson) => {
        newPersons = persons.concat(returnedPerson);
        setSearchResults(newPersons);
        setPersons(newPersons);
      });
    } else {
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (result === true) {
        phoneBookService
          .updatePhoneBook(matchingObjects[0].id, newObj)
          .then((updatedPerson) => {
            // update the new number in the screen
            const updatedData = persons.map((item) => {
              if (item.id === matchingObjects[0].id) {
                return { ...item, number: updatedPerson.number };
              }
              return item;
            });
            setSearchResults(updatedData);
            setPersons(updatedData);
          });
      }
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

  // Handle Delete functionality
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phoneBookService.deletePerson(id).then((deletedPerson) => {
        const personsAfterDelete = persons.filter((person) => person.id !== id);
        setPersons(personsAfterDelete);
        setSearchResults(personsAfterDelete);
      });
    }
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
      <Numbers serchResults={serchResults} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
