import Footer from '../../Layout/Footer/Footer';
import Header from '../../Layout/Header/Header';
import './ServiceBooking.css';
import TableLayout from './TableLayout';

const ServiceBooking = () => {
    return (
        <div>
            <Header />

            <main className='no-margin'>
                <div className='book-electrician'> 
                    <div className='image-box'>
                        <div className='overlay-class'>
                            <div className='text-overlay'>
                                Book your Electrician today!
                            </div>
                        </div>
                        <img src={process.env.PUBLIC_URL + '/Images/Book-service.jpg'} />
                    </div>

                    <div className='electrician-table'>
                        <h3>List of available electricians</h3>
                        <TableLayout />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
export default ServiceBooking;