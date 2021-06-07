import React from "react";
import './header.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/bootstrap.min.css';
import '../css/bootstrap-theme.css';
import '../css/elegant-icons-style.css';
 import '../css/style.css';
import '../css/style-responsive.css';


function Header() {
  return (
    <div className="header-dark">       
        <header className="header header--fixed header--scrolling">
        <div className="row"> 
        <div className="col-sm-6 col-md-3 item">
            <div className="header__inner container">
                <h1 className="header__logo-wrapper">
                    <ul className="logo">
                    <a  href="/">
                        <img  src="https://www.agyleintelligence.com/wp-content/themes/agyleintelligence/dist/assets/images/logo.svg" alt="Agyle Intelligence" className="header__logo" /> <span className="header__logo-text">Agyle Intelligence</span>
                    </a>
                    </ul>
                </h1>
            </div>  
            </div>           
            <div className="col-sm-6 col-md-6  header_padding">
                <span className="header_title">Tracking Community Movements</span>              
            </div>
            <div className="col-sm-6 col-md-3  header_padding">
                <span className="header_home">Home</span>              
            </div>             
            </div>
	    
</header>
</div>
  );
}
export default Header;