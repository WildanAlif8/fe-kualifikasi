import React, { useState } from "react";
import BarangList from "./BarangList";
import FormBarang from "./FormBarang";

function Barang() {
  const [barangToEdit, setBarangToEdit] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleEditBarang = (barang) => {
    setBarangToEdit(barang);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setBarangToEdit(null);
    setIsFormOpen(true);
  };

  const handleSave = () => {
    setRefreshTrigger(!refreshTrigger);
    setBarangToEdit(null);
    setIsFormOpen(false);
  };

  return (
    <div>
      {isFormOpen && (
        <FormBarang barangToEdit={barangToEdit} onSave={handleSave} />
      )}
      <BarangList
        onEdit={handleEditBarang}
        onAddNew={handleAddNew}
        refreshTrigger={refreshTrigger}
      />
    </div>
  );
}

export default Barang;
