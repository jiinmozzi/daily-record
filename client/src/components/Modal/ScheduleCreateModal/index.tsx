import {useState, useEffect} from "react";
import "./ScheduleCreateModal.scss";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const onClickSubmit = () => {}

const ScheduleCreateModal = () => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    return (
        <div className="schedule-create-outer-wrapper">
            <div className="schedule-create-inner-wrapper">
                <span id="schedule-modal-header">일정 만들기</span>
                <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>제목</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form>                
            </div>
        </div>
    )
}

export default ScheduleCreateModal;