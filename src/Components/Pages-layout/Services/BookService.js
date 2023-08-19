import { useEffect, useState } from 'react';
import {  useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import {getUserDetails, getServiceProviderDetails} from '../../../Utills/firebaseDB';
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
    //object details
    const [userDetails, setUserDetails] = useState("");
    const [providerDetails, setProviderDetails] = useState("");

    useEffect(() => {
      fethUserInfo();
      fethProviderInfo();
    },[]);

    const navigate = useNavigate();

    const fethUserInfo = () => {
      const user = auth.currentUser;
        const userId = user.uid;
        getUserDetails(userId)
    .then((userData) => {
      if (userData) {
        setUserDetails(userData);

      } else {
        console.log("User not found or error occurred");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    }

  const fethProviderInfo = () => {
      getServiceProviderDetails(serviceProviderId)
      .then((userData) => {
        if (userData) {
          setProviderDetails(userData);
          const providerName = userData.skills;
          console.log("providerName", providerName);

        } else {
          console.log("User not found or error occurred");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      }
      
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
              customerName: userDetails.fullName,
              providerName: providerDetails.fullName,
              skill: providerDetails.skills,
              timestamp: Date.now(),    
            };
      
            const bookingRef = ref(database, "bookings");
            const newBookingRef = push(bookingRef); 
            await set(newBookingRef, bookingData);

            console.log("Booking successful!");
            setShow(false); 
            navigate("/customer/dashboard");
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
          Book Service
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Book your service</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={submitBookingHandler}>
                <div className="booking__controls">

                    <div className="booking__control">
                        <label>Select Day:</label>
                        <select required value={selectedDay} name="selectedDay" onChange={dayChangeHandler} >
                            <option selected disabled>Select suitable day</option>
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
                        <select selected required value={selectedSlot} name="selectedSlot"  onChange={slotChangeHandler} >
                            <option disabled>Select suitable time slot</option>
                            <option>Morning (9am - 1pm)</option>
                            <option>Afternoon (1pm - 5pm)</option>
                            <option>Evenings (5pm - 9pm)</option>
                        </select>
                    </div>

                    <br />

                </div>
                <div className="booking__actions">
                  <button className="btn btn-success" type="submit" onClick={handleBooking}>
                      Book Service
                  </button>
                  <button className="btn btn-danger" variant="primary" type="reset" onClick={onResetHandler}>
                      Cancel
                  </button>
                </div>
            </form>
          </Modal.Body>

        </Modal>
      </>
    );
  }

  export default BookService;
