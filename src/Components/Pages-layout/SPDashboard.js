import { NavLink } from 'react-router-dom';
import Footer from '../Layout/Footer/Footer';
import Header from '../Layout/Header/Header';
import './SPDashboard.css';
import TotalEarnings from './Services/ModalsForSP/TotalEarnings';
import TotalRatings from './Services/ModalsForSP/TotalRatings';
import WagesAvailability from './Services/ModalsForSP/WagesAvailability';

const SPDashboard = () => {
    return (
        <div>
            <Header />
            <main>
                <div className='service-provider-dashboard'>                
                    <h2>Welcome to your Dashboard!</h2>                
                    <div className='boxes'>
                        {/* <div className='box box-1'>
                                <TotalEarnings />
                        </div> */}
                        <div className='box box-2'>
                        <NavLink className={'second-anchor'} to="/service-provider/upcoming-services">
                            <div className='box-title'>
                                Upcoming <br />Services
                            </div>
                           
                        </NavLink>
                        </div>
                        <div className='box box-3'>
                        <NavLink className={'second-anchor'} to="/service-provider/past-services">
                            <div className='box-title'>
                                Completed<br /> Services
                            </div>
                        </NavLink>
                        </div>
                        {/* <div className='box box-4'>
                                <TotalRatings />
                        </div> */}
                        <div className='box box-5'>
                                <WagesAvailability />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default SPDashboard;