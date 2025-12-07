"use client";

import { ProductRequset, ProductResponse } from "@/types/product.type";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

interface ProductCardProps {
  product: ProductResponse;
  onEdit?: (product: ProductRequset) => void;
  onDelete?: (id: number) => void;
  isAdmin?: boolean;
}

function ProductCard({ product, onEdit, onDelete, isAdmin }: ProductCardProps) {
  const header = (
    <div className="bg-linear-to-r from-blue-50 to-purple-600 h-32 flex items-center justify-center">
      <i className="pi pi-box text-white text-4xl"></i>
    </div>
  );

  const footer = (
    <div className="flex gap-2">
      {isAdmin && onEdit && (
        <Button
          label="Edit"
          icon="pi pi-pencil"
          className="flex-1"
          onClick={() => onEdit(product)}
        />
      )}
      {isAdmin && onDelete && (
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          className="flex-1"
          onClick={() => onDelete(product.id)}
        />
      )}
    </div>
  );

  return (
    <Card
      title={product.name}
      subTitle={`Stock: ${product.stock}`}
      header={header}
      footer={isAdmin ? footer : undefined}
      className="shadow-lg"
    >
      <div className="space-y-2">
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Rp {product.price.toLocaleString("id-ID")}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Created: {new Date(product.createdAt).toLocaleDateString("id-ID")}
        </p>
      </div>
    </Card>
  );
}

export default ProductCard;
