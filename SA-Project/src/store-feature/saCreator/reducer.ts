import { createReducer } from "@reduxjs/toolkit";

import { IRecommendations } from "../../lib/interfaces/IRecommendations";
import _ from "lodash";

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
  addAnswer,
  requiredQuestion,
  setOptionPoints,
  doneAnswer,
  setRecommendations,
  changeRecommendations,
  removeRecommendation,
} from "./actions";

export interface Options {
  optionText: string;
  optionPoint: any[];
}

export interface SAFormState {
  questions: [
    {
      questionText: string;
      questionType: string;
      answer: boolean;
      answerKey: string;
      points: number;
      options: Options[];
      open: boolean;
      required: boolean;
    }
  ];

  recommendations: IRecommendations[];

  questionType: string;
  docName: string;
  docDesc: string;
}

const initialState: SAFormState = {
  questions: [
    {
      questionText: "Question",
      answer: false,
      answerKey: "",
      points: 0,
      questionType: "radio",
      options: [{ optionText: "Option 1", optionPoint: [] }],
      open: true,
      required: false,
    },
  ],
  recommendations: [],
  questionType: "radio",
  docName: "Physics",
  docDesc: "Introduction to thermodynamics",
};

export const creatorReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setDocName, (state, action) => {
      state.docName = action.payload;
    })

    .addCase(setDocDesc, (state, action) => {
      state.docDesc = action.payload;
    })

    .addCase(copyQuestion, (state, action) => {
      // first close expand
      for (let idx = 0; idx < state.questions.length; idx++) {
        state.questions[idx].open = false;
      }
      // push new question
      let copiedQuestion = state.questions[action.payload];
      state.questions.push(copiedQuestion);
    })

    .addCase(addQuestionField, (state, action) => {
      // first close expand
      for (let idx = 0; idx < state.questions.length; idx++) {
        state.questions[idx].open = false;
      }
      state.questions.push({
        questionText: "Question",
        answer: false,
        answerKey: "",
        points: 0,
        questionType: "radio",
        options: [{ optionText: "Option 1", optionPoint: [] }],
        open: true,
        required: false,
      });
    })

    .addCase(handleQuestionExpand, (state, action) => {
      const qIndex = action.payload;
      for (let idx = 0; idx < state.questions.length; idx++) {
        if (qIndex === idx) state.questions[qIndex].open = true;
        else state.questions[idx].open = false;
      }
    })

    .addCase(deleteQuestion, (state, action) => {
      if (state.questions.length > 1) {
        state.questions.splice(action.payload, 1);
      }
    })

    .addCase(addQuestionType, (state, action) => {
      state.questions[action.payload.questionIdx].questionType = action.payload.typeOfQuestion;
    })

    .addCase(onDragEnd, (state, action) => {
      //const quest = Array.from(state.questions);
      const [removedQuestion] = state.questions.splice(action.payload.startIndex, 1);

      state.questions.splice(action.payload.endIndex, 0, removedQuestion);
    })

    .addCase(handleQuestionValue, (state, action) => {
      state.questions[action.payload.questionIndex].questionText = action.payload.questionText;
    })

    .addCase(handleOptionValue, (state, action) => {
      state.questions[action.payload.questionIndex].options[action.payload.index].optionText =
        action.payload.optionText;
    })

    .addCase(addOption, (state, action) => {
      const qIndex = action.payload;
      if (state.questions[qIndex].options.length < 5) {
        state.questions[qIndex].options.push({
          optionText: "Option " + (state.questions[qIndex].options.length + 1),
          optionPoint: [],
        });
      } else {
        alert("Max is 5 options");
      }
    })

    .addCase(removeOption, (state, action) => {
      const questionIndex = action.payload.questionIndex;
      const index = action.payload.index;
      if (state.questions[questionIndex].options.length > 1) {
        state.questions[questionIndex].options.splice(index, 1);
      }
    })

    .addCase(addAnswer, (state, action) => {
      const index = action.payload;
      state.questions[index].answer = !state.questions[index].answer;
    })

    .addCase(requiredQuestion, (state, action) => {
      const index = action.payload;
      console.log("Required", state.questions[index].required);
      state.questions[index].required = !state.questions[index].required;
    })

    .addCase(setOptionPoints, (state, action) => {
      const index = action.payload.qIndex;
      state.questions[index].points = action.payload.questionPoints;
    })

    .addCase(doneAnswer, (state, action) => {
      const index = action.payload;
      state.questions[index].answer = !state.questions[index].answer;
    })

    .addCase(setRecommendations, (state, action) => {
      let recommendations = action.payload;
      state.recommendations = recommendations.recommendations;
      state.questions.map((ques) => {
        let rLength = action.payload.recommendations.length;
        let optionLength = ques.options.length;
        if (optionLength <= rLength) {
          for (let k = 0; k < ques.options.length; k++) {
            for (let j = 0; j < action.payload.recommendations.length; j++) {
              if (ques.options[k].optionPoint[j]?.id > 0) {
                if (
                  ques.options[k].optionPoint[j]?.id !==
                  action.payload.recommendations[j].recommendationId
                ) {
                  if (ques.options[k].optionPoint[j]?.desc) {
                    ques.options[k].optionPoint.push({
                      id: action.payload.recommendations[j].recommendationId,
                      desc: "",
                    });
                  }
                }
              } else {
                if (
                  ques.options[k].optionPoint[j]?.id !==
                  action.payload.recommendations[j].recommendationId
                ) {
                  ques.options[k].optionPoint.push({
                    id: action.payload.recommendations[j].recommendationId,
                    desc: "",
                  });
                }
              }
            }
          }
        } else {
          for (let k = 0; k < action.payload.recommendations.length; k++) {
            for (let j = 0; j < ques.options.length; j++) {
              if (ques.options[j].optionPoint[k]?.id) {
                if (
                  ques.options[j].optionPoint[k]?.id !==
                  action.payload.recommendations[k].recommendationId
                ) {
                  if (ques.options[j].optionPoint[k]?.desc) {
                    ques.options[j].optionPoint.push({
                      id: action.payload.recommendations[k].recommendationId,
                      desc: "",
                    });
                  }
                }
              } else {
                if (
                  ques.options[j].optionPoint[k]?.id !==
                  action.payload.recommendations[k].recommendationId
                ) {
                  ques.options[j].optionPoint.push({
                    id: action.payload.recommendations[k].recommendationId,
                    desc: "",
                  });
                }
              }
            }
          }
        }
      });
    })

    .addCase(changeRecommendations, (state, action) => {
      // console.log(action.payload)
      let qIndex = action.payload.qIndex;
      let oIndex = action.payload.oIndex;
      let rIndex = action.payload.rIndex;
      // console.log(state.questions)
      state.questions[qIndex].options[oIndex].optionPoint[rIndex].desc = action.payload.value;
    })

    .addCase(removeRecommendation, (state, action) => {
      state.questions.map((ques, i) =>
        ques.options.map((o, j) => {
          _.remove(o.optionPoint, function (n) {
            return n.id === action.payload.recommId;
          });
        })
      );

      state.questions.map((ques, i) =>
        ques.options.map((o, j) => {
          o.optionPoint?.map((op) => {
            console.log(op.id, op.desc);
          });
        })
      );
    });
});
