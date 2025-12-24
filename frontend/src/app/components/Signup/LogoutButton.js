"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import API from "../../../utils/axiosInstance";
import { clearUser } from "../../../redux/slices/authSlice";
import { Button, CircularProgress } from "@mui/material";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      // 🔥 backend logout
      await API.post("/logout");

      // 🔥 clear redux auth state
      dispatch(clearUser());

      toast.success("✅ Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Logout failed, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      color="error"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : "Logout"}
    </Button>
  );
};

export default LogoutButton;

