"use client";

import authService from "@/services/auth.service";
import useAuthStore from "@/store/auth.store";
import { useToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import React, { useState } from "react";

function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const toast = useToast();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.login(formData);
      setAuth(response.accessToken, response.user);
      toast.showSuccess(response.message);
      router.push("/dashboard");
    } catch (error: any) {
      toast.showError(error.response?.data?.message || "Failed to Login");
    } finally {
      setLoading(false);
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
              Login
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Welcome Back
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
              <label htmlFor="password">Password</label>
              <Password
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter Password"
                inputClassName="w-full"
              />
            </div>

            {/* Button Input */}
            <div className="w-full text-center">
              <Button
                label="Login"
                icon="pi pi-user-plus"
                loading={loading}
                onClick={handleSubmit}
                className="bg-blue-400 justify-center gap-3 h-fit"
              />
            </div>

            {/* Confirmation */}
            <div className="flex items-baseline justify-center">
              <span className="text-gray-600 dark:text-gray-400">
                Haven&#39;t an Account?
              </span>
              <Button
                label="Register"
                link
                onClick={() => router.push("/auth/register")}
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export default LoginPage;
