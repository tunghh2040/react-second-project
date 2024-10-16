import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchAllUser } from "../services/UserServices";
import ReactPaginate from 'react-paginate';

function TableUser(props) {
    const [listUser, setListUser] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [pageNum, setPageNum] = useState(1);

    useEffect(() => {
        //call API
        getUser(pageNum);
    }, [pageNum]);

    const getUser = async (page) => {
        let response = await fetchAllUser(page);
        if(response && response.data) {
            setListUser(response.data);
            setPageCount(response.total_pages);
        }
    }

    const handlePageClick = (event) => {
        setPageNum(event.selected + 1);
    }

    return (<>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {
                    listUser && listUser.length > 0 && listUser.map((user, index) => {
                        return (
                            <tr key={`user ${index}`}>
                                <td>{user.id}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </Table>
        <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
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