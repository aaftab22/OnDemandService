import './TableLayout.css';

const TableLayout = () => {
    return (
        <div className='table-layout'>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Done Services</th>
                    <th scope="col">Ratings</th>
                    <th scope="col">Wages/hour</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className='circle-image'>
                                <img src={process.env.PUBLIC_URL + '/Images/Person-1.jpg'} />
                            </div>
                        </td>
                        <td>Mark</td>
                        <td>5</td>
                        <td>
                            <i className='fa fa-star'></i>
                            <i className='fa fa-star'></i>
                            <i className='fa fa-star'></i>
                            <i className='fa fa-star'></i>
                            <i className='fa fa-star'></i>
                        </td>
                        <td>$45</td>
                        <td>
                            <button className='btn btn-warning'>Book</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className='circle-image'>
                                <img src={process.env.PUBLIC_URL + '/Images/Person-1.jpg'} />
                            </div>
                        </td>
                        <td>Zack</td>
                        <td>44</td>
                        <td>
                            <i className='fa fa-star'></i>
                            <i className='fa fa-star'></i>
                            <i className='fa fa-star'></i>
                            <i className='fa fa-star'></i>
                        </td>
                        <td>$40</td>
                        <td>
                            <button className='btn btn-warning'>Book</button>
                        </td>
                    </tr>
                </tbody>
                </table>
        </div>
    )
}
export default TableLayout;