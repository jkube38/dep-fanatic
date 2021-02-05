import React from 'react'
import { useRecoilState } from 'recoil'
import axios from 'axios'
import './topsix.css'
import { useEffect } from 'react'
import { topBilled, topSix, topDisplayReady, runTopSix, notActor, actorId } from '../../globalState'
import purpleKube from '../../images/purplekube.png'



function TopSix () {

    const [useTopBilled, setuseTopBilled] = useRecoilState(topBilled)
    const [useTopSix, setuseTopSix] = useRecoilState(topSix)
    const [useTopDisplayReady, setuseTopDisplayReady] = useRecoilState(topDisplayReady)
    const [useRunTopSix, setuseRunTopSix] = useRecoilState(runTopSix)
    const [useNotActor, setuseNotActor] = useRecoilState(notActor)
    const [useActorId, setuseActorId] = useRecoilState(actorId)
        
    
    
     //Gets Top cast
     useEffect(() => {
         console.log(useActorId.substr(0, 2))
        if(useActorId.substr(0, 2) === 'tt'){
            const options = {
                method: 'GET',
                url: 'https://imdb8.p.rapidapi.com/title/get-top-cast',
                params: {tconst: useActorId.split('/')[0]},
                headers: {
                  'x-rapidapi-key': '1ddf0a8da3msh877010e622bf74dp10873cjsnd762a292965a',
                  'x-rapidapi-host': 'imdb8.p.rapidapi.com'
                }
              };
              axios.request(options).then(function (response) {
                  setuseTopBilled(response.data.slice(0, 6))
                  console.log('Top build should be set')
              }).catch(function (error) {
                  console.error(error)
              });
            console.log('end of get top cast')
            
            }
            }, [])
     
     
    
        // Get 6 top billed actors
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
          }
    
        
        // if(useTopBilled.length === 6){
        useEffect(() => {
          const getCharBio = async () => {
            if(useTopBilled.length > 0){
            console.log('starting char bio')
            let topBilledList = []
            let count = 6
    
            for(let character = 0; character < count; character++){
                await sleep(500)
                let characterId = useTopBilled[character].split('/')[2]
                const options = {
                    method: 'GET',
                    url: 'https://imdb8.p.rapidapi.com/actors/get-bio',
                    params: {nconst: characterId},
                    headers: {
                    'x-rapidapi-key': '1ddf0a8da3msh877010e622bf74dp10873cjsnd762a292965a',
                    'x-rapidapi-host': 'imdb8.p.rapidapi.com'
                    }
                };
    
                axios.request(options).then(function (response) {
                    console.log([response.data.name, response.data.image.url, response.data.id.split('/')[2]], 'request')
                    topBilledList.push([response.data.name, response.data.image.url, response.data.id.split('/')[2]])
                    
                }).catch(function (error) {
                    console.error(error);
                });
            
                
            }
            await sleep(1000)
            setuseRunTopSix(topBilledList)
            setuseTopBilled([])
            console.log('get bio done')
            await sleep(1500)
            setuseNotActor('selectedMovie')
            }
        }
        getCharBio()
        }, [useTopBilled])
    

    return (
        <div id='loadingData'>
            <img id='purpleKube' alt='processing spinner kube' src={ purpleKube }/>
            <h1>Fectching your request</h1>
        </div>
    )
}

export default TopSix