import React from 'react'

const Footer = () => {
  return (
    <footer className="section__container bg-white text-black py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-8">
        <div className="footer__col">
          <h4 className="footer__heading text-xl font-semibold mb-4">CONTACT INFO</h4>
          <p><i className="ri-map-pin-2-fill"></i> 666, Medan, Sumatera Utara</p>
          <p><i className="ri-mail-fill"></i> mohammadkautsar30@gmail.com</p>
          <p><i className="ri-phone-fill"></i> (+062) 6666 666</p>
        </div>
        <div className="footer__col">
          <h4 className="footer__heading text-xl font-semibold mb-4">COMPANY</h4>
          <p>Home</p>
          <p>About Us</p>
          <p>Work With Us</p>
          <p>Our Blog</p>
          <p>Terms & Conditions</p>
        </div>
        <div className="footer__col">
          <h4 className="footer__heading text-xl font-semibold mb-4">LINK</h4>
          <p>Help</p>
          <p>Track My Order</p>
          <p>Men</p>
          <p>Women</p>
          <p>Shoes</p>
        </div>
        <div className="footer__col">
          <h4 className="footer__heading text-xl font-semibold mb-4">INSTAGRAM</h4>
          <div className="grid grid-cols-2 gap-2">
            <img src="assets/instagram-1.jpg" alt="instagram" className="rounded-md" />
            <img src="assets/instagram-2.jpg" alt="instagram" className="rounded-md" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer