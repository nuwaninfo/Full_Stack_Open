import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    /*let newPersons = [];
    

    const form = event.target;
    const formData = new FormData(form);

    // Get name as object from namr input field
    const objFRomInput = Object.fromEntries(formData.entries());

    // Check the name being added is already in the array
    const isEqual = persons.some(
      (item) => JSON.stringify(item) === JSON.stringify(objFRomInput)
    );
    if (isEqual === false) {
      console.log("hhhhh");
      newPersons = [...persons, objFRomInput];
    } else {
      alert(`${newName}`);
    }

    setPersons(newPersons);*/

    const newPersons = [...persons, { name: newName }];
    setPersons(newPersons);
    console.log(persons);
  };

  // Get the value of input field
  const handleName = (event) => {
    setNewName(event.target.value);
    console.log(event.target.value);
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
        return <div>{person.name}</div>;
      })}
    </div>
  );
};

export default App;
