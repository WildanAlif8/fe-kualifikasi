import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";

function BarangList({ onEdit = () => {}, onAddNew, refreshTrigger }) {
  const [barangs, setBarangs] = useState([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [barangToDelete, setBarangToDelete] = useState(null);

  const fetchBarangs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/barang");
      setBarangs(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteBarang = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/barang/${id}`);
      fetchBarangs();
      setDeleteConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleDeleteConfirm = (barang) => {
    setBarangToDelete(barang);
    setDeleteConfirmOpen(true);
  };

  useEffect(() => {
    fetchBarangs();
  }, [refreshTrigger]);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          Data Barang
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onAddNew}
        >
          Tambah Barang
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nama Barang</TableCell>
              <TableCell>Harga</TableCell>
              <TableCell>Warna</TableCell>
              <TableCell>Kategori</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {barangs.map((barang, index) => (
              <TableRow
                key={barang.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "action.hover" },
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{barang.nama}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(barang.harga)}
                </TableCell>
                <TableCell>{barang.kategori}</TableCell>
                <TableCell>{barang.warna}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => onEdit(barang)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteConfirm(barang)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Konfirmasi Hapus</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menghapus barang "{barangToDelete?.nama}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="primary">
            Batal
          </Button>
          <Button
            onClick={() => deleteBarang(barangToDelete?.id)}
            color="error"
            variant="contained"
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default BarangList;
