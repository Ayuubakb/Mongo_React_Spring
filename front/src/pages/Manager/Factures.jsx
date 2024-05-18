import React from 'react'

const Factures = () => {
    
  return (
    <section className='facture'>
        <div className='head'>
            <h1>Facture</h1>
        </div>
        <div className='companyInfo'>
            <h1>AutoRental</h1>
            <p><span>Address :</span>  Avenue de la Palestine Mhanech I, Tetouan</p>
            <p><span>Website :</span> AutoRental.com</p>
        </div>
        <div className='date'>
            <p>Generated the 25 Tuesday 2024</p>
            <p>In Tetouan</p>
        </div>
        <div className='clientCar'>
            <div className='client'>
                <h2>For : Ayoub Akoubri</h2>
                <p><span>E-mail : </span>AyoubAkoubri@gmail.com</p>
                <p><span>Phone : </span>0700821400</p>
            </div>
            <div className='car'>
                <h2>Rental Of: Audi A8 2022</h2>
                <p><span>From : </span>24/05/2024</p>
                <p><span>To : </span>30/05/2024</p>
            </div>
        </div>
        <div className='addition'>
            <div className='ppd'>
                <p>Price Per Day: 150 Dh</p>
            </div>
            <div className='days'>
                <p>Period: 5 Days</p>
            </div>
            <div className='total'>
                <p>Total: 750 Dh</p>
            </div>
        </div>
    </section>
  )
}

export default Factures