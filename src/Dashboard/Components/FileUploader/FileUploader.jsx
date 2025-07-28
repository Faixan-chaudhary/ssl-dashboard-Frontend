import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

function FileUploader() {
  const [open, setOpen] = React.useState(false);
  // const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
     
      event.target.value
    );
  };

  // const handleFullWidthChange = (event) => {
  //   setFullWidth(event.target.checked);
  // };

  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) => ({
        name: file.name,
        size: file.size,
      }))
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <React.Fragment>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            justifyContent: "space-evenly",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            p: "10px",
            mt: "50px",
            width: "95%",
            display: "flex",
            flexDirection: "column",
            height: "120px",
            borderRadius: "15px",
          }}
        >
          <Typography sx={{ ml: "12px", fontSize: "32px", fontWeight: "600" }}>
            Hi, Admins
          </Typography>
          <Typography sx={{ ml: "12px" }} variant="h6">
            Welcome to your Dashboard!
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "end", width: "90%" }}>
          <Button
            sx={{ mt: "60px", mb: "30px" }}
            variant="contained"
            onClick={handleClickOpen}
          >
            Media Upload
          </Button>
        </Box>
        <Dialog fullWidth="md" maxWidth="md" open={open} onClose={handleClose}>
          <DialogTitle
            style={{ color: "#1976d2", fontWeight: "600", marginTop: "20px" }}
          >
            Media Upload
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can upload any type of media.
            </DialogContentText>

            <section className="container">
              <div
                {...getRootProps({
                  className: "dropzone",
                  style: {
                    border: "2px dashed #ccc",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                  },
                })}
              >
                <input {...getInputProps()} />
                <p>Drag & drop some files here, or click to select files</p>
              </div>
              <aside>
                <h4 style={{ marginTop: "10px" }}>Files</h4>
                <ul style={{ marginLeft: "15px" }}>
                  {files.map((file, index) => (
                    <li key={index}>
                      {file.name} - {file.size} bytes
                    </li>
                  ))}
                </ul>
              </aside>
            </section>
          </DialogContent>
          <DialogActions sx={{ mb: "10px" }}>
            <Button variant="contained">Upload</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </React.Fragment>
  );
}

export default FileUploader;
