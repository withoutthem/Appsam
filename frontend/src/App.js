//libs 
import { Routes, Route, Link } from 'react-router-dom';

// css
import './style/main.css';

// components
import Header from './components/Header';
import Footer from './components/Footer';

// pages
import Main from './pages/Main';
import CompareAll from './pages/CompareAll';
import CompareOne from './pages/CompareOne';
import Apple from './pages/Apple';
import Samsung from './pages/Samsung';
import DonationPlease from './pages/DonationPlease';
import WhosDev from './pages/WhosDev';
import SagongSa from './pages/SagongSa';


const App = () => {

  return (
    <div className="wrapper"> 
    <Header></Header>
		<Routes> 
			<Route path="/" element={ <Main/> } />
      <Route path="/compareall" element={ <CompareAll/> } />
      <Route path="/compareone" element={ <CompareOne/> } />
      <Route path="/apple" element={ <Apple/> } />
      <Route path="/samsung" element={ <Samsung/> } />
      <Route path="/donation" element={ <DonationPlease/> } />
      <Route path="/whosdev" element={ <WhosDev/> } />
      <Route path="*" element={ <SagongSa/> } />
    </Routes>
    <Footer></Footer>
    </div>
  );
}

export default App;
