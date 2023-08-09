import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './WagesAvailability.css';

function WagesAvailability() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  // FOR THE FORM
  const [enteredWages, setEnteredWages] = useState("");

  const wagesChangeHandler = (event) => {
    setEnteredWages(event.target.value);
  };

  const submitBookingHandler = async(event) => {
      event.preventDefault();
  }
  
  const handleSaveAddress = (x) => {
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
          <Modal.Title>Enter your desired Wages and your availabiity</Modal.Title>
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
                <div class="day">
                    <div class="day-label">Monday</div>
                    <div class="time-slots">
                        <div class="time-slot">
                            <label class="custom-checkbox">
                                Morning
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>

                        <div class="time-slot">
                            <label class="custom-checkbox">
                                Afternoon
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>

                        <div class="time-slot">
                            <label class="custom-checkbox">
                                Evening
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="day">
                    <div class="day-label">Tuesday</div>
                    <div class="time-slots">
                        <div class="time-slot">
                            <label class="custom-checkbox">
                                Morning
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>

                        <div class="time-slot">
                            <label class="custom-checkbox">
                                Afternoon
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>

                        <div class="time-slot">
                            <label class="custom-checkbox">
                                Evening
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="day">
                    <div class="day-label">Wednesday</div>
                    <div class="time-slots">
                        <div class="time-slot">
                            <label class="custom-checkbox">
                                Morning
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>

                        <div class="time-slot">
                            <label class="custom-checkbox">
                                Afternoon
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>

                        <div class="time-slot">
                            <label class="custom-checkbox">
                                Evening
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="day">
                    <div class="day-label">Thursday</div>
                    <div class="time-slots">
                        <div class="time-slot">
                            <label class="custom-checkbox">
                                Morning
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>

                        <div class="time-slot">
                            <label class="custom-checkbox">
                                Afternoon
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>

                        <div class="time-slot">
                            <label class="custom-checkbox">
                                Evening
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="day">
                    <div class="day-label">Friday</div>
                    <div class="time-slots">
                        <div class="time-slot">
                            <label class="custom-checkbox">
                                Morning
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>

                        <div class="time-slot">
                            <label class="custom-checkbox">
                                Afternoon
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>

                        <div class="time-slot">
                            <label class="custom-checkbox">
                                Evening
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="day">
                    <div class="day-label">Saturday</div>
                    <div class="time-slots">
                        <div class="time-slot">
                            <label class="custom-checkbox">
                                Morning
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>

                        <div class="time-slot">
                            <label class="custom-checkbox">
                                Afternoon
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>

                        <div class="time-slot">
                            <label class="custom-checkbox">
                                Evening
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="day">
                    <div class="day-label">Sunday</div>
                    <div class="time-slots">
                        <div class="time-slot">
                            <label class="custom-checkbox">
                                Morning
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>

                        <div class="time-slot">
                            <label class="custom-checkbox">
                                Afternoon
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>

                        <div class="time-slot">
                            <label class="custom-checkbox">
                                Evening
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>


              </div>
              <div className="booking__actions">
                <button className="btn btn-success" type="submit" onClick={handleSaveAddress}>
                    Save Address
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

export default WagesAvailability;