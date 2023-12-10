import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleClick = (feedBack) => {
    let updatedGood = good > 0 ? good : 0;
    let updatedNeutral = neutral > 0 ? neutral : 0;
    let updatedBad = bad > 0 ? bad : 0;

    if (feedBack === "good") {
      updatedGood = good + 1;
      setGood(updatedGood);
    } else if (feedBack === "neutral") {
      updatedNeutral = neutral + 1;
      setNeutral(updatedNeutral);
    } else {
      updatedBad = bad + 1;
      setBad(updatedBad);
    }

    const updatedAll = updatedGood + updatedNeutral + updatedBad;

    setAll(updatedAll);
    let updatedAverage = 0;
    updatedAverage =
      (updatedGood * 1 + updatedNeutral * 0 + updatedBad * -1) / updatedAll;
    setAverage(updatedAverage);

    let updatedPositivePersentage = (updatedGood * 100) / updatedAll;
    setPositive(updatedPositivePersentage);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={() => handleClick("good")} text="good" />
        <Button handleClick={() => handleClick("neutral")} text="neutral" />
        <Button handleClick={() => handleClick("bad")} text="bad" />
      </div>
      <h1>statistics</h1>
      <p>
        good {good}
        <br />
        neutral {neutral}
        <br />
        bad {bad}
        <br />
        all {all}
        <br />
        average {average}
        <br />
        positive {positive}
      </p>
    </div>
  );
};

export default App;
