import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateUser } from "../services";
import { toast } from 'react-toastify'

function ModalEditUser(props) {
    const { show, handleClose, dataUse, handleEditUserModal } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleEditUser = async () => {
        let res = await updateUser(dataUse.id, name, job)
        if (res && res.updatedAt) {
            handleEditUserModal({ id: dataUse.id, first_name: name })
            toast.success('Succsess !')
        }
        handleClose()
    }

    useEffect(() => {
        if (show) {
            setName(dataUse.first_name)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataUse])

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <form>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    value={name}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Job's</label>
                                <input
                                    value={job}
                                    type="text"
                                    className="form-control"
                                    placeholder="Job's"
                                    onChange={(e) => setJob(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEditUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditUser;
