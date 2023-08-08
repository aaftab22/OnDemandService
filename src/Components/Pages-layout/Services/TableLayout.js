import { useEffect, useState } from "react";
import BookService from './BookService';
import './TableLayout.css';
import { auth, database } from "../../../firebase"; // Update the import path
import { get, ref } from "firebase/database"; 

//added
import { Link, useParams } from 'react-router-dom';
const TableLayout = ({serviceList}) => {
    const [data, setData] = useState([]);
    const { paramName, serviceType } = useParams();
    // console.log( "serviceType2 = " + serviceType);
    // console.log("serviceList", serviceList);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const user = auth.currentUser;
            if (user) {
              
              const userId = user.uid;
              const dbRef = ref(database, `serviceProvider`); 
              const snapshot = await get(dbRef); 
              // console.log(snapshot, "snapshot");
              const fetchedData = snapshot.val();
    
              if (fetchedData) {
                // Convert the fetched data to an array
                const dataArray = Object.keys(fetchedData).map((key) => ({
                  ...fetchedData[key],
                  key: key,
                }))
                .filter((item) => {
                  return item.skills.includes(serviceType);
              })
                
                setData(dataArray);
              }
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);
      
      // const keys = data[0] && Object.keys(data[0]);
      const keys = ["fullName", "email", "phone", "skills"];
      // console.log(keys);
      // console.log(data);   
       return (
        <div className='table-layout'>
            {data.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            {keys.map((key) => (
                                <th scope="col" key={key}>
                                    {key}
                                </th>
                            ))}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
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
                                      x[key] ? x[key] : 'N/A' // Display "N/A" if skills are empty
                                    ) : (
                                      x[key]
                                    )}
                                  </td>
                                ))}
                                <td>
                                    <BookService serviceProviderId={x.key} />
                                </td>
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

export default TableLayout;
