import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './BookService.css';

//added
import { database, ref, push, auth, set } from "../../../firebase";
function BookService({ serviceProviderId }) {

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
      <Button variant="primary" onClick={handleShow}>
        Book
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitBookingHandler}>
              <div className="booking__controls">

                  <div className="booking__control">
                      <label>Select Day:</label>
                      <select required value={selectedDay} name="selectedDay" onChange={dayChangeHandler} >
                          <option >Select suitable day</option>
                          <option>Monday</option>
                          <option>Tuesday</option>
                          <option>Wednesday</option>
                          <option>Thursday</option>
                          <option>Friday</option>
                          <option>Saturday</option>
                          <option>Sunday</option>
                      </select>
                  </div>

                  <br />

                  <div className="booking__control">
                      <label>Select time slot</label>
                      <select required value={selectedSlot} name="selectedSlot"  onChange={slotChangeHandler} >
                          <option >Select suitable time slot</option>
                          <option>Morning (9am - 1pm)</option>
                          <option>Afternoon (1pm - 5pm)</option>
                          <option>Evenings (5pm - 9pm)</option>
                      </select>
                  </div>

                  <br />

              </div>
              <div className="booking__actions">
                <button className="btn btn-primary" type="submit" onClick={handleBooking}>
                    Book
                </button>
                <button className="btn btn-warning" variant="primary" type="reset" onClick={onResetHandler}>
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

export default BookService;