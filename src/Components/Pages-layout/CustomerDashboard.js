import Footer from '../Layout/Footer/Footer';
import Header from '../Layout/Header/Header';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
    return (
        <div>
            <Header />

            <main>
                <div className='customer-dashboard'>                
                    <h2>Welcome to our page!</h2>                
                    <div className='boxes'>
                        <div className='box box-1'>
                            <div className='box-title'>
                                Services Availed
                            </div>
                            <div className='box__count'>
                                5
                            </div>
                        </div>
                        <div className='box box-2'>
                        <div className='box-title'>
                                Upcoming Services
                            </div>
                            <div className='box__count'>
                                5
                            </div>
                        </div>
                        <div className='box box-3'>
                        <div className='box-title'>
                                Add new <br /> Address
                            </div>
                        </div>
                        <div className='box box-4'>
                        <div className='box-title'>
                                Account <br /> Settings
                            </div>
                        </div>
                        <div className='box box-5'>
                        <div className='box-title'>
                                Add Payment <br />
                                Methods
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default CustomerDashboard;