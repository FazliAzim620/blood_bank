import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-toastify";

// ===================== LOGIN ACTION
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });
      // store token
      if (!data.success) {
        toast.danger(data.message);
      }
      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success(data.message);
        window.location.replace('/')
      }

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
// ===================  REGISTER ACTION
export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      email,
      password,
      role,
      name,
      hospitalName,
      organizationName,
      websites,
      address,
      phone,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("/auth/register", {
        email,
        password,
        role,
        name,
        hospitalName,
        organizationName,
        websites,
        address,
        phone,
      });
      // store token
      if (!data.success) {
        toast.danger(data.message);
      }
      if (data.success) {
        toast.success(data.message);
        window.location.replace("/login");
      }

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
//================ GET CURRENT USER
export const getCurrentUser = createAsyncThunk(
  "/auth/current-user",
  async ({ rejectWithValue }) => {
    try {
        const res=await API.get('/auth/current-user')
        if(res?.data){
        return res?.data
        }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
