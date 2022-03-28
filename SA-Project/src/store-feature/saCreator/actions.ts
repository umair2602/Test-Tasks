import { createAction } from "@reduxjs/toolkit";

import { SAFormState } from "../saCreator";

export const setDocName = createAction<string>("creator/setDocName"); //Action-1
export const setDocDesc = createAction<string>("creator/setDocDesc"); //Action-2
export const copyQuestion = createAction<number>("creator/copyQuestion");
export const addQuestionField = createAction<string>("creator/addQuestionField");
export const handleQuestionExpand = createAction<number>("creator/handleQuestionExpand");
export const deleteQuestion = createAction<number>("creator/deleteQuestion");
export const addQuestionType = createAction<any>("creator/addQuestionType");
export const onDragEnd = createAction<any>("creator/onDragEnd");
export const handleQuestionValue = createAction<any>("creator/handleQuestionValue");
export const handleOptionValue = createAction<any>("creator/handleOptionValue");
export const addOption = createAction<any>("creator/addOption");
export const removeOption = createAction<any>("creator/removeOption");
export const addAnswer = createAction<number>("creator/addAnswer");
export const requiredQuestion = createAction<number>("creator/requiredQuestion");
export const setOptionPoints = createAction<any>("creator/setOptionPoints");
export const doneAnswer = createAction<number>("creator/doneAnswer");

export const setRecommendations = createAction<SAFormState>("creator/setRecommendations");
export const changeRecommendations = createAction<any>("creator/changeRecommendations");
export const removeRecommendation = createAction<any>("creator/RemoveRecommendation");
export const setRecommendationFiles = createAction<any>("creator/setRecommendationFiles");
