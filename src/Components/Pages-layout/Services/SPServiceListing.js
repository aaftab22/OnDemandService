import { useEffect, useState } from "react";
import BookService from './BookService';
import './SPServiceListing.css';
import ReviewPage from "./ReviewPage";

const SPServiceListing = () => {
      
    // const keys = data[0] && Object.keys(data[0]);
    const keys = ["name", "address", "slot", "dueDate"];

    let titles = ["Name of the Person", "Address", "Timings", "Date"];

    let string = window.location.href;
    let substring = "/service-provider/past-services";
    console.log(string.includes(substring));
    let showServices = string.includes(substring);

    const data = [
    {
        "imageSrc": "Person1",
        "name": "Zack",
        "address": "401, 204 Aurburn Drive, Waterloo, Ontario - N2J 4J1",
        "slot": "Morning (9am - 1pm)",
        "dueDate": "2023/08/20"
    },
    {
        "imageSrc": "Person1",
        "name": "Jack",
        "address": "401, 204 Aurburn Drive, Waterloo, Ontario - N2J 4J1",
        "slot": "Evening (5pm - 11pm)",
        "dueDate": "2023/08/22"
    }
    ]
      // console.log(keys);
      console.log(data);   
       return (
        <div className='table-layout'>
            {data.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            {titles.map((title) => (
                                <th scope="col" title={title}>
                                    {title}
                                </th>
                            ))}
                            
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
