import './App.css';
import React, { useEffect }from 'react'
import './components/header/Header'
import Header from './components/header/Header'
import { notActor, news, upComingTitleId } from './globalState'
import Actor from './components/actor/Actor'
import Show from './components/show/Show'
import Home from './components/home/Home'
import { useRecoilState, useRecoilValue } from 'recoil'
import Footer from './components/footer/Footer'
import FeatureSelect from './components/featureSelect/FeatureSelect';
import TopSix from './components/topSix/TopSix'
import axios from 'axios'
import GetComingSoon from './components/getComingSoon/GetComingSoon'



function App() {

    const [useNews, setuseNews] = useRecoilState(news)
    const [useUpComingTitleId, setuseUpComingTitleId] = useRecoilState(upComingTitleId)
    let pageView = useRecoilValue(notActor)


    useEffect(() => {
      const options = {
          method: 'GET',
          url: 'https://imdb8.p.rapidapi.com/title/get-news',
          params: {tconst: 'tt0944947', limit: '25'},
          headers: {
            'x-rapidapi-key': '1ddf0a8da3msh877010e622bf74dp10873cjsnd762a292965a',
            'x-rapidapi-host': 'imdb8.p.rapidapi.com'
          }
        };
        
        axios.request(options).then(function (response) {
          console.log(response.data)
          setuseNews(response.data.items)
        }).catch(function (error) {
            console.error(error);
        });

      
        const options2 = {
          method: 'GET',
          url: 'https://imdb8.p.rapidapi.com/title/get-coming-soon-movies',
          params: {homeCountry: 'US', purchaseCountry: 'US', currentCountry: 'US'},
          headers: {
            'x-rapidapi-key': '1ddf0a8da3msh877010e622bf74dp10873cjsnd762a292965a',
            'x-rapidapi-host': 'imdb8.p.rapidapi.com'
          }
        };
        
        axios.request(options2).then(function (response) {
          setuseUpComingTitleId(response.data.slice(0, 10))
        }).catch(function (error) {
          console.error(error);
        });
        
    }, [])

    
    console.log(pageView)
    const ActorOrShow = () => {
      if (pageView === 'home' || pageView === ''){
        return <Home />
      } else if(pageView === 'actor'){
        return <Actor />
      } else if (pageView === 'feature' || pageView === 'TV series'){
        return <FeatureSelect />
      } else if (pageView === 'selectedMovie'){
        return <Show />
      } else if (pageView === 'getTopSix'){
        return <TopSix />
      } else if (pageView === 'comingSoon'){
        return <GetComingSoon />
      }
    }

  

  return (
    <div className="App">
      <Header />
      <ActorOrShow />
      <Footer />
    </div>
  );
}

export default App;
