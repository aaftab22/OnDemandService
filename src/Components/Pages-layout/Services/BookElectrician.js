import React from 'react';
import Footer from '../../Layout/Footer/Footer';
import Header from '../../Layout/Header/Header';
import './BookElectrician.css';
import TableLayout from './TableLayout';
import { Link, useParams } from 'react-router-dom';

const BookElectrician = () => {

    const { paramName, serviceType } = useParams();
    
    let overlayText = `Book your ${serviceType} today!`;

    const getImageSrc = (serviceType) => {
        switch (serviceType) {
            case 'electrician':
                return 'Electrician.jpg';
            case 'plumbing':
                return 'Plumbing.jpg';
            case 'cleaning':
                return 'Cleaner.jpg';
            case 'baby-sitting':
                return 'baby-seater.jpg';
            case 'painter':
                return 'Painter.jpg';
            default:
                return 'default-image.jpg'; 
        }
    };


    return (
        <div>
            <Header />

            <main className='no-margin'>
                <div className='book-electrician'> 
                    <div className='image-box'>
                        <div className='overlay-class'>
                            <div className='text-overlay'>
                                {overlayText}
                            </div>
                        </div>
                        <img src={process.env.PUBLIC_URL + `/Images/${getImageSrc(serviceType)}`} alt={serviceType} />
                    </div>

                    <div className='electrician-table'>
                        <h3>List of available {serviceType}</h3>
                        
                        <TableLayout serviceList={[]} />
                   
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default BookElectrician;


