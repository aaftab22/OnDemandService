import './TableLayout.css';

const TableLayout = ({data}) => {
    console.log(data);

    const keys = data[0] && Object.keys(data[0]);

    console.log(keys);

    return (
        <div className='table-layout'>
            <table class="table">
                <thead>
                    <tr>                        
                        {keys.map((key) => <th scope="col">
                            {key}
                        </th>)}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {data.map((x, index) => {
                            return (
                                <td>
                                    
                                    {
                                        keys[index] === "imageSrc" ? (
                                            <div className='circle-image'>
                                                <img src={process.env.PUBLIC_URL + '/Images/' + x[keys[index]]} />
                                            </div>
                                        ) : x[keys[index]]
                                    }
                                
                                </td>
                            )
                        })}
                    </tr>
                </tbody>
                </table>
        </div>
    )
}
export default TableLayout;