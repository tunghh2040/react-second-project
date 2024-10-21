import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function AddModal({ show, onAddModalClose, onNewUserSave }) {
  const [userName, setUserName] = useState("");
  const [job, setJob] = useState("");

  const onUserNameChange = (event) => (setUserName(event.target.value));
  const onJobChange = (event) => (setJob(event.target.value));

  const handleNewUserSave = () => {
    onNewUserSave(userName, job);
    setUserName("");
    setJob("");
  };

  return (
    <>
      <Modal show={show} onHide={onAddModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="newUserInfo">
                <label className="form-label" htmlFor="userName">User Name</label>
                <input
                    className="form-control"
                    id="userName"
                    type="text"
                    value = {userName}
                    onChange = {onUserNameChange}
                />
                <label className="form-label" htmlFor="job">Job</label>
                <input
                    className="form-control"
                    id="job"
                    type="text"
                    value = {job}
                    onChange = {onJobChange}
                />
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onAddModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleNewUserSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
