import React from "react";

import { Button } from "@material-ui/core";

const classes = {
  mainComponent: {
    margin: "2rem",
    display: "flex",
    justifyContent: "space-evenly",
  },
};

// const newPaper = (
//   <Button variant="contained" color="secondary">
//     Click Here For New Paper
//   </Button>
// );

const StartPage = (props: any) => {
  const { handleNext } = props;

  const handleMultipleModule = () => {
    handleNext();
    // addNewPaperComponent(newPaper)
  };

  return (
    <div>
      <h1
        style={{
          color: "black",
          backgroundColor: "lightgrey",
          paddingBottom: "2rem",
          paddingTop: "2rem",
          textAlign: "center",
        }}
      >
        Select any module
      </h1>
      <div style={classes.mainComponent}>
        <Button onClick={handleNext} variant="contained" color="primary">
          Create Single Module
        </Button>
        <Button onClick={handleMultipleModule} variant="contained" color="secondary">
          Create Multiple Module
        </Button>
      </div>
    </div>
  );
};

export default StartPage;
