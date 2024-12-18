import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

function FormItemPenjualan({ itemToEdit, onSave, onCancel }) {
  const [barangs, setBarangs] = useState([]);
  const [formData, setFormData] = useState({
    barang: "",
    qty: 1,
  });

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        barang: itemToEdit.kode_barang || "",
        qty: itemToEdit.qty || 1,
      });
    }
  }, [itemToEdit]);

  const fetchBarang = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/barang");
      setBarangs(response.data);
    } catch (error) {
      console.error("Error fetching barang:", error);
    }
  };

  useEffect(() => {
    fetchBarang();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8000/api/penjualan/update/${itemToEdit.id}`,
        formData
      );
      onSave();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Edit Item Penjualan
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Barang</InputLabel>
              <Select
                name="barang"
                value={formData.barang}
                label="Barang"
                onChange={(e) => handleChange(e)}
              >
                {barangs.map((barang) => (
                  <MenuItem key={barang.kode} value={barang.kode}>
                    {barang.nama} - Rp {barang.harga} - Warna {barang.warna}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              name="qty"
              label="Quantity"
              value={formData.qty}
              onChange={handleChange}
              inputProps={{ min: 1 }}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Simpan Perubahan
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={onCancel}
            >
              Batal
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default FormItemPenjualan;
