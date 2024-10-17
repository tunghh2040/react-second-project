import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function DeleteModal({ show, deleteUser, onDeleteModalClose, onUserDeleteOK }) {
  return (
    <>
      <Modal show={show} onHide={onDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="newUserInfo">
                <label className="form-label">Are you sure you want to delete User {deleteUser.first_name} ?</label>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onDeleteModalClose}>
            No
          </Button>
          <Button variant="danger" onClick={onUserDeleteOK}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
