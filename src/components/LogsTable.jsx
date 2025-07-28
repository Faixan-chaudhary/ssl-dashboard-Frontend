import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns = [
  { field: "username", headerName: "Username", width: 200 },
  { field: "role", headerName: "Role", width: 120 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "action", headerName: "Action", width: 200 },
  { 
    field: "date", 
    headerName: "Date", 
    width: 250,
  },
];

// Function to format time (HH:MM AM/PM)
const formatTime = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return isNaN(date.getTime()) 
    ? "Invalid Time" 
    : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default function LogsTable({ data }) {
  const formattedRows = data?.activities?.map((activity, index) => ({
    id: index, // DataGrid requires a unique 'id'
    username: activity?.user_id?.username || "N/A",
    role: activity?.user_id?.role || "N/A",
    email: activity?.user_id?.email || "N/A",
    action: activity?.action,
    date: `${activity?.date || "N/A"} ${formatTime(activity?.timestamp)}`, // Combine date + time
  })) || [];

  return (
    <Paper sx={{ height: '100%',maxHeight:'100vh', width: "100%" }}>
      <DataGrid
        rows={formattedRows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
