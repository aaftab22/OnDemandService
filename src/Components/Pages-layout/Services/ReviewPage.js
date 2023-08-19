import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ReviewPage.css';
import { database, ref, push, auth, set } from "../../../firebase";

function ReviewPage({ bookingId }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedRating, setSelectedRating] = useState(""); 

  const submitReviewHandler = async (event) => {
    event.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        const reviewData = {
          rating: selectedRating,
        };

        const reviewRef = ref(database, `bookings/${bookingId}/rating`);
        await set(reviewRef, reviewData);

        console.log("Review submitted!");
        setShow(false);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleReview = () => {
    setShow(false);
    console.log('Selected Rating:', selectedRating);
  };

  const onResetHandler = () => {
    setSelectedRating(""); // Reset the selected rating
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
          <form onSubmit={submitReviewHandler}>
            <div className="booking__controls">
              <p>Your review will be visible to others to know your experience and will help 
                the Service Provider to get more services from new clients.</p>
              <p><i><b>*Every review will be valued.</b></i></p>
              <br /> 
              <div className="booking__control">
                <label>Ratings:</label>
                <select
                  id="rating"
                  name="rating"
                  required
                  value={selectedRating}
                  onChange={(event) => setSelectedRating(event.target.value)} 
                >
                  <option value="" disabled>Select rating as per your Service</option>
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
              <button className="btn btn-success" type="submit" onClick={handleReview}>
                Submit Ratings
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

export default ReviewPage;

// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import './ReviewPage.css';

// // added
// import { database, ref, push, auth, set } from "../../../firebase";

// function ReviewPage({ serviceProviderId, bookingId }) {
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const [selectedRating, setSelectedRating] = useState(""); 

//   const submitReviewHandler = async (event) => {
//     event.preventDefault();
//     try {
//       const user = auth.currentUser;
//       if (user) {
//         const userId = user.uid;

//         const reviewData = {
//           review: selectedRating,
//         };

//         const reviewRef = ref(database, `bookings/${bookingId}/reviews`);
//         const newReviewRef = push(reviewRef);
//         await set(newReviewRef, reviewData);

//         console.log("Review submitted!");
//         setShow(false);
//       }
//     } catch (error) {
//       console.error("Error submitting review:", error);
//     }
//   };

//   const handleReview = () => {
//     setShow(false);
//     console.log('Selected Rating:', selectedRating);
//   };

//   const onResetHandler = () => {
//     setSelectedRating(""); // Reset the selected rating
//     setShow(false);
//   };

//   return (
//     <>
//       <Button variant="success" onClick={handleShow}>
//         Review Service
//       </Button>

//       <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Please give your review</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={submitReviewHandler}>
//             <div className="booking__controls">
//               <p>Your review will be visible to others to know your experience and will help 
//                 the Service Provider to get more services from new clients.</p>
//               <p><i><b>*Every review will be valued.</b></i></p>
//               <br /> 
//               <div className="booking__control">
//                 <label>Ratings:</label>
//                 <select
//                   id="rating"
//                   name="rating"
//                   required
//                   value={selectedRating}
//                   onChange={(event) => setSelectedRating(event.target.value)} 
//                 >
//                   <option value="" disabled>Select rating as per your Service</option>
//                   <option value="5">★★★★★ (Excellent)</option>
//                   <option value="4">★★★★☆ (Good)</option>
//                   <option value="3">★★★☆☆ (Average)</option>
//                   <option value="2">★★☆☆☆ (Below Average)</option>
//                   <option value="1">★☆☆☆☆ (Poor)</option>
//                 </select>
//               </div>
//               <br />
//             </div>
//             <div className="booking__actions">
//               <button className="btn btn-success" type="submit" onClick={handleReview}>
//                 Submit Ratings
//               </button>
//               <button className="btn btn-danger" variant="primary" type="reset" onClick={onResetHandler}>
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

// export default ReviewPage;
