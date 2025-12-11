"use client";

import useAuthStore from "@/store/auth.store";
import { Product } from "@/types/product.type";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { useState } from "react";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const { user } = useAuthStore();
  const isAdmin = user?.role === "ADMIN";

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const actionTemplate = (rowData: Product) => {
    if (!isAdmin) return null;

    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          severity="secondary"
          size="small"
          rounded
          outlined
          onClick={() => onEdit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          severity="danger"
          size="small"
          rounded
          outlined
          onClick={() => setSelectedProduct(rowData)}
        />
      </div>
    );
  };

  const handleDeleteConfirm = () => {
    if (selectedProduct) {
      onDelete(selectedProduct.id);
      setDeleteDialogVisible(false);
      setSelectedProduct(null);
    }
  };

  return (
    <>
      <DataTable
        value={products}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        paginatorTemplate="FirstPageLink PrevPageLink Pagelinks NextPageLink lastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        emptyMessage="No products found."
        className="shadow-lg rounded-lg"
      >
        <Column field="name" header="Name" sortable />
        <Column
          field="price"
          header="Price"
          sortable
          body={(rowData) => formatPrice(rowData.price)}
        />
        <Column field="stock" header="Stock" sortable />
        <Column
          header="Actions"
          body={actionTemplate}
          style={{ width: "100px" }}
        />
      </DataTable>
      <ConfirmDialog
        visible={deleteDialogVisible}
        onHide={() => setDeleteDialogVisible(false)}
        message={`Are you sure want to delete "${selectedProduct?.name}"?`}
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={handleDeleteConfirm}
        reject={() => setDeleteDialogVisible(false)}
        acceptLabel="Yes"
        rejectLabel="No"
      />
    </>
  );
}

export default ProductTable;
