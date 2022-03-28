import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export const docDesc = (state: RootState) => state.creator.docDesc;
export const docName = (state: RootState) => state.creator.docName;
export const questionType = (state: RootState) => state.creator.questionType;
export const questions = (state: RootState) => state.creator.questions;
export const recommendations = (state: RootState) => state.creator.recommendations;

export const creatorSelector = createSelector(
  docDesc,
  docName,
  questionType,
  questions,
  (state) => state
);
