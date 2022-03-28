import React, { useState, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
// Material-ui imports
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, CardHeader, Grid } from "@material-ui/core";
// import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 150,
        marginRight: 150,
        marginBottom: '2rem',
    },
    cardHeader: {
        alignContent: "center",
    },
}));

const Finish: React.FC<{
    activeStep: number;
    steps: string[];
    handlePrevious: any;
}> = (props) => {

    const questions = useAppSelector(
        (state) => state.creator.questions
    );
    console.log(questions);

    const classes = useStyles();

    return (
        <Card className={classes.root} >
            <CardHeader className={classes.cardHeader}
                subheader="Steps completed Successfully" />
            <CardContent >
                <h3>Thanks</h3>
                <Grid container style={{ marginLeft: '1rem', marginTop: '1rem' }} spacing={1}>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={props.handlePrevious}
                            style={{ fontSize: "14px" }}
                        >
                            {props.activeStep === props.steps.length
                                ? "Finish"
                                : "Previous"}
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Finish;










