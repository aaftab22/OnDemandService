import Footer from '../../Layout/Footer/Footer';
import Header from '../../Layout/Header/Header';
import './BookBabySitting.css';
import TableLayout from './TableLayout';
import { data } from './Data';

const BookBabySitting = () => {
    return (
        <div>
            <Header />

            <main className='no-margin'>
                <div className='book-electrician baby-sitting'> 
                    <div className='image-box'>
                        <div className='overlay-class'>
                            <div className='text-overlay'>
                                Book your Baby Seater today!
                            </div>
                        </div>
                        <img src={process.env.PUBLIC_URL + '/Images/Baby-Seater.jpg'} />
                    </div>

                    <div className='electrician-table'>
                        <h3>List of available Baby Seater Agents</h3>
                        <TableLayout data={data} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
export default BookBabySitting;