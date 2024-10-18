import './App.scss';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Header from './Components/Header';
import TableUser from './Components/TableUser';
import CustomButton from "./Components/CustomButton";
import AddModal from './Components/AddModal';
import DeleteModal from './Components/DeleteModal';
import UpdateModal from "./Components/UpdateModal";
import SearchBox from './Components/SearchBox';
import { ToastContainer , toast } from 'react-toastify';
import { fetchAllUser, postCreateUser } from "./services/UserServices";
import _, { debounce } from 'lodash';

function App() {
  const [listUser, setListUser] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const [addModalShow, setAddModalShow] = useState(false);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [deleteUser, setDeleteUser] = useState({});
  const [sortOrder, setSortOrder] = useState(true); // Ascending

  const [searchEmail, setSearchEmail] = useState("");

  //call API
  const getUser = async (page) => {
    let response = await fetchAllUser(page);
    if(response && response.data) {
        setListUser(response.data);
        setPageCount(response.total_pages);
    }
  }

  useEffect(() => {
    getUser(pageNum);
  }, [pageNum]);

  //Paginate
  const onPageChange = (event) => {
    setPageNum(event.selected + 1);
  };

  // Add
  const onAddButtonClick = () => {
    setAddModalShow(true);
  };
  const onAddModalClose = () => {
    setAddModalShow(false);
  }
  const onNewUserSave = async (userName, job) => {
    let response = await postCreateUser(userName, job);
    if(response && response.id){
        toast.success(`User ${response.name} is Successfully created! 🦄`);
        const addedUser = {
          id: response.id,
          first_name: response.name,
          last_name: "Q",
          email: "tuner@gmail.com",
        };
        setListUser(prevList => [addedUser, ...prevList]);
    } else {
        //error
        toast.error('Error...');
    }
  };

  // Update
  const onUpdateButtonClick = (userToEdit) => {
    setEditUser(userToEdit);
    setUpdateModalShow(true);
  };
  const onUpdateModalClose = () => {
    setUpdateModalShow(false);
  };
  const onEditUserSave = (editedUser) => {
    const newListUser = [...listUser];
    const updatedListUser = newListUser.map(user => {
        //Nếu editUser đã tồn tại trong listUser
        if(user.id === editedUser.id){
            return { ...user, ...editedUser };
        } else {
            return user;
        }
    });
    setListUser(updatedListUser);
    if(editedUser && updatedListUser) {
        toast.success(`User ${editedUser.first_name} is Successfully Edited! 🦄`);
        onUpdateModalClose();
    } else {
        //error
        toast.error('Error...');
    }
  };

  // Delete
  const onDeleteButtonClick = (userToDelete) => {
    setDeleteUser(userToDelete);
    setDeleteModalShow(true);
  };

  const onDeleteModalClose = () => {
    setDeleteModalShow(false);
  };

  const onUserDeleteOK = () => {
    const newListUser = [...listUser];
    const updatedListUser = newListUser.filter(user => user.id !== deleteUser.id);
    setListUser(updatedListUser);
    if(deleteUser && updatedListUser) {
      toast.success(`User ${deleteUser.first_name} is Successfully Deleted! 🦄`);
      onDeleteModalClose();
    } else {
        //error
        toast.error('Error...');
    }
  }

  //Sort
  const onSortClick = (sortField) => {
    const updatedListUser = _.orderBy([...listUser], [sortField], [sortOrder ? "asc" : "desc"]);
    setListUser(updatedListUser);
    setSortOrder(!sortOrder);
  }

  //Search
  const onSearchBoxChange = (searchValue) => {
    setSearchEmail(searchValue);
    console.log(searchValue);
  };

  const onSearchButtonClick = () => {
    const newListUser = [...listUser];
    if (searchEmail) {
      const filteredUsers = filterUsersByEmail(newListUser, searchEmail);
      setListUser(filteredUsers);
    } else {
      getUser(1);
    }
  };

  const filterUsersByEmail = (users, emailSubstring) => {
    return _.filter(users, user =>
      user.email.toLowerCase().includes(emailSubstring.toLowerCase())
    );
  };

  // JSX
  return (
  <div className="App-container">
      <Header />
      <Container>
        <div className="searchArea">
          <SearchBox searchField="Email" onSearchBoxChange={onSearchBoxChange} />
        </div>
        <div className="ButtonList">
          <CustomButton text='Search User' onClick={onSearchButtonClick}/>
          <CustomButton text='Add User' />
          <AddModal
              show={addModalShow}
              onAddModalClose={onAddModalClose}
              onNewUserSave={onNewUserSave}
          />
          <UpdateModal
              editUser={editUser}
              show={updateModalShow}
              onUpdateModalClose={onUpdateModalClose}
              onEditUserSave={onEditUserSave}
          />
          <DeleteModal
              deleteUser={deleteUser}
              show={deleteModalShow}
              onDeleteModalClose={onDeleteModalClose}
              onUserDeleteOK={onUserDeleteOK}
          />
        </div>
        <TableUser
          listUser={listUser}
          pageCount={pageCount}
          onPageChange={onPageChange}
          onUpdateButtonClick={onUpdateButtonClick}
          onDeleteButtonClick={onDeleteButtonClick}
          onSortClick={onSortClick}
        />
      </Container>
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
    </div>
  );
}

export default App;
