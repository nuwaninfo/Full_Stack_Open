const PersonForm = (props) => {
  const { handleSubmit, newName, handleName, newNumber, handleNumber } = props;

  return (
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
  );
};

export default PersonForm;
