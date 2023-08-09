import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './NewAddress.css';

function NewAddress() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  // FOR THE FORM
  const [enteredName, setEnteredName] = useState("");
  const [enteredStreet, setEnteredStreet] = useState("");
  const [enteredCity, setEnteredCity] = useState("");
  const [enteredProvince, setEnteredProvince] = useState("");
  const [enteredPostalCode, setEnteredPostalCode] = useState("");

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const streetChangeHandler = (event) => {
    setEnteredStreet(event.target.value);
  };
  const cityChangeHandler = (event) => {
    setEnteredCity(event.target.value);
  };
  const provinceChangeHandler = (event) => {
    setEnteredProvince(event.target.value);
  };
  const postalCodeChangeHandler = (event) => {
    setEnteredPostalCode(event.target.value);
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
      <Button variant="success" onClick={handleShow}>
        Add new Address
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter your Details for the Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitBookingHandler}>
              <div className="booking__controls">

                <div className="booking__control">
                    <label>Full Name:</label>
                    <input
                    type="text"
                    name="name"
                    value={enteredName}
                    placeholder="Enter your Full Name"
                    onChange={nameChangeHandler}
                    ></input>
                </div>

                <br />

                  <div className="booking__control">
                      <label>Street Number:</label>
                      <input 
                            type="text" 
                            id="street" 
                            name="street" 
                            value={enteredStreet} 
                            placeholder="Enter your Street Name"
                            onChange={streetChangeHandler} required />
                  </div>

                  <br />

                  <div className="booking__control">
                      <label>City:</label>
                      <input 
                            type="text" 
                            id="city" 
                            name="city" 
                            value={enteredCity} 
                            placeholder="Enter your City Name"
                            onChange={cityChangeHandler} required />
                  </div>

                  <br />

                  <div className="booking__control">
                      <label>Select time slot</label>
                      <select id="province" name="province" value={enteredProvince} onChange={provinceChangeHandler} required>
                            <option value="" disabled selected>Select Province</option>
                            <option value="AB">Alberta</option>
                            <option value="BC">British Columbia</option>
                            <option value="MB">Manitoba</option>
                            <option value="NB">New Brunswick</option>
                            <option value="NL">Newfoundland and Labrador</option>
                            <option value="NS">Nova Scotia</option>
                            <option value="ON">Ontario</option>
                            <option value="PE">Prince Edward Island</option>
                            <option value="QC">Quebec</option>
                            <option value="SK">Saskatchewan</option>
                        </select>
                  </div>

                  <br />

                  <div className="booking__control">
                      <label>Postal Code:</label>
                      <input 
                            type="text" 
                            id="postalCode" 
                            name="postalCode" 
                            value={enteredPostalCode} 
                            onChange={postalCodeChangeHandler}
                            pattern="[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]" 
                            placeholder="Format: A1A 1A1" required />
                  </div>
                  
                  <br />

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

export default NewAddress;