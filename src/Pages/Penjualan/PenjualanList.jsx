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
  Box,
  Button,
  IconButton,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Edit, Delete, Add as AddIcon } from "@mui/icons-material";

function PenjualanList({ onEdit, onAddNew, refreshTrigger }) {
  const [penjualanData, setPenjualanData] = useState([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [penjualanToDelete, setPenjualanToDelete] = useState(null);

  const fetchPenjualan = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/penjualan");
      console.log(response.data);
      setPenjualanData(response.data);
    } catch (error) {
      console.error("Error fetching penjualan data:", error);
    }
  };

  useEffect(() => {
    fetchPenjualan();
  }, [refreshTrigger]);

  const deletePenjualan = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/penjualan/delete/${id}`);
      fetchPenjualan();
      setDeleteConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleDeleteConfirm = (penjualan) => {
    setPenjualanToDelete(penjualan);
    setDeleteConfirmOpen(true);
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
          Data Penjualan
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onAddNew}
        >
          Tambah Penjualan
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-label="penjualan table">
          <TableHead>
            <TableRow>
              <TableCell>Tanggal</TableCell>
              <TableCell>Pelanggan</TableCell>
              <TableCell>Barang</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {penjualanData.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{item?.penjualan?.tgl}</TableCell>
                <TableCell>{item.penjualan?.pelanggan?.nama}</TableCell>
                <TableCell>{item.barang?.nama}</TableCell>
                <TableCell>{item?.qty}</TableCell>
                <TableCell>
                  Rp {(item?.qty * item.barang?.harga).toLocaleString("id-ID")}
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                  >
                    <IconButton
                      color="primary"
                      onClick={() => onEdit(item)}
                      size="small"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteConfirm(item.id)}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Konfirmasi Hapus</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menghapus data penjualan berikut?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="primary">
            Batal
          </Button>
          <Button
            onClick={() => deletePenjualan(penjualanToDelete)}
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

export default PenjualanList;
