import React, { useEffect } from 'react'
import './Actor.css'
import { useRecoilState } from 'recoil'
import { searchName, image, displayName, knownFor, actorId, actorImages, actorBio, actorFilmography, actorSelect} from '../../globalState.js'
import noPoster from '../../images/no_poster.png'
import leftButton from '../../images/arrow-left.png'
import rightButton from '../../images/arrow-right.png'
import scrollButtonDivider from '../../images/arrow-spacer.png'
import axios from 'axios'


function Actor () {

    const [useSearchName] = useRecoilState(searchName)
    const [useImage] = useRecoilState(image)
    const [useDisplayName] = useRecoilState(displayName)
    const [useKnownFor] = useRecoilState(knownFor)
    const [useActorId] = useRecoilState(actorId)
    const [useActorImages, setuseActorImages] = useRecoilState(actorImages)
    const [useActorbio, setuseActorBio] = useRecoilState(actorBio)
    const [useActorFilmography, setuseActorFilmography] = useRecoilState(actorFilmography)
    const [useActorSelect, setuseActorSelect] = useRecoilState(actorSelect)


    useEffect (() => {
      if(useActorId.substr(0, 2) === 'nm'){
      document.title = `FANatic - ${useDisplayName}`

    // Call to get Actor bio info
    const getBio = () => {

      const options = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/actors/get-bio',
        params: {nconst: useActorId},
        headers: {
          'x-rapidapi-key': '1ddf0a8da3msh877010e622bf74dp10873cjsnd762a292965a',
          'x-rapidapi-host': 'imdb8.p.rapidapi.com'
        }
        
      };
      
      axios.request(options).then(function (response) {
        setuseActorBio(response.data.miniBios[0].text)
      }).catch(function (error) {
        console.error(error);
      });

    }
    getBio()


    // Call to retrieve filmography
    const getFilmography = () => {
      const options = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/actors/get-all-filmography',
        params: {nconst: useActorId},
        headers: {
          'x-rapidapi-key': '1ddf0a8da3msh877010e622bf74dp10873cjsnd762a292965a',
          'x-rapidapi-host': 'imdb8.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
        let allFilmography = response.data.filmography
        setuseActorFilmography(allFilmography)
        setuseActorSelect('')
        
      }).catch(function (error) {
        console.error(error);
      });
    }
    getFilmography()

    //Retrieves all actor images
    const allImages = () => {
      const options = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/actors/get-all-images',
        params: {nconst: useActorId},
        headers: {
          'x-rapidapi-key': '1ddf0a8da3msh877010e622bf74dp10873cjsnd762a292965a',
          'x-rapidapi-host': 'imdb8.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
        setuseActorImages(response.data.resource.images)
      }).catch(function (error) {
        console.error(error)
      });
    }
    allImages()
  }
  }, [useActorId])

    const DisplayImages = () => {
        let imageList = []
        if (useActorImages.length > 50){
          for(let image = 0; image < 50; image++){
            imageList.push(<img key={ image } className='actorImages' alt={ useActorImages[image].caption } src={ useActorImages[image].url }></img>)
          }
        }
        else {
          for(let image = 0; image < useActorImages.length; image++){
            imageList.push(<img key={ image } className='actorImages' alt={ useActorImages[image].caption } src={ useActorImages[image].url }></img>)
          }
        }
        return imageList
      }

    const DisplayFilmography = () => {
      let titleAndRole = []
      for(let role = 0; role < useActorFilmography.length; role++){
        if (useActorFilmography[role].image){
            titleAndRole.push(<div className='character'>
                                <h6 className='title' key={ useActorFilmography[role].title }>{useActorFilmography[role].title}</h6>
                                <h6 className='role' key={ useActorFilmography[role].characters }>{useActorFilmography[role].characters}</h6>
                                <img key={ role } className='roleImage' alt= {useActorFilmography[role].characters} src={ useActorFilmography[role].image.url}></img>
                                <h6 className='status' key={ -role - 1 }>{useActorFilmography[role].status}</h6>
                              </div>)
        } else {
          titleAndRole.push(<div className='character'><h6 className='title'>{useActorFilmography[role].title}</h6><h6 className='role'>{useActorFilmography[role].characters}</h6><img key={ role } className='roleImage' alt= {useActorFilmography[role].characters} src={ noPoster } ></img><h6 className='status'>{useActorFilmography[role].status}</h6></div>)
        }
      }
      return titleAndRole
    }

    const LeftScroll = () => {
      document.getElementById('roles').scrollLeft -= 500
    }

    const RightScroll = () => {
      document.getElementById('roles').scrollLeft += 500
    }

    const LeftScroll2 = () => {
      document.getElementById('allImages').scrollLeft -= 500
    }

    const RightScroll2 = () => {
      document.getElementById('allImages').scrollLeft += 500
    }

    return (
        <div id='actorInfo'>
            <div id='allBio'>
                <div id='bio'>
                <div id='imageHolder'>
                  <div id='name'>
                    <h2 id='knownFor1'>{useKnownFor.split(',')[0]}</h2>
                    <h2 id='searchName'>{useDisplayName.split('(')[0]}</h2>
                  </div>
                  <img id='searchImage' src={useImage} alt={'Picture of ' + useSearchName}></img>
                </div>
                <div id='bioText'>
                    <h2 id='knownForText'>Known For</h2>
                    <h2 id='knownFor2'>{useKnownFor.split(',')[1]}</h2>
                    <div id="personalBio">
                      <p id='actorBio'>{useActorbio}</p>
                    </div>
                </div>
                </div>
            </div>
            <h2 id='filmographyTitle'>Filmography</h2>
            <div id='filmography'>
              <div id='roles'>
                <DisplayFilmography />
              </div>
            </div>
            <div id='filmScrollArrow'>
              <button id='leftScroll1' onClick={ LeftScroll }><img id='leftButton1' src={ leftButton } alt='left scroll button' /></button>
              <img id='arrowSpacer' alt='scroll button divider' src={scrollButtonDivider} />
              <button id='rightScroll1' onClick={ RightScroll }><img id='rightButton1' src={rightButton} alt='right scroll button' /></button>
            </div>
            <h2 id='actorImages'>Images of {useDisplayName.split('(')[0]}</h2>
            <div id='allImages'>
                <DisplayImages />
            </div>
            <div id='filmScrollArrow'>
              <button id='leftScroll1' onClick={ LeftScroll2 }><img id='leftButton1' src={ leftButton } alt='left scroll button' /></button>
              <img id='arrowSpacer' alt='scroll button divider' src={scrollButtonDivider} />
              <button id='rightScroll1' onClick={ RightScroll2 }><img id='rightButton1' src={rightButton} alt='right scroll button' /></button>
            </div>
        </div>
    )
}

export default Actor