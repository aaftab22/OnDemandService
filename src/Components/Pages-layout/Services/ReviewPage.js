import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ReviewPage.css';

//added
import { database, ref, push, auth, set } from "../../../firebase";
function ReviewPage({ serviceProviderId }) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const dayChangeHandler = (event) => {
      setSelectedDay(event.target.value);
  };
  
  const slotChangeHandler = (event) => {
      setSelectedSlot(event.target.value);
  };

  const submitBookingHandler = async(event) => {
      event.preventDefault();
      try {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
    
          const bookingData = {
            serviceProviderId: serviceProviderId,
            customerId: userId,
            selectedDay: selectedDay,
            selectedSlot: selectedSlot,
            timestamp: Date.now(),
          };
    
          const bookingRef = ref(database, "bookings");
          const newBookingRef = push(bookingRef); 
          await set(newBookingRef, bookingData);

          console.log("Booking successful!");
          setShow(false); // Close the modal after booking
          console.log("sp id " + serviceProviderId + "user id " + userId);
        }
      } catch (error) {
        console.error("Error booking service:", error);
      }  
  }
  
  const handleBooking = (x) => {
    setShow(false);
    console.log('val: ', x);
  };

  const onResetHandler = () => {
    setSelectedDay("");
    setSelectedSlot("");
    setShow(false);
};

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Review Service
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Please give your review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitBookingHandler}>
              <div className="booking__controls">

                <p>Your review will be visible to others to know your experience and will help 
                    the Service Provider to get more services from new clients.</p>
                    <p><i><b>*Every review will be valued.</b></i></p>
                    <br /> 
                  <div className="booking__control">
                      <label>Ratings:</label>
                      <select id="rating" name="rating" required>
                            <option selected disabled>Select rating as per your Service</option>
                            <option value="5">★★★★★ (Excellent)</option>
                            <option value="4">★★★★☆ (Good)</option>
                            <option value="3">★★★☆☆ (Average)</option>
                            <option value="2">★★☆☆☆ (Below Average)</option>
                            <option value="1">★☆☆☆☆ (Poor)</option>
                        </select>
                  </div>

                  <br />

              </div>
              <div className="booking__actions">
                <button className="btn btn-success" type="submit" onClick={handleBooking}>
                    Submit Ratings
                </button>
                <button className="btn btn-danger" variant="primary" type="reset" onClick={onResetHandler}>
                    Cancel
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

export default ReviewPage;