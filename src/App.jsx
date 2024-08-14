import { useState } from 'react'
import './App.css'

function App() {
  const [mark, setMark] = useState([null,null,null,null,null,null,null,null,null]); // saare null boxes h total 9
  const [isNext, setIsNext]=useState(true); //next turn k liye use kr rhe h hum
  const [winner, setWinner] = useState(null); // winner h ki nhi

  const checkWinner = (marks) => { // marks added and combination checking
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],  // hmare saare possible combinations h jisse pass ho ske
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (marks[a] && marks[a] === marks[b] && marks[a] === marks[c]) {    // line checking whether the lines are on same or not
        return marks[a];
      }
    }
    if (!marks.includes(null)) { //upper vale combinations k alava koi combination bnta ho toh draw krdega 
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
      <button onClick={() => clickHandler(index)} style={{width: "125px", height: "125px", border: "1px solid white", verticalAlign: "top", backgroundColor:"black", color:"white"}}>
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
    <div style={{marginTop:"-300px", marginLeft:"240px"}}>
      <div><b>{renderStatus()}</b></div>
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
    </div>
  );
}

export default App;
