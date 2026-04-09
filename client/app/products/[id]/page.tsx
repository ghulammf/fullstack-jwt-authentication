import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import productService from "@/services/product.service";
import { Product } from "@/types/product.type";
import errorMessage from "@/utils/error-handler";
import { useToast } from "@/utils/toast";
import { useParams, useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { useEffect, useState } from "react";

function ProductDetailContent() {
  const router = useRouter();
  const params = useParams();
  const toast = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      loadProduct(params.id);
    }
  }, [params.id]);

  const loadProduct = async (id: number) => {
    setLoading(true);

    try {
      const response = await productService.getItem(id);
      setProduct(response.data);
    } catch (error: unknown) {
      toast.showError(errorMessage(error));
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />

        <div className="container mx-auto p-6">
          <Button
            label="Back to Dashboard"
            icon="pi pi-arrow-left"
            className="mb-6"
            onClick={() => router.push("/dashboard")}
          />

          {loading ? (
            <Card>
              <div className="space-y-4">
                <Skeleton width="100%" height="200px" />
                <Skeleton width="60%" height="30px" />
                <Skeleton width="40%" height="20px" />
                <Skeleton width="80%" height="20px" />
              </div>
            </Card>
          ) : product ? (
            <Card className="shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-linear-to-br from-blue-500 to-purple-600 rounded-lg p-12 flex items-center justify-center">
                  <i className="pi pi-box text-white text-9xl"></i>
                </div>

                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                      {product.name}
                    </h1>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      Rp {product.price.toLocaleString("id-ID")}
                    </p>
                  </div>

                  <div className="border-t dark:border-gray-700 pt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <i className="pi pi-inbox text-2xl text-gray-600 dark:text-gray-400"></i>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Stock Available
                        </p>
                        <p className="text-xl font-semibold">
                          {product.stock} units
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <i className="pi pi-calendar text-2xl text-gray-600 dark:text-gray-400"></i>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Created At
                        </p>
                        <p className="text-xl font-semibold">
                          {new Date(product.createdAt).toLocaleDateString(
                            "id-ID",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <i className="pi pi-clock text-2xl text-gray-600 dark:text-gray-400"></i>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Last Updated
                        </p>
                        <p className="text-xl font-semibold">
                          {new Date(product.updatedAt).toLocaleDateString(
                            "id-ID",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ) : null}
        </div>
      </div>
    </>
  );
}

function ProductDetailPage() {
  return (
    <ProtectedRoute>
      <ProductDetailContent />
    </ProtectedRoute>
  );
}

export default ProductDetailPage;
