import { useEffect, useState } from "react";
import BookService from './BookService';
import './ServiceListing.css';
import ReviewPage from "./ReviewPage";
import { get, ref } from "firebase/database"; 

//added
import { auth, database } from "../../../firebase";

const ServiceListing = () => {
    
    const [services, setServices] = useState([]);

    const keys = ["providerName", "selectedDay", "selectedSlot", "skill"];

    const titles = ["Name of the Person", "Day", "Time Slot", "Skills"];

    const string = window.location.href;
    const substring = "/customer/past-services";
    console.log(string.includes(substring));
    const showServices = string.includes(substring);

    function formatDate(timestamp) {
      const date = new Date(timestamp);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
    
      return `${day}/${month}/${year}`;
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          const user = auth.currentUser;
          if (user) {
            
            const userId = user.uid;
            const dbRef = ref(database, `bookings`); 
            const snapshot = await get(dbRef); 
            const fetchedData = snapshot.val();

            function isBookingForToday(bookingDate) {
              const currentDate = new Date();
              const formattedCurrentDate = currentDate.toLocaleDateString('en-GB');
            
              return formattedCurrentDate === bookingDate;
            }
            
            const currentDate = new Date();
              const formattedCurrentDate = currentDate.toLocaleDateString('en-GB');
            const bookingDate = formattedCurrentDate; // Replace this with the booking date you have
            const isToday = isBookingForToday(bookingDate);

            console.log("bookingDate", bookingDate);
            if (fetchedData) {
              const dataArray = Object.keys(fetchedData).map((key) => ({
                ...fetchedData[key],
                key: key,
              }))
              .filter((x) => {
                if (showServices) {
                 
                  // Filter for service availed
                  console.log("x 123",  x.customerId + "   xx2     "  + userId);
                  // return x.customerId === userId && formatDate(x.timestamp) < bookingDate;
                  return  formatDate(x.timestamp) < bookingDate;
                  
                } else {
                  // Filter for upcoming services
                  console.log("x 123",  x.customerId + "   xx2     "  + userId);
                  return x.customerId === userId && formatDate(x.timestamp) === bookingDate;
                  console.log("x", x.timestamp === Date.now());
                  }                
              });
            console.log("dataArray", dataArray);
            setServices(dataArray);
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }

      };
      fetchData();
    }, [showServices]);
        

    
       return (
        <div className='table-layout'>
            {services.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            {titles.map((title) => (
                                <th scope="col" title={title}>
                                    {title}
                                </th>
                            ))}
                            {showServices 
                            ?
                                <th>Action</th>
                            :
                            ""
                            }
                            
                        </tr>
                    </thead>
        <tbody>
            {services.map((x) => (
              <tr key={x.serviceProviderId}>
                {keys.map((key) => (
                  <td key={key}>
                    {key === "imageSrc" ? (
                      <div className="circle-image">
                        <img
                          src={process.env.PUBLIC_URL + "/Images/" + x[key]}
                          alt={x[key]}
                        />
                      </div>
                    ) : key === "skills" ? (
                      x[key] ? (
                        x[key]
                      ) : (
                        "N/A"
                      )
                    ) : (
                      x[key]
                    )}
                  </td>
                ))}
                {showServices && (
                  <td>
                    <ReviewPage serviceProviderId={x.serviceProviderId} bookingId={x.key} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
                </table>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default ServiceListing;
