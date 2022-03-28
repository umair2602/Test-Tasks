import { useSelector, useDispatch } from "react-redux";
import { Button, Box } from "@mui/material";
import {
  setNextPage,
  setPreviousPage,
  continuePageCountTo,
} from "./questionsSlice";

const Questions = () => {
  const dispatch = useDispatch();
  const pageCount = useSelector((state) => state.questions.pageCount);
  const data = useSelector((state) => state.questions.qs);

  const optionClickHandler = (conTo) => {
    conTo = conTo - 1;
    if (conTo >= data.length) {
      return;
    }
    setTimeout(() => dispatch(continuePageCountTo(conTo)), 500);
  };

  return (
    <>
      <Box
        sx={{
          mx: "1rem",
          my: "1rem",
          px: "2.5rem",
          py: "2.5rem",
        }}
      >
        {/* MCQ's component below */}

        <div>
          <Box sx={{ mb: 3, mt: 2, fontSize: 20 }}>
            <label>{data[pageCount].questionText}</label>{" "}
            <label>(Points - {data[pageCount].points})</label>
          </Box>
          <div>
            {data[pageCount].options?.map((el) => {
              return (
                <Box sx={{ mb: 3 }}>
                  <span onClick={() => optionClickHandler(el.continueTo)}>
                    <input
                      type={data[pageCount].questionType}
                      id={el.optionText}
                      name="options"
                    />{" "}
                    <label htmlFor={el.optionText}>{el.optionText}</label>
                  </span>
                </Box>
              );
            })}
          </div>
        </div>

        {/* MCQ's component above */}

        {pageCount === 0 ? (
          <Button
            sx={{
              mr: "1rem",
            }}
            aria-label="previous question"
            variant="contained"
            size="large"
            disabled
          >
            Back
          </Button>
        ) : (
          <Button
            sx={{
              mr: "1rem",
            }}
            aria-label="previous question"
            variant="contained"
            size="large"
            onClick={() => dispatch(setPreviousPage())}
          >
            Back
          </Button>
        )}

        {pageCount === data.length - 1 ? (
          <Button
            aria-label="next question"
            variant="contained"
            size="large"
            disabled
          >
            Next
          </Button>
        ) : (
          <Button
            aria-label="next question"
            variant="contained"
            size="large"
            onClick={() => dispatch(setNextPage())}
          >
            Next
          </Button>
        )}
      </Box>
    </>
  );
};

export default Questions;
