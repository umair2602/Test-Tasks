import { useState } from "react";
import { Stepper, Step, StepLabel, makeStyles } from "@material-ui/core";

import StartPage from "./StartPage";
import SA_Creator from "./SA-creator";
import Recommendation from "./Recommendation";
import Algorithm from "./Algorithm";
import DataOverview from "./DataOverview";
import Finish from "./Finish";

const useStyles = makeStyles({
  root: {
    //width: "80%",
    // margin: "6rem auto",
    border: "1px solid #999",
    "& .MuiStepIcon-root.MuiStepIcon-active": {
      color: "red",
    },
    "& .MuiStepIcon-root.MuiStepIcon-completed": {
      color: "red",
    },
  },
});

const Wizard = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Start", "Q and A", "RECOMMENDATIONS", "ALGORITHM", "JSON", "Finish"];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepsContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return <StartPage handleNext={handleNext} activeStep={activeStep} steps={steps} />;
      case 1:
        return (
          // eslint-disable-next-line react/jsx-pascal-case
          <>
            <SA_Creator
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              activeStep={activeStep}
              steps={steps}
            />
            <SA_Creator
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              activeStep={activeStep}
              steps={steps}
            />
            <SA_Creator
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              activeStep={activeStep}
              steps={steps}
            />
          </>
        );
      case 2:
        return (
          <Recommendation
            activeStep={activeStep}
            steps={steps}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
        );
      case 3:
        return (
          <Algorithm
            activeStep={activeStep}
            steps={steps}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
        );
      case 4:
        return (
          <DataOverview
            activeStep={activeStep}
            steps={steps}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
        );
      case 5:
        return <Finish activeStep={activeStep} steps={steps} handlePrevious={handlePrevious} />;
      default:
        return "Unknown Step";
    }
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <>
        {activeStep === steps.length ? "The Steps Completed" : <>{getStepsContent(activeStep)}</>}
      </>
    </div>
  );
};
export default Wizard;
