import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useSSL } from "../api/hooks/mutations";
import { useLocation } from "react-router-dom";
import DataTable from "../components/Table";
import StatusDashboard from "../components/Cards";
import FormDialog from "../components/Dialog";

export default function SSL() {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [filter, setFilter] = useState("All");

  const { data, refetch } = useSSL();
  const location = useLocation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const getFilteredData = () => {
    if (!data) return [];
    if (filter === "All") return data;
    if (filter === "Near to Expire") return data.filter(item => item.no_of_days <= 30 && item.no_of_days > 0);
    if (filter === "Expired") return data.filter(item => item.no_of_days <= 0);
    if (filter === "Safe Zone") return data.filter(item => item.no_of_days > 30);
    return data;
  };

  console.log("API Data:", data);

  return (
    <Box sx={{ marginTop: "30px", overflow: "hidden" }}>
      <StatusDashboard data={data} onCardClick={setFilter} />
      <FormDialog
        id={id}
        category={"SSL"}
        setEdit={setEdit}
        edit={edit}
        setOpen={setOpen}
        open={open}
      />
      {data && location.pathname === "/ssl" && (
        <DataTable
          data={getFilteredData()}
          setEdit={setEdit}
          id={id}
          setId={setId}
          setOpen={setOpen}
        />
      )}
    </Box>
  );
}
