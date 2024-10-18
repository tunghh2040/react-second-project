import { Table } from "react-bootstrap";
import ReactPaginate from 'react-paginate';
import CustomButton from "./CustomButton";

function TableUser({ listUser, pageCount, onPageChange, onUpdateButtonClick, onDeleteButtonClick, onSortClick }) {
    return (<>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>ID
                    <span> </span>
                    <i className="fa-solid fa-sort" onClick={() => onSortClick("id", "asc")}></i>
                </th>
                <th>First Name
                    <span> </span>
                    <i className="fa-solid fa-sort" onClick={() => onSortClick("first_name", "asc")}></i>
                </th>
                <th>Last Name
                </th>
                <th>Email
                </th>
                <th>Action
                </th>
                </tr>
            </thead>
            <tbody>
                {
                    listUser && listUser.length > 0
                    && listUser
                    .filter(user => Object.keys(user).length > 0)
                    .map((user, index) => {
                        return (
                            <tr key={`user ${index}`}>
                                <td>{user.id}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td className="detailButton">
                                    <CustomButton
                                        id="UpdateButton"
                                        text="Update User"
                                        onClick={() => onUpdateButtonClick(user)}
                                        size="sm"
                                        variant="warning"
                                    />
                                    <CustomButton
                                        id="DeleteButton"
                                        text="Delete User"
                                        onClick={() => onDeleteButtonClick(user)}
                                        size="sm"
                                        variant="danger"
                                    />
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </Table>
        <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={onPageChange}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        previousClassName="page-item"
        nextClassName="page-item"
        breakClassName="page-item"
        pageLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </>);
}

export default TableUser;