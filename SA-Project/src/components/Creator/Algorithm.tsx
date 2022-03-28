import React, { useState, useRef, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

// Material-ui imports
import { alpha, recomposeColor, withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { Button, Card, CardHeader, Grid } from "@material-ui/core";

import { changeRecommendations } from "../../store-feature/saCreator";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },

  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "150px",
    padding: "5px 6px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 150,
    marginRight: 150,
    marginBottom: "2rem",
    paddingBottom: "2rem",
  },
  table: {
    minWidth: 650,
    borderBottom: 1,
    backgroundColor: theme.palette.action.hover,
  },
  cardContent: {
    width: "50%",
  },
  cardHeader: {
    alignContent: "center",
  },
  pos: {
    marginBottom: 12,
  },
}));

export interface IQuestion {
  questionText: string;
  answerNo: String;
  questionIndex: number;
}

const Algorithm: React.FC<{
  activeStep: number;
  steps: string[];
  handlePrevious: any;
  handleNext: any;
}> = (props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const questions = useAppSelector((state) => state.creator.questions);

  console.log(questions);

  const ref = useRef(null);
  const getUniqueKeyFromArrayIndex = (rowNum: number) => {
    // return `${rowNum}-${columnNum}`;
    return `${rowNum}`;
  };

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    qIndex: number,
    oIndex: number,
    rIndex: number
  ) => {
    // console.log(e.target.value, qIndex, oIndex, rIndex);
    dispatch(
      changeRecommendations({ value: e.target.value, qIndex, oIndex, rIndex })
    );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log("I am called")
    props.handleNext();
  };

  const generateTable = () => {
    const table: any[] = [];
    questions.map((question: any, index: any) => {
      table.push(
        <React.Fragment key={index}>
          <TableHead>
            <TableCell
              style={{
                width: "100%",
              }}
            >
              <strong key={index} style={{ fontWeight: "bold" }}>
                {(question.questionText + ` [${index + 1}]`).toString()}{" "}
              </strong>
              <TableCell></TableCell>
              {question.options[0].optionPoint.map((opp: any, jindex: any) => (
                <TableCell key={jindex}>
                  <b> Recomendation: {jindex + 1}</b>
                </TableCell>
              ))}
              {question.options.map((ans: any, indexx: any) => (
                <TableRow key={indexx}>
                  <TableCell>
                    <p style={{ width: 80 }}>{ans.optionText.toString()}</p>
                  </TableCell>
                  {ans.optionPoint.length
                    ? ans.optionPoint.map((rec: any, jjindex: any) => {
                        return (
                          <TableCell key={jjindex}>
                            <BootstrapInput
                              type="number"
                              value={rec.desc}
                              required
                              autoComplete="off"
                              inputProps={{ min: 1, max: 10 }}
                              name={getUniqueKeyFromArrayIndex(jjindex)}
                              onChange={(event) => {
                                onChangeHandler(event, index, indexx, jjindex);
                              }}
                            />
                          </TableCell>
                        );
                      })
                    : null}
                </TableRow>
              ))}
            </TableCell>
          </TableHead>
        </React.Fragment>
      );
    });
    return table;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className={classes.root} variant="outlined">
        <CardHeader
          className={classes.cardHeader}
          subheader="Provide point for your answers"
        />
        <div className={"TableContainer"}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody ref={ref}>{generateTable()}</TableBody>
            </Table>
          </TableContainer>
        </div>

        <Grid
          style={{ marginLeft: "1rem", marginTop: "1rem" }}
          container
          spacing={1}
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={props.handlePrevious}
              style={{ fontSize: "14px" }}
            >
              {props.activeStep === props.steps.length ? "Finish" : "Previous"}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ fontSize: "14px" }}
            >
              {props.activeStep === props.steps.length ? "Finish" : "Next"}
            </Button>
          </Grid>
        </Grid>
      </Card>
    </form>
  );
};

export default Algorithm;
