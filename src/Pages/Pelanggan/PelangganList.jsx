import React, { useEffect, useState } from "react";
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
  Chip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";

function PelangganList({ onEdit, refreshTrigger, onAddNew }) {
  const [pelanggans, setPelanggans] = useState([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [pelangganToDelete, setPelangganToDelete] = useState(null);

  const fetchPelanggans = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/pelanggan");
      setPelanggans(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deletePelanggan = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/pelanggan/${id}`);
      fetchPelanggans();
      setDeleteConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleDeleteConfirm = (pelanggan) => {
    setPelangganToDelete(pelanggan);
    setDeleteConfirmOpen(true);
  };

  useEffect(() => {
    fetchPelanggans();
  }, [refreshTrigger]);

  const getGenderColor = (jenisKelamin) => {
    return jenisKelamin === "Laki-laki" ? "primary" : "secondary";
  };

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
          Data Pelanggan
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onAddNew}
        >
          Tambah Pelanggan
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Jenis Kelamin</TableCell>
              <TableCell>Domisili</TableCell>
              <TableCell>Alamat</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pelanggans.map((pelanggan, index) => (
              <TableRow
                key={pelanggan.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "action.hover" },
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{pelanggan.nama}</TableCell>
                <TableCell>
                  <Chip
                    label={pelanggan.jenis_kelamin}
                    color={getGenderColor(pelanggan.jenis_kelamin)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{pelanggan.domisili}</TableCell>
                <TableCell>{pelanggan.alamat}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => onEdit(pelanggan)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteConfirm(pelanggan)}
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
            Apakah Anda yakin ingin menghapus pelanggan "
            {pelangganToDelete?.nama}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="primary">
            Batal
          </Button>
          <Button
            onClick={() => deletePelanggan(pelangganToDelete?.id)}
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

export default PelangganList;
