import React from 'react';
import './AddressesPage.css';
import Header from '../../../Layout/Header/Header';
import Footer from '../../../Layout/Footer/Footer';
import NewAddress from './NewAddress';
import AddressListing from './AddressListing';

const AddressesPage = () => {
    

    return (
        <div>
            <Header />

            <main className='no-margin'>
                <div className='addresses-page'> 
                    <div className='image-box'>
                        <div className='overlay-class'>
                            <div className='text-overlay'>
                                Your address for the Services
                            </div>
                        </div>
                        <img src={process.env.PUBLIC_URL + `/Images/addresses.png`}/>
                    </div>

                    <div className='addresses-page-table'>

                        <NewAddress />

                        <br /><br />

                        <h3>List of available addresses</h3>
                        
                        <AddressListing />
                   
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default AddressesPage;


