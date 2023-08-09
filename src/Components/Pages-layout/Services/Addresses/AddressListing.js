import { useEffect, useState } from "react";
import './AddressListing.css';
import { get, ref } from "firebase/database"; 
import { auth, database } from "../../../../firebase";
const AddressListing = () => {
      
    // const keys = data[0] && Object.keys(data[0]);
    const keys = ["name", "phone" , "street", "city", "province", "postalCode"];
    const [addresses, setAddresses] = useState([]);
    let titles = ["Full Name", "phone" ,"Street", "City", "Province", "Postal Code"];
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userId = user.uid;
                    const dbRef = ref(database, `addresses/${userId}`);
                    const snapshot = await get(dbRef);
                    const fetchedData = snapshot.val();

                    if (fetchedData) {
                        const addressArray = Object.keys(fetchedData).map((key) => ({
                            ...fetchedData[key],
                            key: key,
                        }));
                        setAddresses(addressArray);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
}, [Date.now()]);
   
      // console.log(keys);
    return (
        <div className='table-layout'>
            {addresses.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            {titles.map((title) => (
                                <th scope="col" title={title} key={title}>
                                    {title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {addresses.map((address, index) => (
                            <tr key={index}>
                                {keys.map((key) => (
                                    <td key={key}>
                                        {address[key]}
                                    </td>
                                ))}
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

export default AddressListing;
