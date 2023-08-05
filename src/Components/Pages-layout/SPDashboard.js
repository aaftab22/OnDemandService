import Footer from '../Layout/Footer/Footer';
import Header from '../Layout/Header/Header';
import './SPDashboard.css';

const SPDashboard = () => {
    return (
        <div>
            <Header />

            <main>
                <div className='service-provider-dashboard'>                
                    <h2>Welcome to your Dashboard!</h2>                
                    <div className='boxes'>
                        <div className='box box-1'>
                            <div className='box-title'>
                                Total Earnings
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
                                Completed <br /> Services
                            </div>
                        </div>
                        <div className='box box-4'>
                        <div className='box-title'>
                                Ratings
                            </div>
                        </div>
                        <div className='box box-5'>
                        <div className='box-title'>
                                Modify/Enter <br />
                                Availability
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default SPDashboard;