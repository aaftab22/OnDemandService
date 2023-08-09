import React from 'react';
import Footer from '../../Layout/Footer/Footer';
import Header from '../../Layout/Header/Header';
import './SPServicesListing.css';
import SPServiceListing from './SPServiceListing';

const SPServicesListing = () => {
    
    let string = window.location.href;
    let substring = "/service-provider/past-services";
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
                                <span>Completed Services</span>
                                : 
                                <span>Upcoming Services</span>
                                }
                            </div>
                        </div>
                        {showServices
                        ? 
                        <img src={process.env.PUBLIC_URL + `/Images/done-services.jpg`} />
                        :
                        <img src={process.env.PUBLIC_URL + `/Images/upcoming-services.png`} />
                        }
                        </div>

                    <div className='services-listing-page-table'>
                        <h3>List of  
                        {showServices
                        ?
                            <span> completed services</span>
                        :
                            <span> upcoming services</span>
                        }
                        </h3>
                        <SPServiceListing />
                   
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default SPServicesListing;


