import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";

function FormPelanggan({ pelangganToEdit, onSave }) {
  const [formData, setFormData] = useState({
    nama: "",
    jenis_kelamin: "",
    domisili: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (pelangganToEdit) {
      setFormData(pelangganToEdit);
    } else {
      setFormData({ nama: "", jenis_kelamin: "", domisili: "" });
    }
  }, [pelangganToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nama.trim()) {
      newErrors.nama = "Nama harus diisi";
    }
    if (!formData.jenis_kelamin) {
      newErrors.jenis_kelamin = "Jenis kelamin harus dipilih";
    }
    if (!formData.domisili.trim()) {
      newErrors.domisili = "Domisili harus diisi";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      if (pelangganToEdit && pelangganToEdit.id) {
        await axios.put(
          `http://localhost:8000/api/pelanggan/${pelangganToEdit.id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:8000/api/pelanggan/store", formData);
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
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mt: 4,
        }}
      >
        <Typography variant="h4" component="h1" align="center">
          {pelangganToEdit ? "Edit Pelanggan" : "Tambah Pelanggan"}
        </Typography>

        <TextField
          fullWidth
          label="Nama"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          error={!!errors.nama}
          helperText={errors.nama}
          variant="outlined"
          required
        />

        <FormControl
          fullWidth
          variant="outlined"
          error={!!errors.jenis_kelamin}
          required
        >
          <InputLabel>Jenis Kelamin</InputLabel>
          <Select
            name="jenis_kelamin"
            value={formData.jenis_kelamin}
            onChange={handleChange}
            label="Jenis Kelamin"
          >
            <MenuItem value="PRIA">Pria</MenuItem>
            <MenuItem value="WANITA">Wanita</MenuItem>
          </Select>
          {errors.jenis_kelamin && (
            <FormHelperText>{errors.jenis_kelamin}</FormHelperText>
          )}
        </FormControl>

        <TextField
          fullWidth
          label="Domisili"
          name="domisili"
          value={formData.domisili}
          onChange={handleChange}
          error={!!errors.domisili}
          helperText={errors.domisili}
          variant="outlined"
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          {pelangganToEdit ? "Update" : "Simpan"}
        </Button>
      </Box>
    </Container>
  );
}

export default FormPelanggan;
