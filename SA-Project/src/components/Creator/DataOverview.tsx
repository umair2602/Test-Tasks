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
import { Button, Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import { TreeView } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 150,
        marginRight: 150,
        marginBottom: '2rem',
    },
    treeView: {
        height: 240,
        flexGrow: 1,
        maxWidth: 400,
    },
    cardHeader: {
        alignContent: "center",
    },
}));

const DataOverview: React.FC<{
    activeStep: number;
    steps: string[];
    handlePrevious: any;
    handleNext: any;
}> = (props) => {

    const classes = useStyles();
    const dispatch = useAppDispatch();

    const questions = useAppSelector(
        (state) => state.creator.questions
    );
    console.log(questions);

    return (
        <Card className={classes.root} >
            <CardHeader className={classes.cardHeader}
                subheader="This JSON shows Data for every Question" />
            <CardContent >
                <Grid container>
                    <TreeView
                        className={classes.root}
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                    >
                        {questions.map((ques, qIndex: number) => (
                            <Grid key={qIndex} style={{ marginBottom: '1rem' }} item xs={12} >
                                <TreeItem nodeId={`${qIndex}}`} label={`Question No : ${qIndex + 1}`}>
                                    {ques.options.map((o, oIndex: number) => (
                                        <TreeItem key={oIndex} style={{ margin: '.7rem' }} nodeId={uuidv4()} label={`${o.optionText}`}>
                                            {o.optionPoint.length && o.optionPoint.map((op, opIndex: number) => (
                                                <div key={opIndex} style={{ display: 'flex', padding: '.5px 1rem' }}>
                                                    <b> R-no : {opIndex + 1}</b>
                                                    <TreeItem nodeId={`${opIndex + 1}`} label={`${op.desc}`}>
                                                    </TreeItem>
                                                </div>
                                            ))}
                                        </TreeItem>
                                    ))}
                                </TreeItem>
                            </Grid>
                        ))}
                    </TreeView>
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
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                style={{ fontSize: "14px" }}
                                onClick={() => props.handleNext()}
                            >
                                {props.activeStep === props.steps.length ? "Finish" : "Next"}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default DataOverview;










