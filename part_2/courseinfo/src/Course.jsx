import Header from "./Header";
import Total from "./Total";
import Content from "./Cotent";

const Course = (props) => {
  const { name, parts } = props.course;

  const sum = parts.reduce((a, b) => a + b.exercises, 0);

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total sum={sum} />
    </div>
  );
};

export default Course;
