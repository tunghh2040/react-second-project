import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllUser, loginAPI, postCreateUser } from "../../services/UserServices";
import { toast } from "react-toastify";

// export const changePage = createAction("CHANGE_PAGE", (event) => ({
//   payload: event,
// }));

export const fetchUser = createAsyncThunk(
  "FETCH_USER",
  async (pageNum, { rejectWithValue }) => {
    try {
      const response = await fetchAllUser(pageNum);
      const listUser = response.data;
      const pageCount = response.total_pages;
      const updateListUser = listUser.slice(0, 6);
      return { pageCount: pageCount, updateListUser: updateListUser }; // This will be the payload for the fulfilled action
    } catch (error) {
      // Use rejectWithValue to return a custom error message
      return rejectWithValue(error.message); // This will be the payload for the rejected action
    }
  }
);

export const addUser = createAsyncThunk(
  "ADD_USER",
  async ({ userName, job }, { getState, rejectWithValue }) => {
    try {
      const newlistUser = getState().userManage.listUser;
      const response = await postCreateUser(userName, job);
      const userToAdd = {
        id: response.id,
        first_name: response.name,
        last_name: "Q",
        email: "tuner@gmail.com",
      };
      const updateListUser = [userToAdd, ...newlistUser].slice(0, 6);
      toast.success(`User ${userToAdd.first_name} is Successfully created! 🦄`);
      return updateListUser; // This will be the payload for the fulfilled action
    } catch (error) {
      toast.error("Error...");
      // Use rejectWithValue to return a custom error message
      return rejectWithValue(error.message); // This will be the payload for the rejected action
    }
  }
);

export const searchUser = createAsyncThunk(
  "SEARCH_USER",
  async (_, { getState, rejectWithValue }) => {
    try {
      const searchField = getState().userManage.searchField;
      const listUser = getState().userManage.listUser;
      //Nếu các điều kiện tìm kiếm đều rỗng thì fetch lại toàn bộ user
      const allEmpty = Object.values(searchField).every(
        (value) => value === ""
      );
      if (allEmpty) {
        const response = await fetchAllUser(1);
        const allUser = response.data;
        return allUser;
      }
      // danh sách trước khi search
      let filteredUser = listUser;
      // iterate qua các trường cần tìm kiếm theo trong object searchField
      Object.entries(searchField).forEach(([fieldName, fieldValue]) => {
        // Nếu field value không rỗng
        if (fieldValue) {
          // lọc danh sách toàn bộ user để trả về danh sách các user thỏa mãn điều kiện tìm kiếm
          filteredUser = filteredUser.filter((user) => {
            const userFieldValue = user[fieldName]?.toString().toLowerCase();
            const searchFieldValue = fieldValue.toLowerCase();
            return userFieldValue.includes(searchFieldValue);
          });
        }
      });
      return filteredUser;
    } catch (error) {
      toast.error("Error...");
      // Use rejectWithValue to return a custom error message
      return rejectWithValue(error.message); // This will be the payload for the rejected action
    }
  }
);

export const login = createAsyncThunk(
  "LOGIN_USER",
  async ({ email, password }, { rejectWithValue }) => {

    if (!email || !password) {
      toast.error("Email and Password are requied");
      return rejectWithValue(false);
    }

    try {
        // correct email  eve.holt@reqres.in
        let response = await loginAPI(email, password);

        if (response.status === 400) {
          return rejectWithValue(false);
        }

        if (response && response.token) {
          return true;
        }
    } catch (error) {
      return rejectWithValue(false);
    }
  }
);
