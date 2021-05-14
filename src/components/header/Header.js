import React, { Fragment } from 'react'
import { useRecoilState } from 'recoil'
import { searchName, image, displayName, knownFor, actorId, notActor, responseData} from '../../globalState.js'
import axios from 'axios'
import './header.css'
import purpleLogo from '../../images/fanatic-logo-2.png'


function Header () {

    const [useSearchName, setuseSearchName] = useRecoilState(searchName)
    const [useImage, setuseImage] = useRecoilState(image)
    const [useDisplayname, setuseDisplayname] = useRecoilState(displayName)
    const [useKnownFor, setuseKnownFor] = useRecoilState(knownFor)
    const [useActorId, setuseActorId] = useRecoilState(actorId)
    const [useIsNotActor, setisNotActor] = useRecoilState(notActor)
    const [useResponseData, setuseResponseData] = useRecoilState(responseData)

    // Initial call from user search
    const fakeImdbSearch = (query) => {

        const options = {
            method: 'GET',
            url: 'https://imdb8.p.rapidapi.com/title/auto-complete',
            params: {q: query},
            headers: {
             'x-rapidapi-key':  "ee1a65823amsh5fe2d14b7f16274p19c33djsn9fdce1c4db82",
             'x-rapidapi-host': 'imdb8.p.rapidapi.com'
            }
        };
  
        axios.request(options).then(function (response) {
            setuseSearchName(response.data.d[0].l)
            setuseImage(response.data.d[0].i.imageUrl)
            setuseDisplayname(response.data.d[0].l)
            setuseKnownFor(response.data.d[0].s)
            setuseResponseData(response.data)
            
            if(response.data.d[0].id.substr(0, 2) === 'nm'){
              setuseActorId(response.data.d[0].id)
            } else if(useActorId !== ''){
              setuseActorId('')
            }

            let movieOrShow = response.data.d[0].q
            if (movieOrShow) {
                setisNotActor(movieOrShow)
                setuseSearchName('')
            } else {
                setisNotActor('actor')
                setuseSearchName('')
            }

            }).catch(function (error) {
            console.error(error)
            });
          
        clearSearch()
    }

    const clearSearch = () => {
      document.getElementById('search').value = ''
    }

    const gatherSearchData = () => {

        let searchInput = document.getElementById('search').value
        setuseSearchName(searchInput)

        fakeImdbSearch(searchInput)

    }
    
    return(
    <Fragment>
    <header>
      <a href='/' className='image-link'>
        <img src={purpleLogo} id='fanLogo' alt='Fanatic Logo' />
      </a>
        <div id='searchBB'>
            <input id='search' type='text' placeholder='search movie, actor'></input>
            <button id='searchButton' onClick={gatherSearchData}>SEARCH</button>
        </div>
    </header>
      <h1>SEARCH TV, MOVIES AND ACTORS</h1>
    </Fragment>
    )

}
export default Header