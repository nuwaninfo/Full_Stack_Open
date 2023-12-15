import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((item) => (
        <Part key={item.id} part={item} />
      ))}
    </>
  );
};

export default Content;
