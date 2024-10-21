import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function UpdateModal({ show, userToEdit, onUpdateModalClose, onEditUserSave }) {
    const { first_name, last_name, email } = userToEdit;
    const [editedFirstName, setEditedFirstName] = useState("");
    const [editedLastName, setEditedLastName] = useState("");
    const [editedEmail, setEditedEmail] = useState("");

    useEffect(() => {
        setEditedFirstName(first_name);
        setEditedLastName(last_name);
        setEditedEmail(email);
    }, [first_name, last_name, email]);

    const handleChangeFirstName= (event) => (setEditedFirstName(event.target.value));
    const handleChangeLastName = (event) => (setEditedLastName(event.target.value));
    const handleChangeEmail = (event) => (setEditedEmail(event.target.value));

    const handleEditUserSave = () =>
    {   const editedUser = {
            id: userToEdit.id,
            first_name: editedFirstName,
            last_name: editedLastName,
            email: editedEmail,
        };
        onEditUserSave(editedUser);
    };

    return (
        <>
        <Modal show={show} onHide={onUpdateModalClose}>
            <Modal.Header closeButton>
            <Modal.Title>Update User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="newUserInfo">
                    <label className="form-label" htmlFor="userId">User Id</label>
                    <input
                        className="form-control"
                        id="userId"
                        type="text"
                        value={userToEdit.id}
                        disabled={true}
                    />
                    <label className="form-label" htmlFor="firstName">First Name</label>
                    <input
                        className="form-control"
                        id="firstName"
                        type="text"
                        value = {editedFirstName}
                        onChange={handleChangeFirstName}
                    />
                    <label className="form-label" htmlFor="lastName">Last Name</label>
                    <input
                        className="form-control"
                        id="lastName"
                        type="text"
                        value={editedLastName}
                        onChange={handleChangeLastName}
                    />
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        className="form-control"
                        id="email"
                        type="text"
                        value={editedEmail}
                        onChange={handleChangeEmail}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={onUpdateModalClose}>
                Close
            </Button>
            <Button variant="primary"
              onClick={handleEditUserSave}
            >
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}
