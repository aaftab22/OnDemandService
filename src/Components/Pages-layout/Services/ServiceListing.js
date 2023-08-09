import { useEffect, useState } from "react";
import BookService from './BookService';
import './ServiceListing.css';
import ReviewPage from "./ReviewPage";
import { get, ref } from "firebase/database"; 


//added
import { auth, database } from "../../../firebase";

const ServiceListing = () => {
    
    const [services, setServices] = useState([]);
    // const keys = data[0] && Object.keys(data[0]);
    const keys = ["providerName", "selectedDay", "selectedSlot", "skills"];

    const titles = ["Name of the Person", "Day", "Time Slot", "Skills"];

    const string = window.location.href;
    const substring = "/customer/past-services";
    console.log(string.includes(substring));
    const showServices = string.includes(substring);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const user = auth.currentUser;
            if (user) {
              
              const userId = user.uid;
              const dbRef = ref(database, `bookings`); 
              const snapshot = await get(dbRef); 
              const fetchedData = snapshot.val();
    
              if (fetchedData) {
                // Convert the fetched data to an array
                const dataArray = Object.keys(fetchedData).map((key) => ({
                  ...fetchedData[key],
                  key: key,
                }))
                .filter((item) => {
                  return item.customerId.includes(userId);
              })
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
                    {/* <tbody>
                        {data.map((x, index) => (
                            <tr key={index}>
                                {keys.map((key) => (
                                    <td key={key}>
                                    {key === 'imageSrc' ? (
                                      <div className='circle-image'>
                                        <img
                                          src={process.env.PUBLIC_URL + '/Images/' + x[key]}
                                          alt={x[key]}
                                        />
                                      </div>
                                    ) : key === 'skills' ? (
                                      x[key] ? x[key] : 'N/A' 
                                    ) : (
                                      x[key]
                                    )}
                                  </td>
                                ))}
                                {showServices
                                ?
                                <td>
                                    <ReviewPage />
                                </td>
                                :
                                ""
                                }
                                
                            </tr>
                        ))}
                    </tbody> */}
                     <tbody>
            {services.map((x) => (
              <tr key={x.id}>
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
                    <ReviewPage />
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
