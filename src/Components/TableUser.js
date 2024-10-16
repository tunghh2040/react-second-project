import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchAllUser } from "../services/UserServices";

function TableUser(props) {
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        //call API
        getUser();
    }, []);

    const getUser = async () => {
        let response = await fetchAllUser();
        if(response && response.data && response.data.data) {
            setListUser(response.data.data);
        }
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
                            <tr key={'user ${index}'}>
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
    </>);
}

export default TableUser;