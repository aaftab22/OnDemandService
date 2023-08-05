import { useState } from "react";
import BookService from './BookService';
import './TableLayout.css';

const TableLayout = ({data}) => {
    console.log(data);

    const keys = data[0] && Object.keys(data[0]);

    console.log(keys);

    return (
        <div className='table-layout'>
            <table className="table">
                <thead>
                    <tr>                        
                        {keys.map((key) => <th scope="col">
                            {key}
                        </th>)}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((x, index) => (
                        <tr key={index}>
                            {/* Use the index as the key for each row */}
                            {keys.map((key) => {
                                return (
                                <td key={key}>
                                    {/* Use the key as the key for each cell */}
                                    {key === 'imageSrc' ? (
                                    <div className='circle-image'>
                                        <img
                                        src={process.env.PUBLIC_URL + '/Images/' + x[key]}
                                        alt={x[key]}
                                        />
                                    </div>
                                    ) : (
                                    x[key]
                                    )}
                                </td>
                                );
                            })}
                            <td>
                                <BookService />                            
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}
export default TableLayout;