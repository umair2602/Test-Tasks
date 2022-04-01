import React, { Fragment, useRef } from "react";
import Chart from "./components/Chart";
import ReactToPrint from 'react-to-print'

function App() {
  const ref = useRef();
  const options = {
    orientation: "portrait",
    unit: "in",
    format: [14, 14],
  };

  return (
    <Fragment>
        <ReactToPrint 
          trigger={()=>{
          return <button>Print</button>
        }}
        content={()=> ref.current}
        />
        <div ref={ref}>
          <Chart />
        </div>
    </Fragment>
  );
}

export default App;
