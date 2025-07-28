import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import {
  useCreateSSL,
  useSSLById,
  useDomainByID,
  useCreateDomain,
  useUpdateDomain,
  useUpdateSSL,
  useUpdateStatusSSL,
  useSSL,
  useDomain,
} from "../api/hooks/mutations";

const FormDialog = ({
  userId,
  open,
  itemId,
  setEdit,
  setOpen,
  edit,
  id,
  category,
}) => {
  const location = useLocation();
  const { createSSL } = useCreateSSL();
  const { createDomain } = useCreateDomain();
  const { updateSSL } = useUpdateSSL();
  const { updateDomain } = useUpdateDomain();
  const { updateStatusSSL } = useUpdateStatusSSL();
  const { data: sslGetData, refetch: sslRefetch } = useSSL();
  const { data: domainGetData, refetch: domainRefetch } = useDomain();

  const [previousDate, setPreviousDate] = React.useState("");
  const { updateDataResponse } = useUpdateDomain();
  const userType = Cookies.get("userType");

  const isSSLPage = location.pathname === "/ssl";
  const isDomainPage = location.pathname === "/domains";

  const [formData, setFormData] = useState({
    domain: "",
    ssl: "",
    no_of_days: "",
    start_date: "",
    expiry_date: "",
    current_registration: "",
    description: "",
    duration: 1,
    authority: "Godaddy",
    link: "",
  });

  console.log("****************", category);
  console.log("******************8", edit);
  const {
    data: sslData,
    isLoading: sslLoading,
    refetch: refetchSSL,
  } = useSSLById(id, {
    enabled: !!(open && edit && id && (isSSLPage || category === "SSL")),
  });

  const {
    data: domainData,
    isLoading: domainLoading,
    refetch: refetchDomain,
  } = useDomainByID(id, {
    enabled: !!(open && edit && id && (isDomainPage || category === "Domain")),
  });

  useEffect(() => {
    console.log("1111111111111111111111", isSSLPage);
    console.log("11111111111111111111113333333333", category);
    if (open && edit && id) {
      if (isDomainPage || category === "Domain") {
        refetchDomain();
      } else if (isSSLPage || category === "SSL") {
        refetchSSL();
      }
    }
  }, [
    open,
    edit,
    category,
    id,
    isDomainPage,
    isSSLPage,
    refetchDomain,
    refetchSSL,
  ]);

  useEffect(() => {
    if (!edit || !id || !open) return;
    if (category === "Domain" && domainData?.data && edit === true) {
      const {
        domain,
        no_of_days,
        start_date,
        expiry_date,
        current_registration,
        description,
        duration,
        authority,
        link,
      } = domainData?.data;

      setFormData({
        domain: domain || "",
        no_of_days: no_of_days || "",
        start_date: start_date ? start_date.split("T")[0] : "",
        expiry_date: expiry_date ? expiry_date.split("T")[0] : "",
        current_registration: current_registration || "",
        description: description || "",
        duration: duration ? Number(duration) : 1,
        authority: authority || "Godaddy",
        link: link || "",
      });
    }

    if (category === "SSL" && sslData?.data) {
      const {
        ssl,
        no_of_days,
        start_date,
        expiry_date,
        current_registration,
        description,
        duration,
        authority,
        link,
      } = sslData.data;

      setPreviousDate(expiry_date ? expiry_date.split("T")[0] : "");

      setFormData({
        ssl: ssl || "",
        no_of_days: no_of_days || "",
        start_date: start_date ? start_date.split("T")[0] : "",
        expiry_date: expiry_date ? expiry_date.split("T")[0] : "",
        current_registration: current_registration || "",
        description: description || "",
        duration: duration ? Number(duration) : 1,
        authority: authority || "Godaddy",
        link: link || "",
      });
    }
  }, [edit, id, open, category, domainData?.data, sslData?.data]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" ? Number(value) : value,
    }));

    // Specific check for expiry_date and SSL status update
    if (name === "expiry_date" && previousDate) {
      const newDate = new Date(value); // User-entered expiry date
      const prevDate = new Date(previousDate); // Previously saved expiry date

      if (newDate > prevDate) {
        console.log("✅ New date is greater than previous date");
        updateStatusSSL(id, { user_id: userId, status: "Approved" });
      } else {
        console.log("❌ Not updated");
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setFormData({
      name: "",
      start_date: "",
      expiry_date: "",
      // add other fields from your formData here...
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const expiryDate = new Date(formData.expiry_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight for accurate day diff
    const diffDays = Math.floor(
      (expiryDate - today) / (1000 * 60 * 60 * 24)
    ) + 1;

    const submissionData = {
      ...formData,
      no_of_days: diffDays,
    };

    if (isDomainPage || category === "Domain") {
      if (edit) {
        const response = await updateDomain(
          domainData.data._id,
          submissionData
        );
        if (response.message === "Domain updated successfully") {
          toast.success(response.message);
          handleClose();
          setFormData({
            name: "",
            start_date: "",
            expiry_date: "",
            // clear other fields as needed...
          });
          domainRefetch();
        }
      } else {
        const response = await createDomain(submissionData, {
          category: "Domain",
        });
        if (response.data) {
          toast.success(response.message);
          handleClose();
          setFormData({
            name: "",
            start_date: "",
            expiry_date: "",
            // clear other fields as needed...
          });
          domainRefetch();
        } else {
          const error = response.error
            ? JSON.parse(response.error)
            : response.error;
          toast.error(error.message || "An error occurred");
        }
      }
    } else if (isSSLPage || category === "SSL") {
      if (edit) {
        const response = await updateSSL(sslData.data._id, submissionData);
        toast.success("SSL updated successfully");
        handleClose();
        setFormData({
          name: "",
          start_date: "",
          expiry_date: "",
          // clear other fields as needed...
        });
        sslRefetch();
      } else {
        const response = await createSSL(submissionData, {
          category: "Domain",
        });
        if (response.data) {
          toast.success(response.message);
          handleClose();
          setFormData({
            name: "",
            start_date: "",
            expiry_date: "",
            // clear other fields as needed...
          });
        } else {
          const error = response.error
            ? JSON.parse(response.error)
            : response.error;
          toast.error(error.message || "An error occurred");
        }

        sslRefetch();
      }
    }
  };

  return (
    <Box sx={{ m: 2 }}>
      {userType?.toLowerCase() === "admin" && (
        <Box
          sx={{ width: "100%", display: "flex", flexDirection: "row-reverse" }}
        >
          {(isSSLPage || isDomainPage) && (
            <Button
              variant="contained"
              onClick={() => {
                setEdit(false);

                setOpen(true);
              }}
            >
              {isSSLPage ? "Add SSL" : "Add Domain"}
            </Button>
          )}
        </Box>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>{edit ? "Edit Details" : "Enter Details"}</DialogTitle>

        <DialogContent>
          {sslLoading || domainLoading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={onSubmit} id="form-dialog">
              <TextField
                name={isDomainPage || category === "Domain" ? "domain" : "ssl"}
                label={isDomainPage ? "Domain" : "SSL"}
                value={
                  formData[
                    isDomainPage || category === "Domain" ? "domain" : "ssl"
                  ]
                }
                onChange={handleChange}
                fullWidth
                margin="dense"
                required
              />

              <TextField
                name="start_date"
                label="Start Date"
                value={formData.start_date}
                onChange={handleChange}
                fullWidth
                margin="dense"
                type="date"
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                name="expiry_date"
                label="Expiry Date"
                value={formData.expiry_date}
                onChange={handleChange}
                fullWidth
                margin="dense"
                type="date"
                InputLabelProps={{ shrink: true }}
                required
              />
              <FormControl fullWidth margin="dense" required>
                <FormLabel>Authority</FormLabel>
                <select
                  name="authority"
                  value={formData.authority}
                  onChange={handleChange}
                  style={{
                    padding: "10px",
                    borderRadius: 4,
                    borderColor: "#ccc",
                    marginTop: 4,
                  }}
                >
                  <option value="Godaddy">Godaddy</option>
                  <option value="Digicert">Digicert</option>
                </select>
              </FormControl>
              <TextField
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                margin="dense"
                multiline
                rows={3}
              />
              <TextField
                name="link"
                label="Link"
                value={formData.link}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />

              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <FormLabel component="legend">Duration</FormLabel>
                <RadioGroup
                  row
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value={"1"}
                    control={<Radio />}
                    label="1 Year"
                  />
                  <FormControlLabel
                    value={"2"}
                    control={<Radio />}
                    label="2 Years"
                  />
                  <FormControlLabel
                    value={"3"}
                    control={<Radio />}
                    label="3 Years"
                  />
                </RadioGroup>
              </FormControl>
            </form>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>

          <Button type="submit" form="form-dialog" variant="contained">
            {edit ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
};

export default FormDialog;
