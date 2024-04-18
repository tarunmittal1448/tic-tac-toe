import { useState } from 'react'
import './App.css'

function App() {
  const [mark, setMark] = useState([null,null,null,null,null,null,null,null,null]);
  const [isNext, setIsNext]=useState(true);
  const [winner, setWinner] = useState(null);

  const checkWinner = (marks) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (marks[a] && marks[a] === marks[b] && marks[a] === marks[c]) {
        return marks[a];
      }
    }
    if (!marks.includes(null)) {
      return 'draw';
    }
    return null;
  };

  const clickHandler = (index) => {
    if (winner || mark[index]) return;
    const newMark = [...mark];
    newMark[index] = isNext ? 'X' : 'O';
    setMark(newMark);
    setIsNext(!isNext);
    const result = checkWinner(newMark);
    if (result) {
      setWinner(result);
    }
  }

  const renderButton = (index) => {
    return (
      <button onClick={() => clickHandler(index)} style={{ width: "50px", height: "50px", border: "1px solid white", verticalAlign: "top", backgroundColor:"black", color:"white"}}>
        {mark[index]}
      </button>
    );
  }

  const renderStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (!mark.includes(null)) {
      return 'Draw';
    } else {
      return `Next player: ${isNext ? 'X' : 'O'}`;
    }
  }

  return (
    <>
      <div>
        {renderButton(0)}
        {renderButton(1)}
        {renderButton(2)}
      </div>
      <div>
        {renderButton(3)}
        {renderButton(4)}
        {renderButton(5)}
      </div>
      <div>
        {renderButton(6)}
        {renderButton(7)}
        {renderButton(8)}
      </div>
      <div>{renderStatus()}</div>
    </>
  );
}

export default App;
