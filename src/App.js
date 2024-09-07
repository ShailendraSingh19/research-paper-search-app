import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import SearchPage from './components/SearchPage'
import SavedCollection from './components/SavedCollection';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage></SearchPage>}></Route>
        <Route path="/Collection" element={<SavedCollection></SavedCollection>}></Route>
      </Routes>
    </Router>
  )
};

export default App;
