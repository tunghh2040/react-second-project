import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, addUser, searchUser } from "./action";
import { toast } from "react-toastify";
import _ from "lodash";
import Papa from "papaparse";

export const userSlice = createSlice({
  name: "userManage",
  initialState: {
    listUser: [],
    pageNum: 1,
    pageCount: 0,
    addModalShow: false,
    updateModalShow: false,
    deleteModalShow: false,
    userToEdit: {},
    userToDelete: {},
    sortOrder: true, // Ascending
    searchField: { email: "", last_name: "" },
  },
  reducers: {
    changePage: (state, action) => {
      const event = action.payload;
      state.pageNum = event.selected + 1;
    },
    openAddUserModal: (state) => {
      state.addModalShow = true;
    },
    closeAddUserModal: (state) => {
      state.addModalShow = false;
    },
    openUpdateUserModal: (state, action) => {
      const userToEdit = action.payload;
      state.userToEdit = userToEdit;
      state.updateModalShow = true;
    },
    closeUpdateUserModal: (state) => {
      state.updateModalShow = false;
    },
    updateUser: (state, action) => {
      const editedUser = action.payload;
      const updateListUser = [...state.listUser].map((user) => {
        if (user.id === editedUser.id) {
          return { ...user, ...editedUser };
        } else {
          return user;
        }
      });
      if (editedUser && updateListUser) {
        toast.success(
          `User ${editedUser.first_name} is Successfully Edited! 🦄`
        );
        state.listUser = updateListUser;
        state.updateModalShow = false;
      } else {
        //error
        toast.error("Error...");
      }
    },
    openDeleteUserModal: (state, action) => {
      const userToDelete = action.payload;
      state.deleteModalShow = true;
      state.userToDelete = userToDelete;
    },
    closeDeleteUserModal: (state) => {
      state.deleteModalShow = false;
    },
    deleteUser: (state) => {
      const newlistUser = [...state.listUser];
      const updateListUser = newlistUser.filter(
        (user) => user.id !== state.userToDelete.id
      );
      if (state.userToDelete && updateListUser) {
        toast.success(
          `User ${state.userToDelete.first_name} is Successfully Deleted! 🦄`
        );
        state.listUser = updateListUser;
        state.deleteModalShow = false;
      } else {
        //error
        toast.error("Error...");
      }
    },
    sortListUser: (state, action) => {
      const sortField = action.payload;
      const newSortOrder = !state.sortOrder;
      const updateListUser = _.orderBy(
        [...state.listUser],
        [sortField],
        [newSortOrder ? "asc" : "desc"]
      );
      state.listUser = updateListUser;
      state.sortOrder = newSortOrder;
    },
    inputSearchValue: (state, action) => {
      const { inputField, inputValue } = action.payload;
      state.searchField[inputField] = inputValue;
    },
    importListUser: (state, action) => {
      const event = action.payload;
      const file = event.target.files[0];
      if (!file || file.type !== "text/csv") {
        toast.error("Error...");
        return;
      }
      Papa.parse(file, {
        header: true, // Set to true if your CSV has headers
        dynamicTyping: true, // Automatically convert types (e.g., string to number)
        skipEmptyLines: true,
        complete: (result) => {
          const importData = result.data;
          const updateListUser = mergeArrays([...state.listUser], importData);
          state.listUser = updateListUser;
          state.pageCount = Math.ceil(updateListUser.length / 6);
          toast.success(`File is Successfully Imported! 🦄`);
        },
        error: () => {
          toast.error("Error...");
        },
      });
    },
  },
  // dành cho các action async
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        const { pageCount, updateListUser } = action.payload;
        state.listUser = updateListUser;
        state.pageCount = pageCount;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.listUser = {};
      })
      .addCase(addUser.fulfilled, (state, action) => {
        const updateListUser = action.payload;
        state.listUser = updateListUser;
        state.addModalShow = false;
      })
      .addCase(addUser.rejected, (state) => {
        state.addModalShow = true;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        const updateListUser = action.payload;
        if (updateListUser.length > 0) {
          state.listUser = updateListUser;
          state.pageCount = Math.ceil(updateListUser.length / 6);
        }
      });
  },
});

export const {
  changePage,
  openAddUserModal,
  closeAddUserModal,
  openUpdateUserModal,
  closeUpdateUserModal,
  updateUser,
  openDeleteUserModal,
  closeDeleteUserModal,
  deleteUser,
  sortListUser,
  inputSearchValue,
  importListUser,
} = userSlice.actions;

//export reducer lên store
export default userSlice.reducer;

function mergeArrays(A, B) {
  const result = [];

  // First, merge items from A with B
  A.forEach((itemA) => {
    const itemB = B.find((item) => item.id === itemA.id);
    if (itemB) {
      // If an item with the same id exists in B, check if they are the same
      if (JSON.stringify(itemA) !== JSON.stringify(itemB)) {
        result.push({ ...itemA, ...itemB }); // Merge properties
      } else {
        result.push(itemA); // Items are the same, keep item from A
      }
    } else {
      result.push(itemA); // If not found in B, keep item from A
    }
  });

  // Add items from B that are not in A
  B.forEach((itemB) => {
    if (!A.find((item) => item.id === itemB.id)) {
      result.push(itemB);
    }
  });

  return result;
}
