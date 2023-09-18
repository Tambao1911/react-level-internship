import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../services";
import { toast } from "react-toastify";

function ModalConfim(props) {
    const { show, handleClose, dataUseDelete, handleDeleteUserModal } = props;

    const handleDeleteConfim = async () => {
        let res = await deleteUser(dataUseDelete.id)
        if (res && res.updatedAt) {
            toast.success('Delete Succsess!')
            handleClose()
            handleDeleteUserModal(dataUseDelete)
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete A User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Are you sure delete this user, this action can't be undone!
                        Email: <b>{dataUseDelete.email}</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteConfim()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfim;
