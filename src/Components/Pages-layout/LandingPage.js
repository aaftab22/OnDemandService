import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className='landing-page'>
            <div className='background-overlay'></div>
            <div className='main-box'>
                <div className='heading'>
                    <h1>Single stop for all your needs!</h1>
                </div>
                <div className='caption'>
                    <p className='no-margin'>Let us help you, for all your needs!</p> 
                    <p className='no-margin'>(Employment or House-hold)</p> 
                </div>
                <div className='buttons'>
                    <div className='box-1'>
                        <Link to="/service-provider">Service Provider</Link>
                    </div>
                    <div className='box-2'>
                    <Link to="/customer">Customer</Link>
                    </div>
                </div>
            </div>
            <img src={process.env.PUBLIC_URL + '/Images/Image-1.jpg'} />
        </div>
    )
}

export default LandingPage;