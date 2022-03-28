import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

// MUI IMPORTS
import Button from "@material-ui/core/Button";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import SubjectIcon from "@material-ui/icons/Subject";
import ShortTextIcon from "@material-ui/icons/ShortText";
import { Card, CardContent, Divider, Grid, IconButton, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import Switch from "@material-ui/core/Switch";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { BsFileText } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./SA-creator.css";

// STORE IMPORTS
import {
  setDocName,
  setDocDesc,
  copyQuestion,
  addQuestionField,
  handleQuestionExpand,
  deleteQuestion,
  addQuestionType,
  onDragEnd,
  handleQuestionValue,
  handleOptionValue,
  addOption,
  removeOption,
  requiredQuestion,
  setOptionPoints,
  doneAnswer,
} from "../../store-feature/saCreator";

// MUI STYLE THEME
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginLeft: 150,
    marginRight: 150,
  },
  title: {
    fontSize: 8,
  },
  pos: {
    marginBottom: 12,
  },
}));

//** SA COMPONENT
const SA_Creator: React.FC<{
  activeStep: number;
  steps: string[];
  handleNext: any;
  handlePrevious: any;
}> = (props) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const quest = useAppSelector((state) => state.creator.questions);
  const questions = Array.from(quest);
  const documentName = useAppSelector((state) => state.creator.docName);
  const documentDescription = useAppSelector((state) => state.creator.docDesc);
  const [newDocState, setNewDocState] = useState(false);

  const setDocNameHandler = (value: string) => {
    dispatch(setDocName(value));
  };

  const setDocDescHandler = (value: string) => {
    dispatch(setDocDesc(value));
  };

  useEffect(() => {}, [questions]);

  const onDragEndHandler = (result: any) => {
    if (!result.destination) {
      return;
    }
    const createPayload = {
      startIndex: result.source.index,
      endIdex: result.destination.index,
    };
    dispatch(onDragEnd(createPayload));
  };

  const handleExpand = (qIndex: number) => {
    dispatch(handleQuestionExpand(qIndex));
  };

  const questionValueHandler = (qText: string, idx: number) => {
    const createPayload = {
      questionText: qText,
      questionIndex: idx,
    };
    dispatch(handleQuestionValue(createPayload));
  };

  const optionValueHandler = (optionT: string, qIndex: number, idx: number) => {
    const createPayload = {
      optionText: optionT,
      questionIndex: qIndex,
      index: idx,
    };
    dispatch(handleOptionValue(createPayload));
  };

  const addQuestionTypeHandler = (idx: number, qType: string) => {
    const createPayload = {
      questionIdx: idx,
      typeOfQuestion: qType,
    };
    dispatch(addQuestionType(createPayload));
  };

  const addOptionHandler = (qIndex: number) => {
    dispatch(addOption(qIndex));
  };

  const removeOptionHandler = (qIndex: number, idx: number) => {
    const createPayload = {
      questionIndex: qIndex,
      index: idx,
    };
    dispatch(removeOption(createPayload));
  };

  const copyQuestionHandler = (qIndex: number) => {
    dispatch(copyQuestion(qIndex));
  };

  const deleteQuestionHandler = (qIndex: number) => {
    dispatch(deleteQuestion(qIndex));
  };

  const requiredQuestionHandler = (qIndex: number) => {
    dispatch(requiredQuestion(qIndex));
  };

  const setOptionPointsHandler = (qPoints: number, qIndex: number) => {
    const creatPayload = {
      questionPoints: qPoints,
      questionIndex: qIndex,
    };
    dispatch(setOptionPoints(creatPayload));
  };

  const doneAnswerHandler = (qIndex: number) => {
    dispatch(doneAnswer(qIndex));
  };

  const addMoreQuestionField = () => {
    dispatch(addQuestionField(""));
  };

  const creatorUI = () => {
    return questions.map((question, qIndex) => (
      <Draggable key={qIndex} draggableId={qIndex + "id"} index={qIndex}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <Grid container justifyContent="center">
              <DragIndicatorIcon
                style={{
                  transform: "rotate(-90deg)",
                  // color: "#DAE0E2",
                  display: "flex",
                }}
                fontSize="small"
              />
            </Grid>
            <Accordion
              onChange={() => {
                handleExpand(qIndex);
              }}
              expanded={questions[qIndex].open}
              className={questions[qIndex].open ? "add_border" : ""}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{
                  width: "100%",
                }}
              >
                {!questions[qIndex].open ? (
                  <div className="saved_questions">
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography
                          style={{
                            fontSize: "15px",
                            fontWeight: "bolder",
                            letterSpacing: ".1px",
                            lineHeight: "24px",
                            paddingBottom: "8px",
                          }}
                        >
                          {qIndex + 1}. {question.questionText}
                        </Typography>
                      </Grid>

                      {Array.from(question.options).map((que, index) => (
                        <Grid item key={index} xs={12}>
                          <FormControlLabel
                            style={{
                              marginLeft: "5px",
                              marginBottom: "5px",
                            }}
                            disabled
                            control={
                              <input
                                type={question.questionType}
                                color="primary"
                                style={{
                                  marginRight: "3px",
                                }}
                                required={question.required}
                              />
                            }
                            label={
                              <Typography
                                style={{
                                  fontFamily: " Roboto,Arial,sans-serif",
                                  fontSize: " 13px",
                                  fontWeight: "bolder",
                                  letterSpacing: ".2px",
                                  lineHeight: "20px",
                                  color: "#202124",
                                }}
                              >
                                {question.options[index].optionText}
                              </Typography>
                            }
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                ) : (
                  ""
                )}
              </AccordionSummary>
              <Grid container>
                {!question.answer ? (
                  <AccordionDetails className="add_question">
                    <Grid container alignItems="center">
                      <Grid item xs={8}>
                        <TextField
                          fullWidth
                          type="text"
                          placeholder="Question"
                          value={question.questionText}
                          onChange={(e) => {
                            questionValueHandler(e.target.value, qIndex);
                          }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Select
                          className="select"
                          fullWidth
                          style={{
                            color: "#5f6368",
                            fontSize: "13px",
                          }}
                        >
                          <MenuItem
                            id="text"
                            value="Text"
                            onClick={() => {
                              addQuestionTypeHandler(qIndex, "text");
                            }}
                          >
                            {" "}
                            <SubjectIcon
                              style={{
                                marginRight: "10px",
                              }}
                            />{" "}
                            Paragraph
                          </MenuItem>

                          <MenuItem
                            id="checkbox"
                            value="Checkbox"
                            onClick={() => {
                              addQuestionTypeHandler(qIndex, "checkbox");
                            }}
                          >
                            <CheckBoxIcon
                              style={{
                                marginRight: "10px",
                                color: "#70757a",
                              }}
                            />{" "}
                            Checkboxes
                          </MenuItem>
                          <MenuItem
                            id="radio"
                            value="Radio"
                            onClick={() => {
                              addQuestionTypeHandler(qIndex, "radio");
                            }}
                          >
                            {" "}
                            <RadioButtonCheckedIcon
                              style={{
                                marginRight: "10px",
                                color: "#70757a",
                              }}
                            />{" "}
                            Multiple Choice
                          </MenuItem>
                        </Select>
                      </Grid>
                    </Grid>

                    {question.options.map((que, index) => (
                      <Grid container key={index} alignItems="center">
                        {question.questionType !== "text" ? (
                          <Grid item xs={1}>
                            <input type={question.questionType} />
                          </Grid>
                        ) : (
                          <ShortTextIcon
                            style={{
                              marginRight: "10px",
                            }}
                          />
                        )}
                        <Grid item xs={10}>
                          <input
                            type="text"
                            className="text_input"
                            placeholder="option"
                            value={question.options[index].optionText}
                            onChange={(e) => {
                              optionValueHandler(e.target.value, qIndex, index);
                            }}
                          ></input>
                        </Grid>

                        <Grid item xs={1}>
                          <IconButton
                            aria-label="delete"
                            onClick={() => {
                              removeOptionHandler(qIndex, index);
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                    {question.options.length < 5 ? (
                      <Grid container alignItems="center">
                        <FormControlLabel
                          disabled
                          control={
                            question.questionType !== "text" ? (
                              <Grid item>
                                <input
                                  type={question.questionType}
                                  color="primary"
                                  style={{
                                    marginLeft: "10px",
                                    marginRight: "10px",
                                  }}
                                  disabled
                                />
                              </Grid>
                            ) : (
                              <Grid item xs={1}>
                                <ShortTextIcon
                                  style={{
                                    marginRight: "10px",
                                  }}
                                />
                              </Grid>
                            )
                          }
                          label={
                            <Grid item>
                              <input
                                type="text"
                                className="text_input"
                                style={{
                                  fontSize: "13px",
                                  width: "0px",
                                }}
                              ></input>
                              <Button
                                size="small"
                                onClick={() => {
                                  addOptionHandler(qIndex);
                                }}
                                style={{
                                  textTransform: "none",
                                  color: "#4285f4",
                                  fontSize: "13px",
                                  fontWeight: "bolder",
                                }}
                              >
                                Add Option
                              </Button>
                            </Grid>
                          }
                        />
                      </Grid>
                    ) : (
                      ""
                    )}
                    <Grid container justifyContent="space-between" className="add_footer">
                      <Grid item></Grid>

                      <Grid item className="add_question_bottom">
                        <IconButton
                          aria-label="Copy"
                          onClick={() => {
                            copyQuestionHandler(qIndex);
                          }}
                        >
                          <FilterNoneIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            deleteQuestionHandler(qIndex);
                          }}
                        >
                          <BsTrash />
                        </IconButton>
                        <span
                          style={{
                            color: "#5f6368",
                            fontSize: "13px",
                          }}
                        >
                          Required{" "}
                        </span>{" "}
                        <Switch
                          name="checkedA"
                          color="primary"
                          checked={question.required}
                          onClick={() => {
                            requiredQuestionHandler(qIndex);
                          }}
                        />
                        <IconButton>
                          <MoreVertIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                ) : (
                  <AccordionDetails className="add_question">
                    <div className="top_header">Choose Correct Answer</div>
                    <div>
                      <div className="add_question_top">
                        <input
                          type="text"
                          className="question "
                          placeholder="Question"
                          value={question.questionText}
                          onChange={(e) => {
                            questionValueHandler(e.target.value, qIndex);
                          }}
                          disabled
                        />
                        <input
                          type="number"
                          className="points"
                          min="0"
                          step="1"
                          placeholder="0"
                          onChange={(e) => {
                            setOptionPointsHandler(e.target.valueAsNumber, qIndex);
                          }}
                        />
                      </div>

                      {question.options.map((op, index) => (
                        <div
                          className="add_question_body"
                          key={index}
                          style={{
                            marginLeft: "8px",
                            marginBottom: "10px",
                            marginTop: "5px",
                          }}
                        >
                          <div key={index}>
                            <div
                              style={{
                                display: "flex",
                              }}
                              className=""
                            >
                              <div className="form-check">
                                <label
                                  style={{
                                    fontSize: "13px",
                                  }}
                                >
                                  {question.questionType !== "text" ? (
                                    <input
                                      type={question.questionType}
                                      name={question.questionText}
                                      value="option3"
                                      className="form-check-input"
                                      required={question.required}
                                      style={{
                                        marginRight: "10px",
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                      }}
                                    />
                                  ) : (
                                    <ShortTextIcon
                                      style={{
                                        marginRight: "10px",
                                      }}
                                    />
                                  )}

                                  {question.options[index].optionText}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="add_question_body">
                        <Button
                          size="small"
                          style={{
                            textTransform: "none",
                            color: "#4285f4",
                            fontSize: "13px",
                            fontWeight: "bolder",
                          }}
                        >
                          {" "}
                          <BsFileText
                            style={{
                              fontSize: "20px",
                              marginRight: "8px",
                            }}
                          />
                          Add Answer Feedback
                        </Button>
                      </div>

                      <div className="add_question_bottom">
                        <Button
                          variant="outlined"
                          color="primary"
                          style={{
                            textTransform: "none",
                            color: "#4285f4",
                            fontSize: "12px",
                            marginTop: "12px",
                            fontWeight: "bolder",
                          }}
                          onClick={() => {
                            doneAnswerHandler(qIndex);
                          }}
                        >
                          Done
                        </Button>
                      </div>
                    </div>
                  </AccordionDetails>
                )}
                {!question.answer ? (
                  <Grid container justifyContent="flex-start">
                    <Divider />
                    <AddCircleOutlineIcon onClick={addMoreQuestionField} className="edit" />
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>
            </Accordion>
          </div>
        )}
      </Draggable>
    ));
  };

  const addNewPaper = () => {
    console.log("add new paper to screen");
    setNewDocState(true);
  };

  return (
    <form>
      <Card className={classes.root} variant="outlined">
        <br></br>
        <CardContent>
          <div className="question_title_section">
            <Grid container className="question_form_top">
              <Grid item xs={12}>
                <TextField
                  type="text"
                  className="question_form_top_name"
                  style={{
                    color: "black",
                  }}
                  placeholder={documentName}
                  value={documentName}
                  onChange={(event) => {
                    setDocNameHandler(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  className="question_form_top_desc"
                  placeholder={documentDescription}
                  value={documentDescription}
                  onChange={(event) => {
                    setDocDescHandler(event.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </div>
          <DragDropContext onDragEnd={onDragEndHandler}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {creatorUI()}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {/* <Button variant="contained" color="secondary" onClick={addNewPaper}>
            Click Here For New Paper
          </Button> */}

          {/* {newDocState ? creatorUI() : console.log("nothing rendered")} */}

          <div className="save_form">
            <Button
              variant="contained"
              color="primary"
              onClick={props.handlePrevious}
              style={{
                fontSize: "14px",
                marginRight: "0.5rem",
              }}
            >
              {props.activeStep === props.steps.length ? "Finish" : "Previous"}
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={props.handleNext}
              style={{
                fontSize: "14px",
              }}
            >
              {props.activeStep === props.steps.length ? "Finish" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default SA_Creator;
