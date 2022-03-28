import React from "react";

import { useForm, useFieldArray, Controller, SubmitHandler } from "react-hook-form";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";

import { removeRecommendation, SAFormState } from "../../store-feature/saCreator";

import { setRecommendations } from "../../store-feature/saCreator";

// import { FileInput } from "../Upload/FileInput";
import { MultipleFileUploadField } from "../Upload/MultipleFileUploadField";

import "./SA-creator.css";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 150,
    marginRight: 150,
    marginBottom: "2rem",
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

const Recommendation: React.FC<{
  activeStep: number;
  steps: string[];
  handlePrevious: () => void;
  handleNext: () => void;
}> = (props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const recommendations = useAppSelector((state) => state.creator.recommendations);

  const { register, control, handleSubmit } = useForm<SAFormState>({
    defaultValues: { recommendations },
  });

  const { fields, append, remove } = useFieldArray<
    SAFormState,
    "recommendations",
    "recommendationId"
  >({
    control,
    name: "recommendations",
    keyName: "recommendationId",
  });

  const onSubmit = (data: SAFormState) => {
    console.log(data);
    dispatch(setRecommendations(data));

    props.handleNext();
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        className={classes.cardHeader}
        // subheader="This is where you setup questions and define answers"
      />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((item, index) => {
            return (
              <Grid container style={{ marginBottom: "2rem" }} key={item.recommendationId}>
                <Grid container>
                  <Grid item xs={6}>
                    <b> Sr: No. {index + 1} </b>
                    <Grid container>
                      <Controller
                        name={`recommendations.${index}.rTitle`}
                        control={control}
                        defaultValue={item.rTitle || ""}
                        render={({ field }) => (
                          <TextField
                            required
                            variant="outlined"
                            placeholder="Enter Recommendation Title"
                            fullWidth
                            {...field}
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name={`recommendations.${index}.rDescription`}
                        control={control}
                        defaultValue={item.rDescription || ""}
                        render={({ field }) => (
                          <TextField
                            required
                            variant="outlined"
                            placeholder="Enter Recommendation Description"
                            multiline={true}
                            rows={3}
                            fullWidth
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container justifyContent="center">
                      <MultipleFileUploadField
                        name={`recommendations.${index}.rFiles`}
                        control={control}
                        defaultFiles={item.rFiles}
                        idx={index}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Controller
                    control={control}
                    name={`recommendations.${index}.recommendationId`}
                    render={({ field }) => (
                      <Button
                        {...field}
                        onClick={() => {
                          dispatch(
                            removeRecommendation({
                              recommId: item.recommendationId,
                            })
                          );
                          remove(index);
                        }}
                        style={{ textTransform: "none", fontWeight: "bold" }}
                      >
                        Remove
                      </Button>
                    )}
                  />
                  {/* <Button name={`recommendations.${index}.recommendationId`}  onClick={() => remove(index)} style={{textTransform: 'none', fontWeight: "bold"}}>Remove</Button> */}
                </Grid>
              </Grid>
            );
          })}

          <Grid container justifyContent="center" onClick={() => append({})}>
            <Button>Add Recommendation</Button>
          </Grid>

          <Grid container style={{ marginLeft: "1rem", marginTop: "1rem" }} spacing={1}>
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
          <pre>{JSON.stringify(recommendations, null, 4)}</pre>
        </form>
      </CardContent>
    </Card>
  );
};

export default Recommendation;
