import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = (props) => {
  const [good, neutral, bad, all, average, positive] = props.statistics;

  return (
    <div>
      <StatisticTable value={props.statistics} />
    </div>
  );
};

const StatisticLine = (props) => {
  const { text, value } = props;

  return (
    <p>
      {text} {value}
    </p>
  );
};

const StatisticTable = (props) => {
  const [good, neutral, bad, all, average, positive] = props.value;

  return (
    <table>
      <thead></thead>
      <tbody>
        <StatisticTableRaw text="good" value={good} />
        <StatisticTableRaw text="neutral" value={neutral} />
        <StatisticTableRaw text="bad" value={bad} />
        <StatisticTableRaw text="all" value={all} />
        <StatisticTableRaw text="average" value={average} />
        <StatisticTableRaw text="positive" value={positive} />
      </tbody>
    </table>
  );
};

const StatisticTableRaw = (props) => {
  const { text, value } = props;

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);
  const [showStatistics, setShowStatistics] = useState(false);

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

    // Show Statistics when a button clicked
    setShowStatistics(true);
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
      {showStatistics && (
        <Statistics statistics={[good, neutral, bad, all, average, positive]} />
      )}
    </div>
  );
};

export default App;
