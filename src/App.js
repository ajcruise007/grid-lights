import { useState } from "react";
import "./App.css";

function Cell({ isActive, onClicked }) {
  return (
    <div
      onClick={onClicked}
      className={isActive ? "cell cell-active" : "cell"}
    ></div>
  );
}

function App() {
  const [order, setOrder] = useState([]);
 
  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const handleCellClick = (index) => {
    if (order.includes(index)) {
      return;
    }
    const newOrdder = [...order, index];

    setOrder(newOrdder);
    // console.log(newOrdder);

    if (newOrdder.length === config.flat().filter(Boolean).length) {
      deactivateCells();
    }
  };

  const deactivateCells = () => {
    console.log("deactivate called");
    const timer = setInterval(() => {
      setOrder((prevOrder) => {
        const newOrder = [...prevOrder];
        newOrder.pop();
        if (newOrder.length === 0) {
          clearInterval(timer);
        }
        return newOrder;
      });
    }, 300);
  };

  return (
    <div className="App">
      <div
        className="container"
        style={{ gridTemplateColumns: `repeat(${config[0].length}, 1fr)` }}
      >
        {config.flat().map((value, index) => {
          return value === 1 ? (
            <Cell
              key={index}
              isActive={order.includes(index)}
              onClicked={() => handleCellClick(index)}
            />
          ) : (
            <span key={index}/>
          );
        })}
      </div>
    </div>
  );
}

export default App;
