import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import DashboardCard from "./DashboardCard";
import { ShoppingCart, Users, Package, DollarSign } from "lucide-react";
import axios from "axios";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState([
    {
      title: "Total Penjualan",
      count: 0,
      icon: <ShoppingCart size={24} />,
      color: "#2196f3",
    },
    {
      title: "Total Pelanggan",
      count: 0,
      icon: <Users size={24} />,
      color: "#4caf50",
    },
    {
      title: "Total Barang",
      count: 0,
      icon: <Package size={24} />,
      color: "#f44336",
    },
    {
      title: "Total Pendapatan",
      count: 0,
      icon: <DollarSign size={24} />,
      color: "#ff9800",
      prefix: "Rp ",
      format: "currency",
    },
  ]);

  const fetchDashboardData = async () => {
    try {
      const [penjualanRes, pelangganRes, barangRes, pendapatanRes] =
        await Promise.all([
          axios.get("http://localhost:8000/api/penjualan/count"),
          axios.get("http://localhost:8000/api/pelanggan/count"),
          axios.get("http://localhost:8000/api/barang/count"),
          axios.get("http://localhost:8000/api/pendapatan/count"),
        ]);

      setDashboardData([
        {
          title: "Total Penjualan",
          count: penjualanRes.data.count,
          icon: <ShoppingCart size={24} />,
          color: "#2196f3",
        },
        {
          title: "Total Pelanggan",
          count: pelangganRes.data.count,
          icon: <Users size={24} />,
          color: "#4caf50",
        },
        {
          title: "Total Barang",
          count: barangRes.data.count,
          icon: <Package size={24} />,
          color: "#f44336",
        },
        {
          title: "Total Pendapatan",
          count: pendapatanRes.data.count,
          icon: <DollarSign size={24} />,
          color: "#ff9800",
          prefix: "Rp ",
          format: "currency",
        },
      ]);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatCurrency = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const renderCount = (item) => {
    if (item.format === "currency") {
      return formatCurrency(item.count);
    }
    return item.count;
  };

  return (
    <Box
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "32px 0",
        marginRight: "32px",
        marginLeft: "32px",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        style={{ marginBottom: 32, fontWeight: "bold" }}
      >
        Manajemen Data
      </Typography>
      <Grid container spacing={3}>
        {dashboardData.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardCard
              title={item.title}
              count={renderCount(item)}
              icon={item.icon}
              color={item.color}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;
