import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './TotalEarnings.css';

function TotalEarnings({ serviceProviderId }) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const submitBookingHandler = async(event) => {
      event.preventDefault();
  }
  
  const handleBooking = () => {
    setShow(false);
  };

  return (
    <>
      <div className="button-box" variant="default" onClick={handleShow}>
        Total <br />
        Earnings
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Your total earnings till date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitBookingHandler} className="total-earnings">
              <div className="booking__controls">

                <h5>Congratulations!</h5>
                <p>As of today you earned <b>$500</b> with us!</p>
                <p>You have delivered <b>10</b> services through as as of today.</p>
                <p><i>Keep delivering best services with us to earn more and save more. 
                    Also focus on getting best reviews from the customers you have done serviced for...
                    to get more requests for the services.</i></p>
                    <br /> 

              </div>
              <div className="booking__actions">
                <button className="btn btn-success" type="submit" onClick={handleBooking}>
                    Close window
                </button>
              </div>
          </form>
        </Modal.Body>

        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
           
        </Modal.Footer>*/}

      </Modal>
    </>
  );
}

export default TotalEarnings;