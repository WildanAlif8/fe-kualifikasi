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
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function FormPenjualan({ penjualanToEdit, onSave }) {
  const [pelanggans, setPelanggans] = useState([]);
  const [barangs, setBarangs] = useState([]);
  const [formData, setFormData] = useState({
    tgl: "",
    pelanggan: "",
    alamat: "",
    warna: "",
    subtotal: 0,
    items: [{ barang: "", qty: 1 }],
  });

  useEffect(() => {
    if (penjualanToEdit) {
      console.log("PenjualanToEdit:", penjualanToEdit);
      setFormData({
        tgl: penjualanToEdit.tgl || "",
        pelanggan: penjualanToEdit.kode || "",
        subtotal: penjualanToEdit.subtotal || 0,
        items: penjualanToEdit.item_penjualan
          ? penjualanToEdit.item_penjualan.map((item) => ({
              barang: item.kode,
              qty: item.qty,
            }))
          : [{ barang: "", qty: 1 }],
      });
    } else {
      setFormData({
        tgl: "",
        pelanggan: "",
        warna: "",
        alamat: "",
        subtotal: 0,
        items: [{ barang: "", qty: 1 }],
      });
    }
  }, [penjualanToEdit]);

  const fetchPelanggan = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/pelanggan");

      console.log(response.data);

      setPelanggans(response.data);
    } catch (error) {
      console.error("Error fetching pelanggan:", error);
    }
  };

  const fetchBarang = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/barang");
      console.log(response.data);
      setBarangs(response.data);
    } catch (error) {
      console.error("Error fetching barang:", error);
    }
  };

  useEffect(() => {
    fetchPelanggan();
    fetchBarang();
  }, []);

  useEffect(() => {
    const calculateSubtotal = () => {
      const total = formData.items.reduce((acc, item) => {
        const barang = barangs.find((b) => b.kode === item.barang);
        return acc + (barang ? barang.harga * item.qty : 0);
      }, 0);
      setFormData((prev) => ({ ...prev, subtotal: total }));
    };

    calculateSubtotal();
  }, [formData.items, barangs]);

  const handleChange = (e, index = null) => {
    const name = e.target ? e.target.name : e.name;
    const value = e.target ? e.target.value : e;

    if (!formData) {
      console.error("FormData is undefined");
      return;
    }

    try {
      if (index === null) {
        console.log("Main form change:", name, value);
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      } else {
        console.log("Item change:", name, value, "at index", index);
        const newItems = [...formData.items];
        if (newItems[index]) {
          newItems[index][name] = value;
          setFormData((prev) => ({
            ...prev,
            items: newItems,
          }));
        }
      }
    } catch (error) {
      console.error("Error in handleChange:", error);
    }
  };

  const addItemRow = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { barang: "", qty: 1 }],
    }));
  };

  const removeItemRow = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      items: newItems.length ? newItems : [{ barang: "", qty: 1 }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData.pelanggan);
      const dataToSubmit = {
        tgl: formData.tgl,
        pelanggan: formData.pelanggan,
        alamat: formData.alamat,
        warna: formData.pelanggan,
        subtotal: formData.subtotal,
        items: formData.items,
      };

      if (penjualanToEdit && penjualanToEdit.id) {
        await axios.put(
          `http://localhost:8000/api/penjualan/update/${penjualanToEdit.id}`,
          dataToSubmit
        );
      } else {
        await axios.post(
          "http://localhost:8000/api/penjualan/store",
          dataToSubmit
        );
      }

      onSave();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          {penjualanToEdit ? "Edit Penjualan" : "Tambah Penjualan"}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              name="tgl"
              label="Tanggal"
              value={formData.tgl}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Pelanggan</InputLabel>
              <Select
                name="pelanggan"
                value={formData.pelanggan}
                label="Pelanggan"
                onChange={(e) => handleChange(e)}
              >
                {pelanggans.map((pelanggan) => (
                  <MenuItem key={pelanggan.kode} value={pelanggan.kode}>
                    {pelanggan.nama}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Warna</InputLabel>
              <Select
                name="warna"
                value={formData.warna}
                label="warna"
                onChange={(e) => handleChange(e)}
              >
                {barangs.map((barang) => (
                      <MenuItem key={barang.kode} value={barang.kode}>
                        {barang.nama} - Rp {barang.harga} - Warna {barang.warna}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
          </Grid> */}

          {/* Dynamic Item Rows */}
          {formData.items.map((item, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} md={5}>
                <FormControl fullWidth required>
                  <InputLabel>Barang</InputLabel>
                  <Select
                    name="barang"
                    value={item.barang}
                    label="Barang"
                    onChange={(e) => handleChange(e, index)}
                  >
                    {barangs.map((barang) => (
                      <MenuItem key={barang.kode} value={barang.kode}>
                        {barang.nama} - Rp {barang.harga} - Warna {barang.warna}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  type="number"
                  name="qty"
                  label="Quantity"
                  value={item.qty}
                  onChange={(e) => handleChange(e, index)}
                  inputProps={{ min: 1 }}
                  required
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  type="number"
                  label="Subtotal"
                  value={
                    item.barang
                      ? (barangs.find((b) => b.kode === item.barang)?.harga ||
                          0) * item.qty
                      : 0
                  }
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                md={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {formData.items.length > 1 && (
                  <IconButton
                    color="error"
                    onClick={() => removeItemRow(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Grid>
            </React.Fragment>
          ))}

          <Grid item xs={12}>
            <Button
              startIcon={<AddCircleIcon />}
              variant="outlined"
              color="primary"
              onClick={addItemRow}
            >
              Tambah Barang
            </Button>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              name="subtotal"
              label="Total Penjualan"
              value={formData.subtotal}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Alamat</InputLabel>
              <Select
                name="alamat"
                value={formData.alamat}
                label="alamat"
                onChange={(e) => handleChange(e)}
              >
                {pelanggans.map((pelanggan) => (
                  <MenuItem key={pelanggan.kode} value={pelanggan.kode}>
                    {pelanggan.alamat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {penjualanToEdit ? "Update" : "Simpan"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default FormPenjualan;
