import React, { useState } from "react";
import FormPelanggan from "./FormPelanggan";
import PelangganList from "./PelangganList";

const Pelanggan = () => {
  const [pelangganToEdit, setPelangganToEdit] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleEdit = (pelanggan) => {
    setPelangganToEdit(pelanggan);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setPelangganToEdit(null);
    setIsFormOpen(true);
  };

  const handleSave = () => {
    setRefreshTrigger(!refreshTrigger);
    setPelangganToEdit(null);
    setIsFormOpen(false);
  };

  return (
    <div>
      {isFormOpen && (
        <FormPelanggan pelangganToEdit={pelangganToEdit} onSave={handleSave} />
      )}
      <PelangganList
        onEdit={handleEdit}
        onAddNew={handleAddNew}
        refreshTrigger={refreshTrigger}
      />
    </div>
  );
};

export default Pelanggan;
