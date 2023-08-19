import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {getUserDetails, getServiceProviderDetails} from '../../../../Utills/firebaseDB';
import "./WagesAvailability.css";

import { auth, database } from "../../../../firebase";
import {  ref, set } from "firebase/database";

function WagesAvailability() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedDay, setSelectedDay] = useState("");
  const [daySlotsMap, setDaySlotsMap] = useState(new Map()); // Store selected slots for each day
  const [enteredWages, setEnteredWages] = useState("");
  const [providerDetails, setProviderDetails] = useState("");

  useEffect(() => {
    fethProviderInfo();
  }, []);

  const fethProviderInfo = () => {
    const user = auth.currentUser;
    if (user) {
    
      const userId = user.uid;
    getServiceProviderDetails(userId)
    .then((userData) => {
  console.log("userData", userData);

      if (userData) {
        setProviderDetails(userData);
        const fetchedDaySlotsMap = new Map();

        userData.availability.slotsData.forEach((doc) => {
          const day = doc.day;
          const slots = doc.slots;

          fetchedDaySlotsMap.set(day, slots);
        });

        setDaySlotsMap(fetchedDaySlotsMap);
      } else {
        console.log("User not found or error occurred");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
    }

  const wagesChangeHandler = (event) => {
    setEnteredWages(event.target.value);
  };

  const submitBookingHandler = async (event) => {
    event.preventDefault();
  };

  const handleSaveAddress = (x) => {
    setShow(false);
    console.log("val: ", x);
  };

  const onResetHandler = () => {
    setSelectedDay("");
    setDaySlotsMap(new Map());
    setShow(false);
  };

  const handleSaveAvailability = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        
        const slotsArray = Array.from(daySlotsMap, ([day, slots]) => ({ day, slots }));
        console.log("Slots Array:", slotsArray);
        const dbRef = ref(database, `serviceProvider/${userId}/availability`);
        
        const availabilityData = {
         slotsData:slotsArray,
         wages: enteredWages,
        };

        console.log("Availability Data:", availabilityData);
        await set(dbRef, availabilityData);

        setShow(false);
        setSelectedDay("");
        setDaySlotsMap(new Map());
        setEnteredWages("");
      }
    } catch (error) {
      console.error("Error saving availability:", error);
    }
  };

  return (
    <>
      <div className="button-box" variant="default" onClick={handleShow}>
        Modify Wages / <br />
        Availability
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Enter your desired Wages and your availability
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitBookingHandler}>
            <div className="availability__controls booking__controls">
              <div className="booking__control">
                <label>Wages/hr:</label>
                <input
                  min="20"
                  max="100"
                  type="number"
                  name="wages"
                  placeholder="Minimum value should be $20"
                  value={enteredWages}
                  onChange={wagesChangeHandler}
                ></input>
              </div>

              <hr />

              <h5>Set Your Recurring Availability</h5>
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <div key={day} className="day">
                  <div className="day-label">{day}</div>
                  <div className="time-slots">
                    {["Morning", "Afternoon", "Evening"].map((slot) => (
                      <div key={slot} className="time-slot">
                        <label className="custom-checkbox">
                          {slot}
                          <input
                            type="checkbox"
                            checked={(daySlotsMap.get(day) || []).includes(
                              slot
                            )}
                            onChange={(event) => {
                              const updatedSlots = daySlotsMap.get(day) || [];
                              if (event.target.checked) {
                                updatedSlots.push(slot);
                              } else {
                                updatedSlots.splice(
                                  updatedSlots.indexOf(slot),
                                  1
                                );
                              }
                              setDaySlotsMap(
                                new Map(daySlotsMap).set(day, updatedSlots)
                              );
                            }}
                            value={day} // Use the day as the value for the checkbox
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="booking__actions">
              <button
                className="btn btn-success"
                type="button"
                onClick={handleSaveAvailability}
              >
                Save Availability
              </button>
              <button
                className="btn btn-danger"
                variant="primary"
                type="button"
                onClick={onResetHandler}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default WagesAvailability;

// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import './WagesAvailability.css';

// import { auth, database } from "../../../../firebase";
// import { get, ref } from "firebase/database";

// function WagesAvailability() {

//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const [selectedDay, setSelectedDay] = useState("");
//   const [selectedSlot, setSelectedSlot] = useState("");
//   // FOR THE FORM
//   const [enteredWages, setEnteredWages] = useState("");

//   const wagesChangeHandler = (event) => {
//     setEnteredWages(event.target.value);
//   };

//   const submitBookingHandler = async(event) => {
//       event.preventDefault();
//   }

//   const handleSaveAddress = (x) => {
//     setShow(false);
//     console.log('val: ', x);
//   };

//   const onResetHandler = () => {
//     setSelectedDay("");
//     setSelectedSlot("");
//     setShow(false);
//     };

//     const handleSaveAvailability = async () => {
//         try {
//           const user = auth.currentUser;
//           if (user) {
//             const userId = user.uid;
//             const dbRef = ref(database, `serviceProviders/${userId}/availability`);

//             // Prepare the data to be saved
//             const availabilityData = {
//               day: selectedDay,
//               slots: selectedSlots,
//               wages: enteredWages,
//             };

//             // Push the data to the database
//             await push(dbRef, availabilityData);

//             // Close the modal and reset state
//             setShow(false);
//             setSelectedDay("");
//             setSelectedSlots([]);
//             setEnteredWages("");
//           }
//         } catch (error) {
//           console.error("Error saving availability:", error);
//         }
//       };

//   return (
//     <>
//       <div className="button-box" variant="default" onClick={handleShow}>
//         Modify Wages / <br />
//         Availability
//       </div>

//       <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Enter your desired Wages and your availabiity</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={submitBookingHandler}>
//               <div className="availability__controls booking__controls">

//                 <div className="booking__control">
//                     <label>Wages/hr:</label>
//                     <input
//                     min="20"
//                     max="100"
//                     type="number"
//                     name="wages"
//                     placeholder="Minimum value should be $20"
//                     value={enteredWages}
//                     onChange={wagesChangeHandler}
//                     ></input>
//                 </div>

//                 <hr />

//                 <h5>Set Your Recurring Availability</h5>

//                 <div class="day">
//                     <div class="day-label">Monday</div>
//                     <div class="time-slots">
//                         <div class="time-slot">
//                             <label class="custom-checkbox">
//                                 Morning
//                                 <input type="checkbox" />
//                                 <span class="checkmark"></span>
//                             </label>
//                         </div>

//                         <div class="time-slot">
//                             <label class="custom-checkbox">
//                                 Afternoon
//                                 <input type="checkbox" />
//                                 <span class="checkmark"></span>
//                             </label>
//                         </div>

//                         <div class="time-slot">
//                             <label class="custom-checkbox">
//                                 Evening
//                                 <input type="checkbox" />
//                                 <span class="checkmark"></span>
//                             </label>
//                         </div>
//                     </div>
//                 </div>

//                 <div class="day">
//                     <div class="day-label">Tuesday</div>
//                     <div class="time-slots">
//                         <div class="time-slot">
//                             <label class="custom-checkbox">
//                                 Morning
//                                 <input type="checkbox" />
//                                 <span class="checkmark"></span>
//                             </label>
//                         </div>

//                         <div class="time-slot">
//                             <label class="custom-checkbox">
//                                 Afternoon
//                                 <input type="checkbox" />
//                                 <span class="checkmark"></span>
//                             </label>
//                         </div>

//                         <div class="time-slot">
//                             <label class="custom-checkbox">
//                                 Evening
//                                 <input type="checkbox" />
//                                 <span class="checkmark"></span>
//                             </label>
//                         </div>
//                     </div>
//                 </div>

//                 <div class="day">
//                     <div class="day-label">Wednesday</div>
//                     <div class="time-slots">
//                         <div class="time-slot">
//                             <label class="custom-checkbox">
//                                 Morning
//                                 <input type="checkbox" />
//                                 <span class="checkmark"></span>
//                             </label>
//                         </div>

//                         <div class="time-slot">
//                             <label class="custom-checkbox">
//                                 Afternoon
//                                 <input type="checkbox" />
//                                 <span class="checkmark"></span>
//                             </label>
//                         </div>

//                         <div class="time-slot">
//                             <label class="custom-checkbox">
//                                 Evening
//                                 <input type="checkbox" />
//                                 <span class="checkmark"></span>
//                             </label>
//                         </div>
//                     </div>
//                 </div>

//                 <div class="day">
//                     <div class="day-label">Thursday</div>
//                     <div class="time-slots">
//                         <div class="time-slot">
//                             <label class="custom-checkbox">
//                                 Morning
//                                 <input type="checkbox" />
//                                 <span class="checkmark"></span>
//                             </label>
//                         </div>

//                         <div class="time-slot">
//                             <label class="custom-checkbox">
//                                 Afternoon
//                                 <input type="checkbox" />
//                                 <span class="checkmark"></span>
//                             </label>
//                         </div>

//                         <div class="time-slot">
//                             <label class="custom-checkbox">
//                                 Evening
//                                 <input type="checkbox" />
//                                 <span class="checkmark"></span>
//                             </label>
//                         </div>
//                     </div>
//                 </div>

//                 <div class="day">
//                     <div class="day-label">Friday</div>
//                     <div class="time-slots">
//                         <div class="time-slot">
//                             <label class="custom-checkbox">
//                                 Morning
//                                 <input type="checkbox" />
//                                 <span class="checkmark"></span>
//                             </label>
//                         </div>

//                         <div class="time-slot">
//                             <label class="custom-checkbox">
//                                 Afternoon
//                                 <input type="checkbox" />
//                                 <span class="checkmark"></span>
//                             </label>
//                         </div>

//                         <div class="time-slot">
//                             <label class="custom-checkbox">
//                                 Evening
//                                 <input type="checkbox" />
//                                 <span class="checkmark"></span>
//                             </label>
//                         </div>
//                     </div>
//                 </div>

//                 <div class="day">
//                     <div class="day-label">Saturday</div>
//                     <div class="time-slots">
//                         <div class="time-slot">
//                             <label class="custom-checkbox">
//                                 Morning
//                                 <input type="checkbox" />
//                                 <span class="checkmark"></span>
//                             </label>
//                         </div>

//                         <div class="time-slot">
//                             <label class="custom-checkbox">
//                                 Afternoon
//                                 <input type="checkbox" />
//                                 <span class="checkmark"></span>
//                             </label>
//                         </div>

//                         <div class="time-slot">
//                             <label class="custom-checkbox">
//                                 Evening
//                                 <input type="checkbox" />
//                                 <span class="checkmark"></span>
//                             </label>
//                         </div>
//                     </div>
//                 </div>

//                 <div class="day">
//                     <div class="day-label">Sunday</div>
//                     <div class="time-slots">
//                         <div class="time-slot">
//                             <label class="custom-checkbox">
//                                 Morning
//                                 <input type="checkbox" />
//                                 <span class="checkmark"></span>
//                             </label>
//                         </div>

//                         <div class="time-slot">
//                             <label class="custom-checkbox">
//                                 Afternoon
//                                 <input type="checkbox" />
//                                 <span class="checkmark"></span>
//                             </label>
//                         </div>

//                         <div class="time-slot">
//                             <label class="custom-checkbox">
//                                 Evening
//                                 <input type="checkbox" />
//                                 <span class="checkmark"></span>
//                             </label>
//                         </div>
//                     </div>
//                 </div>

//               </div>
//               <div className="booking__actions">
//                 <button className="btn btn-success" type="submit" onClick={handleSaveAvailability}>
//                     Save Address
//                 </button>
//                 <button className="btn btn-danger" variant="primary" type="reset" onClick={onResetHandler}>
//                     Cancel
//                 </button>
//               </div>
//           </form>
//         </Modal.Body>

//       </Modal>
//     </>
//   );
// }

// export default WagesAvailability;
