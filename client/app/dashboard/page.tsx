"use client";

import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import ProductForm from "@/components/ProductForm";
import { useToast } from "@/utils/toast";
import useAuthStore from "@/store/auth.store";
import { Product } from "@/types/product.type";
import productService from "@/services/product.service";
import errorMessage from "@/utils/error-handler";

function DashboardContent() {
  const toast = useToast();
  const { user, isAdmin } = useAuthStore();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.getAll();
      setProducts(response.data);
    } catch (error: unknown) {
      const message = errorMessage(error);
      toast.showError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = () => {
    setSelectedProduct(null);
    setShowDialog(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowDialog(true);
  };

  const handleSaveProduct = async (data: any) => {
    try {
      if (selectedProduct) {
        const response = await productService.update(selectedProduct.id, data);
        toast.showSuccess(response.message);
      } else {
        const response = await productService.create(data);
        toast.showSuccess(response.message);
      }

      setShowDialog(false);
      setSelectedProduct(null);
      loadProducts();
    } catch (error: unknown) {
      toast.showError(errorMessage(error));
    }
  };

  const handleDeleteProduct = (id: number) => {
    confirmDialog({
      message: "Are you sure you want to delete this product?",
      header: "Confirm Delete",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: async () => {
        try {
          const response = await productService.delete(id);
          toast.showSuccess(response.message);
          loadProducts();
        } catch (error: unknown) {
          toast.showError(errorMessage(error));
        }
      },
    });
  };

  return (
    <>
      <ConfirmDialog />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />

        <div className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Product Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Welcome back,{" "}
                <span className="font-semibold">{user?.username}</span>!
              </p>
            </div>

            {isAdmin() && (
              <Button
                label="Create Product"
                icon="pi pi-plus"
                size="large"
                onClick={handleCreateProduct}
              />
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <i className="pi pi-spin pi-spinner text-4xl text-blue-500"></i>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <i className="pi pi-box text-6xl text-gray-400 mb-4"></i>
              <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
                No products found
              </h2>
              {isAdmin() && (
                <Button
                  label="Create First Product"
                  icon="pi pi-plus"
                  className="mt-4"
                  onClick={handleCreateProduct}
                />
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={isAdmin() ? handleEditProduct : undefined}
                  onDelete={isAdmin() ? handleDeleteProduct : undefined}
                  isAdmin={isAdmin()}
                />
              ))}
            </div>
          )}
        </div>

        <ProductForm
          visible={showDialog}
          product={selectedProduct}
          onHide={() => {
            setShowDialog(false);
            setSelectedProduct(null);
          }}
          onSave={handleSaveProduct}
        />
      </div>
    </>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
