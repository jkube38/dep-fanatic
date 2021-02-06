import React, { useEffect } from 'react'
import './home.css'
import logo from '../../images/fanaticlog-white.png'
import { useRecoilState } from 'recoil'
import { news, upComingTitleData, actorId, notActor, trailerId } from '../../globalState'
import axios from 'axios'



function Home () {

    const [useNews, setuseNews] = useRecoilState(news)
    const [useUpComingTitleData, setuseUpComingTitleData] = useRecoilState(upComingTitleData)
    const [useActorId, setuseActorId] = useRecoilState(actorId)
    const [useNotActor, setuseNotActor] = useRecoilState(notActor)
    const [useTrailerId, setuseTrailerId] = useRecoilState(trailerId)
    
    document.title = 'FANatic'

    const GetNewsArticles = () => {

        let singleArticle = []
        
            for(let article = 0; article < useNews.length; article++){

                let articleList = useNews

                singleArticle.push(
                <div className='articleHolder' key={articleList[article].id}>
                    <div className='headingHolder' key={article+article}>
                        <h2 className='articleHeading' key={articleList[article].head.substr(0, 10)[article]}>{articleList[article].head}</h2>
                    </div>
                    <div className='picAndBody' key={articleList[article].body.substr(0, 10)} >
                        <img className='newsPic' alt='picture related to article' key={articleList[article].image.id} src={articleList[article].image.url} />
                        <p className='body' key={articleList[article].body.substr(0, 10)}>{articleList[article].body}</p>
                    </div>
                    <h3 className='source' key={articleList[article].source.id}><a href={ articleList[article].link } target='_blank'>Visit source: {articleList[article].source.label} for full article</a></h3>
                </div>
                )
            }
        return singleArticle
    }

    const DisplayUpcoming = () => {
        
        let upcoming = []

        for(let soon = 0; soon < useUpComingTitleData.length; soon++){
            let data = useUpComingTitleData[soon]
            upcoming.push(
                <div className='singleUpcoming'>
                    <h2 className='upcomingTitle' key={ data.movieTitle }>{ data.movieTitle }</h2>
                    <img className='upcomingPoster' id={ data.id } key={ data.movieTitle + soon} alt={ data.movieTitle + 'poster' } src={ data.poster } onClick={ ShowPage }/>
                    <h2 className='upcomingYear' key={ data.year,soon}>{ data.year}</h2>
                </div>
            )
        }
        return upcoming
    }

    let titleId
    const ShowPage = e => {
        setuseActorId(e.target.id)
        titleId = e.target.id
        getTrailerId()
    }

    
    let count = 0
    const getTrailerId = () => {

        if(titleId.slice(0, 2) === 'tt'){
            
            const options = {
                method: 'GET',
                url: 'https://imdb8.p.rapidapi.com/title/get-videos',
                params: {tconst: titleId, limit: '25', region: 'US'},
                headers: {
                  'x-rapidapi-key': '1ddf0a8da3msh877010e622bf74dp10873cjsnd762a292965a',
                  'x-rapidapi-host': 'imdb8.p.rapidapi.com'
                }
              };
              
              axios.request(options).then(function (response) {
                setuseTrailerId(response.data.resource.videos[0].id.split('/')[2])
                setuseNotActor('getTopSix')
                
              }).catch(function (error) {
                  console.error(error);
              });
            } else if (count < 5) {
                count += 1
                getTrailerId()
            }
            
    }
    
    
    return(
        <div id='homeHolder'>
            <div id='logoHolder2'>
                <img id='logo' alt='logo' src={logo} />
            </div>
            <div id='newsAndUpcoming'>
                <div id='upcomingComponents'>
                    <div id='upcomingHeaderHolder'>
                        <h1 id='upcomingHeader'>Coming Soon</h1>
                    </div>
                    <div id='comingSoonHolder'>
                        <DisplayUpcoming />
                    </div>
                </div>
                <div id='newsComponents'>
                    <div id='newsHeaderHolder'>
                        <h1 id='topNews'>Top News</h1>
                    </div>
                    <div id='newsHolder'>
                        <GetNewsArticles />
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default Home