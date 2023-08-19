import React, { useEffect, useState } from "react";
import { get, ref } from "firebase/database"; 
import { auth, database } from "../../../firebase";

const SPServiceListing = () => {
    const [services, setServices] = useState([]);
    const keys = ["customerName", "selectedDay", "selectedSlot"];

    const titles = ["Name of the Person", "Day", "Slot" ];

    const string = window.location.href;
    const substring = "/service-provider/past-services";
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
                        const dataArray = Object.keys(fetchedData).map((key) => ({
                            ...fetchedData[key],
                            key: key,
                        }))
                        .filter((item) => {
                            return item.serviceProviderId.includes(userId);
                        });
                        console.log("dataArray", dataArray);
                        console.log("uid", userId);
                        setServices(dataArray);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='table-layout'>
            {services.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            {titles.map((title) => (
                                <th scope="col" title={title} key={title}>
                                    {title}
                                </th>
                            ))}
                            {/* {showServices ? <th>Action</th> : ""} */}
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((x) => (
                            <tr key={x.key}>
                                {keys.map((key) => (
                                    <td key={key}>
                                        {key === "imageSrc" ? (
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
                                {/* {showServices && (
                                    <td>
                                        <ReviewPage />
                                    </td>
                                )} */}
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

export default SPServiceListing;
