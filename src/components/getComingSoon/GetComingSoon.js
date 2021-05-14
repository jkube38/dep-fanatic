import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { upComingTitleId, upComingTitleData, notActor} from '../../globalState'
import purpleKube from '../../images/purplekube.png'


function GetComingSoon () {

    const [useUpComingTitleId, setuseUpComingTitleId] = useRecoilState(upComingTitleId)
    const [useUpComingTitleData, setuseUpComingTitleData] = useRecoilState(upComingTitleData)
    const [useNotActor, setuseNotActor] = useRecoilState(notActor)

    document.title = 'Loading | FANatic'

    let splitIds = []

    for(let id = 0; id < useUpComingTitleId.length; id++){
        splitIds.push(useUpComingTitleId[id].split('/')[2])
    }

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }

    let comingSoonData = []

    useEffect(() => {
        const getTenComingSoon = async () => {

            if(comingSoonData.length < 1){

                for(let title = 0; title < splitIds.length; title++){
                    await sleep(800)
                    const options = {
                        method: 'GET',
                        url: 'https://imdb8.p.rapidapi.com/title/get-top-stripe',
                        params: {tconst: splitIds[title], currentCountry: 'US', purchaseCountry: 'US'},
                        headers: {
                          'x-rapidapi-key':  "ee1a65823amsh5fe2d14b7f16274p19c33djsn9fdce1c4db82",
                          'x-rapidapi-host': 'imdb8.p.rapidapi.com'
                        }
                      };
                      
                      axios.request(options).then(function (response) {
                          comingSoonData.push({
                              movieTitle: response.data.title.title,
                              poster: response.data.title.image.url,
                              year: response.data.title.year,
                              id: response.data.title.id.split('/')[2]
                            })
                      }).catch(function (error) {
                          console.error(error);
                      });
                }
                await sleep(2000)
                getTenComingSoon()
            } else if (comingSoonData.length > 0){
                setuseUpComingTitleData(comingSoonData)
                setuseNotActor('home')
            } else {
                getTenComingSoon()
            }
            
        }
        getTenComingSoon()
    }, [])

    return(
        <div id='loadingData'>
            <img id='purpleKube' alt='processing spinner kube' src={ purpleKube }/>
            <h1>Grabbing some up coming movies and Hollywood news for you!</h1>
        </div>
    )
}

export default GetComingSoon