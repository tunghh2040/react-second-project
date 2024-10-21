import { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import TableUser from "../Components/TableUser";
import CustomButton from "../Components/CustomButton";
import AddModal from "../Components/AddModal";
import DeleteModal from "../Components/DeleteModal";
import UpdateModal from "../Components/UpdateModal";
import SearchBox from "../Components/SearchBox";
import { ToastContainer } from "react-toastify";
import { CSVLink } from "react-csv";
import { useSelector, useDispatch } from "react-redux";
import {
  changePage,
  closeAddUserModal,
  openAddUserModal,
  openUpdateUserModal,
  closeUpdateUserModal,
  updateUser,
  openDeleteUserModal,
  closeDeleteUserModal,
  deleteUser,
  sortListUser,
  inputSearchValue,
  importListUser,
} from "../redux/userSlice";
import { fetchUser, addUser, searchUser } from "../redux/action";

function UserManage() {
  const dispatch = useDispatch();
  const pageNum = useSelector((state) => state.userManage.pageNum);
  const listUser = useSelector((state) => state.userManage.listUser);
  const pageCount = useSelector((state) => state.userManage.pageCount);
  const addModalShow = useSelector((state) => state.userManage.addModalShow);
  const updateModalShow = useSelector(
    (state) => state.userManage.updateModalShow
  );
  const userToEdit = useSelector((state) => state.userManage.userToEdit);
  const deleteModalShow = useSelector(
    (state) => state.userManage.deleteModalShow
  );
  const userToDelete = useSelector((state) => state.userManage.userToDelete);

  useEffect(() => {
    dispatch(fetchUser(pageNum));
  }, [dispatch, pageNum]);

  const fileInputRef = useRef(null);

  //Paginate
  const onPageChange = (event) => {
    dispatch(changePage(event));
  };

  // Add
  const onAddButtonClick = () => {
    dispatch(openAddUserModal());
  };
  const onAddModalClose = () => {
    dispatch(closeAddUserModal());
  };
  const onNewUserSave = (userName, job) => {
    dispatch(addUser({ userName, job }));
  };

  // Update
  const onUpdateButtonClick = (userToEdit) => {
    dispatch(openUpdateUserModal(userToEdit));
  };
  const onUpdateModalClose = () => {
    dispatch(closeUpdateUserModal());
  };
  const onEditUserSave = (editedUser) => {
    dispatch(updateUser(editedUser));
  };

  // Delete
  const onDeleteButtonClick = (userToDelete) => {
    dispatch(openDeleteUserModal(userToDelete));
  };
  const onDeleteModalClose = () => {
    dispatch(closeDeleteUserModal());
  };
  const onUserDeleteOK = () => {
    dispatch(deleteUser());
  };

  //Sort
  const onSortClick = (sortField) => {
    dispatch(sortListUser(sortField));
  };

  //Search
  const onSearchBoxChange = (inputField, inputValue) => {
    dispatch(inputSearchValue({ inputField, inputValue }));
  };
  const onSearchButtonClick = () => {
    dispatch(searchUser());
  };

  //Import
  const onImportButtonClick = () => {
    fileInputRef.current.click();
  };
  const onFileChange = (event) => {
    dispatch(importListUser(event));
  };

  // JSX
  return (
    <Container>
      <div className="searchArea">
        <SearchBox
          searchLabel="Email"
          searchField="email"
          onSearchBoxChange={onSearchBoxChange}
        />
        <SearchBox
          searchLabel="Last Name"
          searchField="last_name"
          onSearchBoxChange={onSearchBoxChange}
        />
      </div>
      <div className="modalList">
        <AddModal
          show={addModalShow}
          onAddModalClose={onAddModalClose}
          onNewUserSave={onNewUserSave}
        />
        <UpdateModal
          userToEdit={userToEdit}
          show={updateModalShow}
          onUpdateModalClose={onUpdateModalClose}
          onEditUserSave={onEditUserSave}
        />
        <DeleteModal
          deleteUser={userToDelete}
          show={deleteModalShow}
          onDeleteModalClose={onDeleteModalClose}
          onUserDeleteOK={onUserDeleteOK}
        />
      </div>
      <div className="buttonList">
        <CustomButton
          text="Search User"
          icon="fa-solid fa-magnifying-glass"
          variant="success"
          size="sm"
          onClick={onSearchButtonClick}
        />
        <CustomButton
          text="Add User"
          icon="fa-solid fa-circle-plus"
          size="sm"
          onClick={onAddButtonClick}
        />
        <CustomButton
          text="Import CSV"
          icon="fa-solid fa-file-import"
          size="sm"
          variant="info"
          onClick={onImportButtonClick}
        />
        <input
          id="importCSV"
          type="file"
          hidden
          ref={fileInputRef}
          onChange={onFileChange}
        />
        <CSVLink filename={"listUser.csv"} data={listUser}>
          <CustomButton
            text="Export CSV"
            icon="fa-solid fa-file-export"
            size="sm"
            variant="info"
          />
        </CSVLink>
      </div>
      <TableUser
        listUser={listUser}
        pageCount={pageCount}
        onPageChange={onPageChange}
        onUpdateButtonClick={onUpdateButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onSortClick={onSortClick}
      />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        draggable={true}
        pauseOnHover={false}
        theme="light"
      />
    </Container>
  );
}

export default UserManage;
