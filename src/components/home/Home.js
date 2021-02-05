import React from 'react'
import './home.css'
import logo from '../../images/fanaticlog-white.png'


function Home () {

    
    document.title = 'FANatic'
    

    return(
        
        <div id='homeHolder'>
            <h1 id='welcome1'>WELCOME TO</h1>
            <div id='logoHolder'>
                <img id='logo' alt='logo' src={logo} />
            </div>
        </div>
    )
}

export default Home