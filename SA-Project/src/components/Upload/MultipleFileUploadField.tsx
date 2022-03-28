import { Grid, makeStyles } from "@material-ui/core";
import { Control, Controller, useForm, useFieldArray } from "react-hook-form";
// import { useField } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { FileError, FileRejection, useDropzone } from "react-dropzone";
import { SingleFileUploadWithProgress } from "./SingleFileUploadWithProgress";
import { UploadError } from "./UploadError";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { setRecommendations, setRecommendationFiles } from "../../store-feature/saCreator";

let currentId = 0;

function getNewId() {
  // we could use a fancier solution instead of a sequential ID
  return ++currentId;
}

export interface UploadableFile {
  id: number;
  file: File;
  errors: FileError[];
  url?: string;
}

const useStyles = makeStyles((theme) => ({
  dropzone: {
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: theme.palette.background.default,
    height: theme.spacing(10),
    outline: "none",
  },
}));

export function MultipleFileUploadField({
  name,
  control,
  defaultFiles,
  idx,
}: {
  name: string;
  control: any;
  defaultFiles: any;
  idx: number;
}) {
  const { register, handleSubmit, setValue, getValues, watch } = useForm();

  const dispatch = useAppDispatch();
  const classes = useStyles();

  const { fields } = useFieldArray({
    name: `recommendations.${idx}.rFiles`,
    control,
  });

//   console.log(JSON.stringify(fields, null, 4));

  const [files, setFiles] = useState<UploadableFile[]>([]);
  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({
      file,
      errors: [],
      id: getNewId(),
    }));
    const mappedRej = rejFiles.map((r) => ({ ...r, id: getNewId() }));
    setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej]);
  }, []);

//   console.log(watch("recommendations"));

  useEffect(() => {
    setValue(`recommendations.${idx}.rFiles`, files);
    // setValue(`recommendations.${idx}.rFiles`, [{rFiles: files}])
    const createPayload = {
        recommendationFiles: files,
        index: idx,
    };

    dispatch(setRecommendationFiles(createPayload));

    // console.log(getValues("recommendations"));
    // console.log(files);
    // helpers.setValue(files);
    // helpers.setTouched(true);
  }, [setValue, files]);

  function onUpload(file: File, url: string) {
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url };
        }
        return fw;
      })
    );
  }

  function onDelete(file: File) {
    setFiles((curr) => curr.filter((fw) => fw.file !== file));
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ["image/*", "video/*", ".pdf"],
    maxSize: 300 * 1024, // 300KB
  });

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultFiles}
      render={({ field: { onChange, onBlur, value } }) => (
        <React.Fragment>
          <Grid item>
            <div {...getRootProps({ className: classes.dropzone })}>
              <input {...getInputProps()} />

              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </Grid>

          {files.map((fileWrapper) => (
            <Grid item key={fileWrapper.id}>
              {fileWrapper.errors.length ? (
                <UploadError
                  file={fileWrapper.file}
                  errors={fileWrapper.errors}
                  onDelete={onDelete}
                />
              ) : (
                <SingleFileUploadWithProgress
                  onDelete={onDelete}
                  onUpload={onUpload}
                  file={fileWrapper.file}
                />
              )}
            </Grid>
          ))}
        </React.Fragment>
      )}
    />
  );
}
