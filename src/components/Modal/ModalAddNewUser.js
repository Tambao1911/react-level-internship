import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreteUser } from "../services";
import { toast } from 'react-toastify'

function ModalAddUser(props) {
    const { show, handleClose, setShowModal, handleUpdateUser } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");


    const handleSave = async () => {
        let res = await postCreteUser(name, job)
        if (res && res.id) {
            handleClose()
            setName('');
            setJob('')
            handleUpdateUser({ first_name: name, id: res.id })
            toast.success('Add New User Success!')
        } else {
            toast.error('Sai Rồi')
        }
    }

    return (
        <>
            <div>
                <button onClick={() => setShowModal(true)}>Add</button>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Users</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleSave()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddUser;
