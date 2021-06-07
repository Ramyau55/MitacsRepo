import React from "react";
import './footer.css';
import 'bootstrap/dist/css/bootstrap.css';

function Footer() {
  return (
    <div className="footer-dark">
    <footer>
        <div className="container">
            <div className="row"> 
                <div className="col-sm-6 col-md-3 item">               
                    <ul className="logo">
                    <img className="logo" src="https://www.agyleintelligence.com/wp-content/themes/agyleintelligence/dist/assets/images/logo-white.svg" className="footer__logo mb-5" />
                    </ul>
                </div>              
                <div className="col-sm-6 col-md-3 item">
                    <h3>Contact US</h3>
                    <ul>
                        <li>sales@agyleintelligence.com</li>
                        <li>(877) 552-4953</li>
                        <li>Agyle Intelligence Mount Stewart, PE C0A 1T0 Canada</li>
                    </ul>
                </div>
                <div className="col-md-6 item text">
                    <h3>Agyle Intelligence</h3>
                    <p>Agyle Intelligence provides automation software intended to provide faster access to collected data.</p>
                </div>
            </div>
            <p className="copyright">Agyle Intelligence © 2018</p>
        </div>
    </footer>
</div>
  );
}

export default Footer;