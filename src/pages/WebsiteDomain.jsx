import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDomain } from "../api/hooks/mutations";
import StatusDashboard from "../components/Cards";
import FormDialog from "../components/Dialog";
import DataTable from "../components/Table";

export default function WebsiteDomain() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [filter, setFilter] = useState("All");

  const { data, refetch } = useDomain();

  useEffect(() => {
    if (!data) {
      refetch();
    }
  }, [data, refetch]);

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
        category={"Domain"}
        setEdit={setEdit}
        edit={edit}
        setOpen={setOpen}
        open={open}
      />
      {data && location.pathname === "/domains" && (
        <DataTable
          data={getFilteredData()}
          setEdit={setEdit}
          setId={setId}
          setOpen={setOpen}
        />
      )}
    </Box>
  );
}
