import './App.css';
import React from 'react'
import './components/header/Header'
import Header from './components/header/Header'
import { notActor } from './globalState'
import Actor from './components/actor/Actor'
import Show from './components/show/Show'
import Home from './components/home/Home'
import { useRecoilValue } from 'recoil'
import Footer from './components/footer/Footer'
import FeatureSelect from './components/featureSelect/FeatureSelect';
import TopSix from './components/topSix/TopSix'



function App() {

    let pageView = useRecoilValue(notActor)
    
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
