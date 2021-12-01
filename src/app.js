import './app.css';
import { Exchange } from './pages';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyALXSEaiLbFxp7optCZUBRsK_-_aCJNuVI",
    authDomain: "currency-exchange-prototype.firebaseapp.com",
    projectId: "currency-exchange-prototype",
    storageBucket: "currency-exchange-prototype.appspot.com",
    messagingSenderId: "18444262527",
    appId: "1:18444262527:web:e102f1e544984d7eb0334a",
    measurementId: "G-4MTX0ENYJN"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  return (
    <Exchange />
  );
}

export default App;