import React from 'react';
import Footer from '../../Layout/Footer/Footer';
import Header from '../../Layout/Header/Header';
import './ServicesPage.css';
import TableLayout from './TableLayout';
import { Link, useParams } from 'react-router-dom';

const ServicesPage = () => {

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
                <div className='services-page'> 
                    <div className='image-box'>
                        <div className='overlay-class'>
                            <div className='text-overlay'>
                                {overlayText}
                            </div>
                        </div>
                        <img src={process.env.PUBLIC_URL + `/Images/${getImageSrc(serviceType)}`} alt={serviceType} />
                    </div>

                    <div className='services-page-table'>
                        <h3>List of available {serviceType}</h3>
                        
                        <TableLayout serviceList={[]} />
                   
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default ServicesPage;


