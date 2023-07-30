import { Link, NavLink } from 'react-router-dom';
import classes from './Header.css';

const Header = () => {
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
                        <NavLink className={({isActive}) => isActive ? 'first-anchor active' : 'first-anchor'} to="/customer/dashboard">Dashboard</NavLink>
                    </li>
                    <li>
                        <span className='first-anchor' to="/admin">Book a Service</span>
                        <ul className='second-ul'>
                            <li className='second-list'><a className='second-anchor' href="#">Electrician</a></li>
                            <li className='second-list'><a className='second-anchor' href="#">Plumbing</a></li>
                            <li className='second-list'><a className='second-anchor' href="#">Cleaning</a></li>
                            <li className='second-list'><a className='second-anchor' href="#">Baby Sitting</a></li>
                            <li className='second-list'><a className='second-anchor' href="#">Painter</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div className='right-side'>
                {/* <NavLink className='' to="/customer">Edit Profile</NavLink> */}
                <NavLink className='' to="/customer">Logout</NavLink>
            </div>
        </header>
    )
}

export default Header;