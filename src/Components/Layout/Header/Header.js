import { Link, NavLink } from 'react-router-dom';
import classes from './Header.css';

const Header = () => {
    // console.log(window.location.href);

    let string = window.location.href;
    let substring = "/service-provider";
    console.log(string.includes(substring));
    let showServices = string.includes(substring);

    return (
        <header className="header">
            <div className='logo'>
                <img
                    className="full-image"
                    src={process.env.PUBLIC_URL + "/Images/logo.png"}
                />
            </div>
            <nav>
                <ul className="list">
                    <li>
                        {showServices 
                        ?
                            <NavLink className={({isActive}) => isActive ? 'first-anchor active' : 'first-anchor'} to="/service-provider/dashboard">Dashboard</NavLink>
                        :
                            <NavLink className={({isActive}) => isActive ? 'first-anchor active' : 'first-anchor'} to="/customer/dashboard">Dashboard</NavLink>
                        }
                        
                    </li>
                    <li>
                        {!showServices ? (
                            <span>
                                <span className='first-anchor' to="/admin">Book a Service</span>                        
                                <ul className='second-ul'>
                                    <li className='second-list'>
                                        <NavLink className={'second-anchor'} to="/customer/book-service/electrician">Electrician</NavLink>    
                                    </li>
                                    <li className='second-list'>
                                        {/* <a className='second-anchor' href="#">Plumbing</a> */}
                                        <NavLink className={'second-anchor'} to="/customer/book-service/plumbing">Plumbing</NavLink>
                                    </li>
                                    <li className='second-list'>
                                        <NavLink className={'second-anchor'} to="/customer/book-service/cleaning">Cleaning</NavLink>
                                    </li>
                                    <li className='second-list'>
                                        <NavLink className={'second-anchor'} to="/customer/book-service/baby-sitting">Baby-Sitting</NavLink>
                                    </li>
                                    <li className='second-list'>
                                        <NavLink className={'second-anchor'} to="/customer/book-service/painter">Painter</NavLink>
                                    </li>
                                </ul>
                            </span>
                        ) : (
                            <span></span>
                        )}
                        
                    </li>
                </ul>
            </nav>
            <div className='right-side'>
                {!showServices ? (
                    /* <NavLink className='' to="/customer">Edit Profile</NavLink> */
                    <NavLink className='' to="/">Logout</NavLink>
                ) : (
                    <NavLink className='' to="/">Logout</NavLink>
                )}
            </div>
        </header>
    )
}

export default Header;