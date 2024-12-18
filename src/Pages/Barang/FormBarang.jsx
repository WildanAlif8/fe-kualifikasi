import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Grid,
} from "@mui/material";

function FormBarang({ barangToEdit, onSave }) {
  const [formData, setFormData] = useState({
    nama: "",
    harga: "",
    warna: "",
    kategori: "",
  });

  useEffect(() => {
    if (barangToEdit) {
      setFormData(barangToEdit);
    } else {
      setFormData({ nama: "", harga: "", kategori: "" , warna: ""});
    }
  }, [barangToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (barangToEdit && barangToEdit.id) {
        await axios.put(
          `http://localhost:8000/api/barang/${formData.id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:8000/api/barang/store", formData);
      }
      onSave();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h4" component="h1" align="center">
          {barangToEdit ? "Edit Barang" : "Tambah Barang"}
        </Typography>

        <TextField
          fullWidth
          label="Nama Barang"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          required
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Warna"
          name="warna"
          value={formData.warna}
          onChange={handleChange}
          required
          variant="outlined"
        />

        <TextField
          fullWidth
          label="Harga"
          name="harga"
          type="number"
          value={formData.harga}
          onChange={handleChange}
          required
          variant="outlined"
          InputProps={{
            inputProps: {
              min: 0,
            },
          }}
        />

        <TextField
          fullWidth
          label="Kategori"
          name="kategori"
          value={formData.kategori}
          onChange={handleChange}
          required
          variant="outlined"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          {barangToEdit ? "Update" : "Simpan"}
        </Button>
      </Box>
    </Container>
  );
}

export default FormBarang;
