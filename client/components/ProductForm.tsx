"use client";

import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Product } from "@/types/product.type";

interface ProductFormProps {
  visible: boolean;
  product?: Product | null;
  onHide: () => void;
  onSave: (data: any) => void;
}

export default function ProductForm({
  visible,
  product,
  onHide,
  onSave,
}: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        stock: product.stock,
      });
    } else {
      setFormData({
        name: "",
        price: 0,
        stock: 0,
      });
    }
  }, [product]);

  const handleSubmit = () => {
    onSave(formData);
    setFormData({ name: "", price: 0, stock: 0 });
  };

  return (
    <Dialog
      header={product ? "Edit Product" : "Create Product"}
      visible={visible}
      style={{ width: "450px" }}
      onHide={onHide}
      footer={
        <div className="flex gap-2">
          <Button label="Cancel" severity="secondary" onClick={onHide} />
          <Button label="Save" onClick={handleSubmit} />
        </div>
      }
    >
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-semibold">
            Product Name
          </label>
          <InputText
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter product name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="font-semibold">
            Price (Rp)
          </label>
          <InputNumber
            id="price"
            value={formData.price}
            onValueChange={(e) =>
              setFormData({ ...formData, price: e.value || 0 })
            }
            mode="currency"
            currency="IDR"
            locale="id-ID"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="stock" className="font-semibold">
            Stock
          </label>
          <InputNumber
            id="stock"
            value={formData.stock}
            onValueChange={(e) =>
              setFormData({ ...formData, stock: e.value || 0 })
            }
            min={0}
          />
        </div>
      </div>
    </Dialog>
  );
}
