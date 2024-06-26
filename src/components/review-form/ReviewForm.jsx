import {Button, Form} from "react-bootstrap";

const ReviewForm = ({handleSubmit, revText, labelText, efaultValue}) => {
    return (
        <Form>
            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                <Form.Label></Form.Label>
                <Form.Control ref={revText} as='textarea' rows={3}/>
            </Form.Group>
            <Button variant='outline-info' onClick={handleSubmit}>Submit</Button>
        </Form>
    )
}

export default ReviewForm