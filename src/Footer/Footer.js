import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <section className='footer-section'>
            <p className='footer-address'>Sainath Ashramam Bowrampet, GCX3+7CQ, Miyapur Rd, ALEAP Industrial Area, Gajularamaram, Hyderabad, Telangana 500090, India.</p>
            <a className="maps-logo" rel="noreferrer" href="https://www.google.com/maps?s=web&sca_esv=595008627&lqi=ChtzYWkgYmFiYSBhc2hyYW1hbSBib3dyYW1wZXRIsdO70eaAgIAIWicQABABEAIYAhgDIhtzYWkgYmFiYSBhc2hyYW1hbSBib3dyYW1wZXSSAQZhc2hyYW2aASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVTnphWEZ5UkU1QkVBRaoBWxABKhUiEXNhaSBiYWJhIGFzaHJhbWFtKAAyHxABIhsLDIjz_JL1Q_mOj4u1QWeL5djpsxs-tfF7I4oyHxACIhtzYWkgYmFiYSBhc2hyYW1hbSBib3dyYW1wZXTgAQA&vet=12ahUKEwi8oJ3h_L2DAxXXvokEHdxfBJgQ1YkKegQIHBAB..i&cs=1&um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=Ke3Tbwhpjss7MbZ0PojrRg8X&daddr=GCX3%2B7CQ,+Miyapur+Rd,+ALEAP+Industrial+Area,+Gajularamaram,+Hyderabad,+Telangana+500090,+India"
            target="_blank">
                <img src="maps.jpeg" alt="maps-logo"></img>
            </a>
            <div className='logos'>
                <a className="facebook-logo" rel="noreferrer" href="https://m.facebook.com/people/Sri-sainath-ashraram-bowrampet/100067029424352/" target="_blank">
                     <img src="social-facebook.svg" alt="facebook-logo"></img>
                </a>

                <a className="instagram-logo" rel="noreferrer" href="https://www.instagram.com/" target="_blank">
                     <img src="instagram.svg" alt="instagram-logo"></img>
                </a>

                <a className="whatsapp-logo" rel="noreferrer" href="https://www.whatsapp.com/" target="_blank">
                     <img src="whatsapp.svg" alt="whatsapp-logo"></img>
                </a>
            </div>
        </section>
    )
}

export default Footer;