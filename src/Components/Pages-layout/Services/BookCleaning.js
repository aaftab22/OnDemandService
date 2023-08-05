import Footer from '../../Layout/Footer/Footer';
import Header from '../../Layout/Header/Header';
import './BookCleaning.css';
import TableLayout from './TableLayout';
import {data} from './Data';

const BookCleaning = () => {
    return (
        <div>
            <Header />

            <main className='no-margin'>
                <div className='book-electrician book-cleaning'> 
                    <div className='image-box'>
                        <div className='overlay-class'>
                            <div className='text-overlay'>
                                Book your Cleaning Agent today!
                            </div>
                        </div>
                        <img src={process.env.PUBLIC_URL + '/Images/Cleaner.jpg'} />
                    </div>

                    <div className='electrician-table'>
                        <h3>List of available Cleaning Agents</h3>
                        <TableLayout data={data} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
export default BookCleaning;