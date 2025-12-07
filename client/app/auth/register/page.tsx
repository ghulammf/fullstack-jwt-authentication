"use client";

import authService from "@/services/auth.service";
import { useToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";

function RegisterPage() {
  const router = useRouter();
  const toast = useToast();
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);

    try {
      const response = await authService.register(formData);
      toast.showSuccess(response.message);
      router.push("/auth/login");
    } catch (error: any) {
      toast.showError(error.response?.data?.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <Card className="w-full max-w-md shadow-2xl rounded-2xl">
          {/* Header */}
          <div className="text-center mb-14">
            <i className="pi pi-user-plus text-6xl text-blue-500 mb-4"></i>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Register
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Create Your Account
            </p>
          </div>

          {/* Field Input */}
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Username</label>
              <InputText
                id="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                placeholder="Enter username"
                className="w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email">Username</label>
              <InputText
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter Email"
                className="w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <Password
                className="w-full"
                inputClassName="w-full"
                inputId="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter Password"
                toggleMask
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirm_password">Confirm Password</label>
              <Password
                inputId="confirm_password"
                value={formData.confirm_password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirm_password: e.target.value,
                  })
                }
                placeholder="Enter Confirm Password"
                inputClassName="w-full"
                toggleMask
              />
            </div>

            {/* Button Input */}
            <div className="w-full text-center">
              <Button
                label="Register"
                icon="pi pi-user-plus"
                loading={loading}
                onClick={handleSubmit}
                className="bg-blue-400 justify-center gap-3 h-fit"
              />
            </div>

            {/* Confirmation */}
            <div className="flex items-baseline justify-center">
              <span className="text-gray-600 dark:text-gray-400">
                Already have an Account?
              </span>
              <Button
                label="Login"
                link
                onClick={() => router.push("/auth/login")}
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export default RegisterPage;
