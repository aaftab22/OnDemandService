import React from 'react';
import Footer from '../../Layout/Footer/Footer';
import Header from '../../Layout/Header/Header';
import './ServiceListingPage.css';
import { Link, useParams } from 'react-router-dom';
import ServiceListing from './ServiceListing';

const ServiceListingPage = () => {

    const { paramName, serviceType } = useParams();
    
    let overlayText = `Book your ${serviceType} today!`;

    
    let string = window.location.href;
    let substring = "/customer/past-services";
    console.log(string.includes(substring));
    let showServices = string.includes(substring);
    // True - user is on past-services page
    // False - user is on upcoming-services page

    return (
        <div>
            <Header />

            <main className='no-margin'>
                <div className='service-listing-page'> 
                    <div className='image-box'>
                        <div className='overlay-class'>
                            <div className='text-overlay'>
                                {showServices
                                ?
                                <span>Services Availed</span>
                                : 
                                <span>Upcoming Services</span>
                                }
                            </div>
                        </div>
                        {showServices
                        ? 
                        <img src={process.env.PUBLIC_URL + `/Images/done-services.jpg`} />
                        :
                        <img src={process.env.PUBLIC_URL + `/Images/upcoming-services.png`} alt={serviceType} />
                        }
                        </div>

                    <div className='services-listing-page-table'>
                        <h3>List of available {serviceType}</h3>
                        
                        <ServiceListing />
                   
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default ServiceListingPage;


