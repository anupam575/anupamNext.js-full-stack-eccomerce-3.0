"use client";

import { useSelector } from "react-redux";
import { Card, CardContent, CircularProgress, Typography, Avatar } from "@mui/material";

export default function GetUser() {
  const { user, loading, error, authChecked } =
    useSelector((state) => state.auth);

  if (!authChecked) {
    return (
      <div className="flex justify-center my-10">
        <CircularProgress />
        <Typography className="ml-2">Checking auth...</Typography>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center my-10">
        <CircularProgress />
        <Typography className="ml-2">Loading user...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <Typography color="error" className="text-center my-4">
        {error}
      </Typography>
    );
  }

  if (!user) {
    return (
      <Typography className="text-center text-gray-500 mt-4">
        No user found
      </Typography>
    );
  }

  const formatDate = (dateString) => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(dateString));
    } catch {
      return "Date not available";
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 py-10">
      <div className="w-full max-w-md">
        <Typography variant="h5" className="mb-4 font-bold">
          User Details
        </Typography>

        <Card>
          <CardContent className="space-y-2">
            <Typography><strong>Name:</strong> {user.name}</Typography>
            <Typography><strong>Email:</strong> {user.email}</Typography>

            <div className="flex justify-center my-2">
              <Avatar
                src={user.avatar}
                alt={user.name}
                sx={{ width: 100, height: 100 }}
              />
            </div>

            <Typography><strong>Role:</strong> {user.role}</Typography>
            <Typography>
              <strong>Joined:</strong>{" "}
              {user.createdAt ? formatDate(user.createdAt) : "N/A"}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

