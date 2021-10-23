import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthState,
  Cred,
  JWT,
  PostProf,
  Profile,
} from "../../types/loginTypes";
import axios from "axios";
import { RootState } from "../../app/store";
import { apiUrl } from "../../url";

export const fetchAsyncLogin = createAsyncThunk(
  "auth/post",
  async (authen: Cred) => {
    const res = await axios.post<JWT>(`${apiUrl}authen/jwt/create/`, authen, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const fetchAsyncRegister = createAsyncThunk(
  "auth/register",
  async (authen: Cred) => {
    const res = await axios.post(`${apiUrl}api/register/`, authen, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const fetchAsyncCreateProf = createAsyncThunk(
  "auth/createProfile",
  async () => {
    const res = await axios.post(
      `${apiUrl}api/profile/`,
      { img: null, introduction: undefined },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncUpdateProf = createAsyncThunk(
  "auth/updateProfile",
  async (profile: PostProf) => {
    const uploadData = new FormData();
    profile.img && uploadData.append("img", profile.img, profile.img.name);
    profile.introduction &&
      uploadData.append("introduction", profile.introduction);
    const res = await axios.put<Profile>(
      `${apiUrl}api/profile/${profile.id}/`,
      uploadData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

const initialState: AuthState = {
  isOpenEditProfModal: false,
  editedProf: {
    id: "",
    img: null,
    introduction: "",
  },
  selectedProf: {
    id: "",
    img: undefined,
    introduction: "",
    user_profile: 0,
    user_profile_username: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEditProf: (state, action: PayloadAction<PostProf>) => {
      state.editedProf = action.payload;
    },
    resetEditProf: (state) => {
      state.editedProf = initialState.editedProf;
    },
    setSelectedProf: (state, action: PayloadAction<Profile>) => {
      state.selectedProf = action.payload;
    },
    resetSelectedProf: (state) => {
      state.selectedProf = initialState.selectedProf;
    },
    setIsOpenEditModal: (state) => {
      state.isOpenEditProfModal = true;
    },
    resetIsOpenEditModal: (state) => {
      state.isOpenEditProfModal = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncLogin.fulfilled,
      (state, action: PayloadAction<JWT>) => {
        localStorage.setItem("localJWT", action.payload.access);
      }
    );
    builder.addCase(fetchAsyncLogin.rejected, (state) => {
      alert("Login Failed");
    });
    builder.addCase(fetchAsyncUpdateProf.rejected, (state) => {
      window.location.href = "login";
    });
  },
});

export const {
  setEditProf,
  setSelectedProf,
  resetEditProf,
  resetSelectedProf,
  setIsOpenEditModal,
  resetIsOpenEditModal,
} = authSlice.actions;
export const selectEditedProf = (state: RootState) => state.auth.editedProf;
export const selectSelectedProf = (state: RootState) => state.auth.selectedProf;
export const selectIsOpenProfEditModal = (state: RootState) =>
  state.auth.isOpenEditProfModal;
export default authSlice.reducer;
