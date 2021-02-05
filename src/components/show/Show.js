import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { image, displayName, actorId, genres, rating, plot, rated, topBilled, ratedBecause, runShow,
         runTopSix, topDisplayReady, topSix, notActor, searchName, knownFor, responseData, trailer, trailerId, actorSelect} from '../../globalState.js'
import './show.css'
import axios from 'axios'
import Iframe from 'react-iframe'


function Show () {
    const [useDisplayName, setuseDisplayName] = useRecoilState(displayName)
    const [useImage, setuseImage] = useRecoilState(image)
    const [useActorId, setuseActorId] = useRecoilState(actorId)
    const [useGenres, setuseGenres] = useRecoilState(genres)
    const [useRating, setuseRating] = useRecoilState(rating)
    const [usePlot, setusePlot] = useRecoilState(plot)
    const [useRated, setuseRated] = useRecoilState(rated)
    const [useTopBilled, setuseTopBilled] = useRecoilState(topBilled)
    const [useRatedBecause, setuseRatedBecause] = useRecoilState(ratedBecause)
    const [useRunShow, setuseRunShow] = useRecoilState(runShow)
    const [useRunTopSix, setuseRunTopSix] = useRecoilState(runTopSix)
    const [useTopDisplayReady, setuseTopDisplayReady] = useRecoilState(topDisplayReady)
    const [useTopSix, setuseTopSix] = useRecoilState(topSix)
    const [useNotActor, setuseNotActor] = useRecoilState(notActor)
    const [useSearchName, setuseSearchName] = useRecoilState(searchName)
    const [useKnownFor, setuseKnownFor] = useRecoilState(knownFor)
    const [useResponseData, setuseResponseData] = useRecoilState(responseData)
    const [useTrailer, setuseTrailer] = useRecoilState(trailer)
    const [useActorSelect, setuseActorSelect] = useRecoilState(actorSelect)
    // const [useTrailerId, setuseTrailerId] = useRecoilState(trailerId)

    

    useEffect(() => {
    const getMovieInfo = async() => {
        if(useActorId.substr(0, 2) === 'tt'){
            document.title = `FANatic - ${useDisplayName}`
            //Gets basic movie info
            const options = {
                method: 'GET',
                url: 'https://imdb8.p.rapidapi.com/title/get-overview-details',
                params: {tconst: useActorId.split('/')[0], currentCountry: 'US'},
                headers: {
                'x-rapidapi-key': '1ddf0a8da3msh877010e622bf74dp10873cjsnd762a292965a',
                'x-rapidapi-host': 'imdb8.p.rapidapi.com'
                }
            };
      
            axios.request(options).then(function (response) {
                setuseImage(response.data.title.image.url)
                setuseGenres(response.data.genres)
                setuseRating(response.data.ratings.rating)
                setusePlot(response.data.plotOutline.text)
                setuseDisplayName(response.data.title.title)
                setuseRated(response.data.certificates.US[0].certificate)
                setuseRatedBecause(response.data.certificates.US[0].ratingReason)
                setuseSearchName('')

            }).catch(function (error) {
                console.error(error);
            });
        }

        let trailerId
        if(useResponseData.d[useActorId.split('/')[1]].v){
            trailerId = useResponseData.d[useActorId.split('/')[1]].v[0].id
        } else {
            trailerId = ''
        }
        console.log(trailerId)
        if(trailerId !== ''){
        const options = {
            method: 'GET',
            url: 'https://imdb8.p.rapidapi.com/title/get-video-playback',
            params: {viconst: trailerId, region: 'US'},
            headers: {
              'x-rapidapi-key': '1ddf0a8da3msh877010e622bf74dp10873cjsnd762a292965a',
              'x-rapidapi-host': 'imdb8.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data.resource.encodings[1].playUrl);
              setuseTrailer(response.data.resource.encodings[1].playUrl)
          }).catch(function (error) {
              console.error(error);
          });
        }
        
    }
    getMovieInfo()
    }, [])


    //Display all list genres of the movie
    const DisplayGenres = () => {
        let genresList = []
        for(let g = 0; g < useGenres.length; g++){
            genresList.push(
                <h2 className='genreType' key={ useGenres[g] }>{useGenres[g]}</h2>
            )
        }
        return genresList
    } 
    
    
    //Display 6 top billed actors
    const DisplayTopBilled = () => {
        console.log('hello')
        let actorDisplay = []
        
        for(let actor = 0; actor < useRunTopSix.length; actor++){
            let actorImg = useRunTopSix[actor][1]
            let actorName = useRunTopSix[actor][0]
            let charId = useRunTopSix[actor][2]
        
            actorDisplay.push(
                <div className='topActor' key={ actorName + actor }>
                    <img className='topImage' id={ actorName } key={ actor } src={ actorImg } alt='Top billed actors' onClick={ GetActor } />
                    <h2 className='topName' key={ actorName }>{ actorName }</h2>
                </div>
            )
        }
        
        setuseTopDisplayReady(true)
        console.log(actorDisplay,'actor display')
        return actorDisplay
    }


    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }  
    
    
    const GetActor = e => {

        let actorsName = e.target.id
    
        const options = {
            method: 'GET',
            url: 'https://imdb8.p.rapidapi.com/title/auto-complete',
            params: {q: actorsName},
            headers: {
             'x-rapidapi-key': '1ddf0a8da3msh877010e622bf74dp10873cjsnd762a292965a',
             'x-rapidapi-host': 'imdb8.p.rapidapi.com'
            }
        };
  
        axios.request(options).then(function (response) {
            setuseSearchName(response.data.d[0].l)
            setuseImage(response.data.d[0].i.imageUrl)
            setuseDisplayName(response.data.d[0].l)
            setuseKnownFor(response.data.d[0].s)
            setuseResponseData(response.data)
            
            if(response.data.d[0].id.substr(0, 2) === 'nm'){
              setuseActorId(response.data.d[0].id)
            } else if(useActorId !== ''){
              setuseActorId('')
            }

            let movieOrShow = response.data.d[0].q
            if (movieOrShow) {
                setuseNotActor(movieOrShow)
            } else {
                setuseNotActor('actor')
                
            }

            }).catch(function (error) {
            console.error(error)
            });
              
    }

    return(
        <div id='fullInfo'>
            <div id='titleHolder'>
                <h1 id='movieTitle'>{ useDisplayName }</h1>
            </div>
            <div id='movieInfo'>
                <div id='posterNRatings'>
                    <img id='moviePoster' alt='moviePoster' src={ useImage } />
                    <h2 id='imdbRating'>IMDb Rating</h2>
                    <h2 id='userRating'>{useRating} / 10</h2>
                </div>
                <div id='movieData'>
                    <div id='genreDisplay'>
                        <DisplayGenres />
                    </div>
                    <Iframe id='trailer' url={ useTrailer } allowFullScreen='true' height='100%' width='100%'/>
                    <p id='plot'>{usePlot}</p>
                    <h2 id='rated'>Rated {useRated}</h2>
                    <p id='ratedReason'>{useRatedBecause}</p>
                </div>
            </div>
            <div id='actorImages2'>
                <DisplayTopBilled />
            </div>
        </div>
    )
}

export default Show