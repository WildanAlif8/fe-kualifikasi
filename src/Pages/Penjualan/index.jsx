import React, { useState } from "react";
import FormPenjualan from "./FormPenjualan";
import PenjualanList from "./PenjualanList";
import FormItemPenjualan from "./FormItemPenjualan";

function Penjualan() {
  const [penjualanToEdit, setPenjualanToEdit] = useState(null);
  const [activeForm, setActiveForm] = useState(null); // 'create', 'edit', atau 'editItem'
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleSave = () => {
    setRefreshTrigger(!refreshTrigger);
    setPenjualanToEdit(null);
    setActiveForm(null);
  };

  const handleEditItemPenjualan = (penjualan) => {
    setPenjualanToEdit(penjualan);
    setActiveForm("editItem");
  };

  const handleAddNew = () => {
    setPenjualanToEdit(null);
    setActiveForm("create");
  };

  const onCancel = () => {
    setActiveForm(null);
  }

  return (
    <div>
      {activeForm === "create" && (
        <FormPenjualan penjualanToEdit={penjualanToEdit} onSave={handleSave} />
      )}
      {activeForm === "editItem" && (
        <FormItemPenjualan itemToEdit={penjualanToEdit} onSave={handleSave} onCancel={onCancel} />
      )}
      <PenjualanList
        onEdit={handleEditItemPenjualan}
        onAddNew={handleAddNew}
        refreshTrigger={refreshTrigger}
      />
    </div>
  );
}

export default Penjualan;
