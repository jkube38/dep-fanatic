import React from 'react'
import './footer.css'
import headLogo from '../../images/head-final.png'
import logo from '../../images/fanatic-logo-2.png'
import kubeTech from '../../images/WhiteKubeTechLogo.png'

function Footer () {
    return(
        <div id='footer'>
            <div id='logoHolder'>
                <img id='headLogo' alt='creator logo' src={ headLogo } />
                <h2 id='logoText'>A Jordan Kubista production</h2>
            </div>
            <img id='pageLogo' alt='logo' src={logo} />
            <a href='/'>
                <img id='kubeTechLogo' alt='kube tech logo' src={ kubeTech } />
            </a>
        </div>
    )
}

export default Footer