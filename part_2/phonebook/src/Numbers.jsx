const Numbers = ({ serchResults }) => {
  return (
    <>
      {serchResults.map((person) => {
        return (
          <div key={person.id}>
            {person.name} {person.number}
          </div>
        );
      })}
    </>
  );
};

export default Numbers;
