import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

function DashboardCard({ title, count, icon, color }) {
  return (
    <Card style={{ minWidth: 275, height: "100%" }}>
      <CardContent>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              component="div"
              style={{ color: "text.secondary", marginBottom: 8 }}
            >
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {count}
            </Typography>
          </Box>
          <Box
            style={{
              backgroundColor: `${color}20`,
              borderRadius: "50%",
              padding: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {React.cloneElement(icon, {
              style: { fontSize: 40, color: color },
            })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default DashboardCard;
