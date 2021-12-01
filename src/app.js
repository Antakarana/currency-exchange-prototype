import './app.css';
import { Exchange } from './pages';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from './utils/settings';

const App = () => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  getAnalytics(app);

  return (
    <Exchange />
  );
}

export default App;