import { useEffect, useState } from "react";
import BookService from './BookService';
import './ServiceListing.css';
import ReviewPage from "./ReviewPage";

const ServiceListing = () => {
      
    // const keys = data[0] && Object.keys(data[0]);
    const keys = ["name", "email", "phone", "skills", "dueDate"];

    let titles = ["Name of the Person", "Email Address", "Phone Number", "Skills", "Date"];

    let string = window.location.href;
    let substring = "/customer/past-services";
    console.log(string.includes(substring));
    let showServices = string.includes(substring);

    const data = [
    {
        "imageSrc": "Person1",
        "name": "Zack",
        "email": "zack@gmail.com",
        "phone": "123-123-1234",
        "skills": "electrician",
        "dueDate": "2023/08/20"
    },
    {
        "imageSrc": "Person1",
        "name": "Jack",
        "email": "jack@gmail.com",
        "phone": "123-123-1233",
        "skills": "plumbing",
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
                            {showServices 
                            ?
                                <th>Action</th>
                            :
                            ""
                            }
                            
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
                    </tbody>
                </table>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default ServiceListing;
