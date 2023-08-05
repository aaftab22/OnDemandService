import Footer from '../../Layout/Footer/Footer';
import Header from '../../Layout/Header/Header';
import './BookPainter.css';
import TableLayout from './TableLayout';
import { data } from './Data';

const BookPainter = () => {
    return (
        <div>
            <Header />

            <main className='no-margin'>
                <div className='book-electrician book-painter'> 
                    <div className='image-box'>
                        <div className='overlay-class'>
                            <div className='text-overlay'>
                                Book your Painter today!
                            </div>
                        </div>
                        <img src={process.env.PUBLIC_URL + '/Images/Painter.jpg'} />
                    </div>

                    <div className='electrician-table'>
                        <h3>List of available Painters</h3>
                        <TableLayout data={data} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
export default BookPainter;