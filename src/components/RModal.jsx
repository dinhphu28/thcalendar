import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
// import PropTypes from 'prop-types';
import { useState } from 'react';

// RModal.propTypes = {

// };

function RModal(props) {

    const [modalToggle, setModalToggle] = useState(false);

    const toggle = () => setModalToggle(!modalToggle);

    return (
        <div>
            <Button
                color="danger"
                onClick={toggle}
            >
                Click Me
            </Button>
            <Modal
                isOpen={modalToggle}
                toggle={toggle}
            >
                <ModalHeader toggle={toggle}>
                    Thêm event
                </ModalHeader>
                <ModalBody>
                    Chọn event mà bạn muốn thêm
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => setModalToggle(false)}
                    >
                        Hẹn gặp
                    </Button>
                    {' '}
                    <Button
                        color="primary"
                        onClick={() => setModalToggle(false)}
                    >
                        Gọi lại
                    </Button>
                    {' '}
                    <Button onClick={() => setModalToggle(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default RModal;