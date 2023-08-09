import { useEffect, useState } from "react";
import './AddressListing.css';

const AddressListing = () => {
      
    // const keys = data[0] && Object.keys(data[0]);
    const keys = ["name", "street", "city", "province", "postalCode"];

    let titles = ["Full Name", "Street", "City", "Province", "Postal Code"];

    const data = [
    {
        "imageSrc": "Person1",
        "name": "Zack Daniel",
        "street": "401, 204 Aurburn Drive",
        "city": "Waterloo",
        "province": "Ontario",
        "postalCode": "N2J 4J1"
    },
    {
        "imageSrc": "Person1",
        "name": "Jack Daniel",
        "street": "411, 210 Aurburn Drive",
        "city": "Waterloo",
        "province": "Ontario",
        "postalCode": "N2J 4J2"
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

export default AddressListing;
