import Footer from '../../Layout/Footer/Footer';
import Header from '../../Layout/Header/Header';
import './BookPlumbing.css';
import TableLayout from './TableLayout';
import { data } from './Data';

const BookPlumbing = () => {
    return (
        <div>
            <Header />

            <main className='no-margin'>
                <div className='book-electrician book-plumbing'> 
                    <div className='image-box'>
                        <div className='overlay-class'>
                            <div className='text-overlay'>
                                Book your Plumbing Agent today!
                            </div>
                        </div>
                        <img src={process.env.PUBLIC_URL + '/Images/Plumbing.jpg'} />
                    </div>

                    <div className='electrician-table'>
                        <h3>List of available Plumbing Agents</h3>
                        <TableLayout data={data} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
export default BookPlumbing;