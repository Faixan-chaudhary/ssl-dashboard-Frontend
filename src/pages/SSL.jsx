import React, { useEffect, useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/system";
import { useSSL } from "../api/hooks/mutations";
import { useLocation } from "react-router-dom";
import DataTable from "../components/Table";
import StatusDashboard from "../components/Cards";
import FormDialog from "../components/Dialog";

const PageContainer = styled(Box)({
  minHeight: "100vh",
  background: "#f8fafc",
  padding: "24px 16px",
  position: "relative",
  overflow: "hidden",
});

const ContentWrapper = styled(Box)({
  position: "relative",
  zIndex: 1,
  maxWidth: "1400px",
  margin: "0 auto",
  width: "100%",
});

const PageHeader = styled(motion.div)({
  textAlign: "center",
  marginBottom: "32px",
  padding: "32px 0",
});

const PageTitle = styled(Typography)({
  fontSize: "2.5rem",
  fontWeight: 700,
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  marginBottom: "8px",
  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
});

const PageSubtitle = styled(Typography)({
  fontSize: "1.1rem",
  color: "#64748b",
  fontWeight: 500,
  maxWidth: "600px",
  margin: "0 auto",
  lineHeight: 1.6,
});

const FloatingElement = styled(motion.div)({
  display: "none",
});

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  console.log("API Data:", data);

  return (
    <PageContainer>


      <ContentWrapper>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >


          {/* Status Dashboard */}
          <motion.div variants={itemVariants}>
            <StatusDashboard data={data} onCardClick={setFilter} />
          </motion.div>

          {/* Data Table */}
          <motion.div variants={itemVariants}>
            {data && location.pathname === "/ssl" && (
              <DataTable
                data={getFilteredData()}
                setEdit={setEdit}
                id={id}
                setId={setId}
                setOpen={setOpen}
                onResetFilter={() => setFilter("All")}
              />
            )}
          </motion.div>
        </motion.div>
      </ContentWrapper>

      {/* Form Dialog */}
      <FormDialog
        id={id}
        category={"SSL"}
        setEdit={setEdit}
        edit={edit}
        setOpen={setOpen}
        open={open}
      />
    </PageContainer>
  );
}
