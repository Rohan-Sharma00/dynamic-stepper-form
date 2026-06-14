import { NavLink } from "react-router-dom";

import { Box, Stack, Typography, Avatar } from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";

function Sidebar() {
  // Centralized navigation items configuration array
  const menuItems = [
    { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { text: "Form Builder", path: "/forms", icon: <DescriptionIcon /> },
    { text: "Submissions", path: "/submissions", icon: <AssignmentIcon /> },
  ];

  return (
    <Box
      sx={{
        width: 288, // Equivalent to w-72 (72 * 4px)
        bgcolor: "#0f172a", // Deep slate-900 background palette accent
        color: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", // shadow-2xl
        borderRight: "1px solid",
        borderColor: "#1e293b", // slate-800 matching delimiter accent
      }}
    >
      {/* Brand App Branding Area */}
      <Box sx={{ p: 3, borderBottom: "1px solid", borderColor: "#1e293b" }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            variant="rounded"
            sx={{
              bgcolor: "#2563eb", // blue-600 core engine state branding
              width: 44,
              height: 44,
              borderRadius: "12px",
            }}
          >
            <DynamicFormIcon sx={{ fontSize: 24, color: "#ffffff" }} />
          </Avatar>

          <Box>
            <Typography variant="h6" fontWeight="800" sx={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Dynamic Forms
            </Typography>
            <Typography variant="caption" sx={{ color: "#94a3b8", display: "block", mt: 0.2 }}>
              v1.0.0 Stable Build
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Main Core Navigation Links Wrapper */}
      <Stack spacing={1} sx={{ p: 2 }}>
        {menuItems.map((item) => (
          <Box
            key={item.text}
            component={NavLink}
            to={item.path}
            style={{ textDecoration: "none" }} // Strips default browser underline links
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 2.5,
              py: 1.5,
              borderRadius: "12px",
              transition: "all 0.2s ease-in-out",
              fontWeight: 600,
              fontSize: "0.95rem",
              
              // Dynamic state interpolation callback handler
              "&.active": {
                bgcolor: "#2563eb",
                color: "#ffffff",
                boxShadow: "0 4px 14px rgba(37, 99, 235, 0.4)",
                "& .MuiSvgIcon-root": { color: "#ffffff" },
              },
              "&:not(.active)": {
                color: "#cbd5e1", // text-slate-300 palette color default state
                "& .MuiSvgIcon-root": { color: "#94a3b8", transition: "color 0.2s" },
                "&:hover": {
                  bgcolor: "#1e293b", // slate-800 visual feedback trigger
                  color: "#ffffff",
                  "& .MuiSvgIcon-root": { color: "#ffffff" },
                },
              },
            })}
          >
            {item.icon}
            {item.text}
          </Box>
        ))}
      </Stack>

      {/* Optional Foot Anchor Account Container */}
      <Box sx={{ mt: "auto", p: 3 }}>
        <Box
          sx={{
            bgcolor: "#1e293b",
            borderRadius: "14px",
            p: 2,
            border: "1px solid",
            borderColor: "#334155",
            textAlign: "center"
          }}
        >
          <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 500 }}>
            Logged in as Administrator
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;