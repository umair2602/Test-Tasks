import React, { Fragment, createRef } from "react";

import Chart from "./components/Chart";
import Pdf from "react-to-pdf";

function App() {
  const ref = createRef();
  const options = {
    orientation: "portrait",
    unit: "in",
    format: [14, 14],
  };

  return (
    <Fragment>
      <Pdf targetRef={ref} filename="Vertical-Chart.pdf" options={options}>
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf>

      <div ref={ref}>
        <Chart />
      </div>
    </Fragment>
  );
}

export default App;
