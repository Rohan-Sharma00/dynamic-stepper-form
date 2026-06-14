import { NavLink } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";

const sidebarWidth = 280;

function MainLayout({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#f8fafc", // slate-50
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      }}
    >
      {/* Material UI Permanent Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: sidebarWidth,
            boxSizing: "border-box",
            bgcolor: "#0f172a", // slate-900 (refined premium deep dark)
            color: "#f8fafc", // slate-50
            borderRight: "1px solid rgba(255, 255, 255, 0.06)",
            display: "flex",
            flexDirection: "column",
            boxShadow: "4px 0 24px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        {/* Header Branding Zone */}
        <Box sx={{ p: 3, borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Premium Icon Badge */}
            <Box
              sx={{
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", // Vivid modern blue gradient
                p: 1.2,
                borderRadius: "12px",
                boxShadow: "0 8px 16px rgba(59, 130, 246, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DynamicFormIcon sx={{ fontSize: 22, color: "#ffffff" }} />
            </Box>

            {/* Brand Text */}
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight="700"
                letterSpacing="-0.02em"
                sx={{ color: "#ffffff", lineHeight: 1.2, fontSize: "1rem" }}
              >
                Dynamic Forms
              </Typography>
              <Typography
                variant="caption"
                fontWeight="600"
                letterSpacing="0.06em"
                sx={{
                  color: "#93c5fd", // Soft blue text
                  display: "block",
                  mt: 0.3,
                  textTransform: "uppercase",
                  fontSize: 10,
                  opacity: 0.8,
                }}
              >
                Admin Console
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Navigation Link List */}
        <List sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
          {/* Form Builder Link */}
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to="/forms"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#2563eb" : "transparent",
                color: isActive ? "#ffffff" : "#94a3b8",
                borderRadius: "10px",
                padding: "12px 16px",
                transition: "all 0.2s ease-in-out",
              })}
              sx={{
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.04)",
                  color: "#ffffff",
                  "& .MuiListItemIcon-root": { color: "#ffffff" },
                },
                "&.active": {
                  boxShadow: "0 4px 12px rgba(37, 99, 245, 0.2)",
                  "&:hover": {
                    bgcolor: "#2563eb", // keep solid blue state on active hover
                  },
                },
                "&.active .MuiListItemIcon-root": { color: "#ffffff" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                <DescriptionIcon sx={{ fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      letterSpacing: "0.01em",
                    }}
                  >
                    Form Builder
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>

          {/* Submissions Link */}
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to="/submissions"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#2563eb" : "transparent",
                color: isActive ? "#ffffff" : "#94a3b8",
                borderRadius: "10px",
                padding: "12px 16px",
                transition: "all 0.2s ease-in-out",
              })}
              sx={{
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.04)",
                  color: "#ffffff",
                  "& .MuiListItemIcon-root": { color: "#ffffff" },
                },
                "&.active": {
                  boxShadow: "0 4px 12px rgba(37, 99, 245, 0.2)",
                  "&:hover": {
                    bgcolor: "#2563eb",
                  },
                },
                "&.active .MuiListItemIcon-root": { color: "#ffffff" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                <AssignmentIcon sx={{ fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      letterSpacing: "0.01em",
                    }}
                  >
                    Submissions
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 5,
          width: `calc(100% - ${sidebarWidth}px)`,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container
          maxWidth="xl"
          disableGutters
          sx={{
            margin: 0,
            animation: "fadeIn 0.4s ease-out",
            "@keyframes fadeIn": {
              from: { opacity: 0, transform: "translateY(4px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
}

export default MainLayout;
