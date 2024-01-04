const Numbers = ({ serchResults, handleDelete }) => {
  return (
    <>
      {serchResults.map((person) => {
        return (
          <div key={person.id}>
            {person.name} {person.number}
            &nbsp;
            <button onClick={() => handleDelete(person.id, person.name)}>
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Numbers;
