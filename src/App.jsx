import React from 'react';
import TreeCanvas from './TreeCanvas';
// import Toolbar from './Toolbar';
import './App.css'; // Assuming you'll have some CSS
import 'reactflow/dist/style.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVeTd7Akgh1nXaQOtOgJH9YIWNqVPdaWs",
  authDomain: "branchedoutapp.firebaseapp.com",
  projectId: "branchedoutapp",
  storageBucket: "branchedoutapp.appspot.com",
  messagingSenderId: "81040536787",
  appId: "1:81040536787:web:1e10ce1d0549a288455026",
  measurementId: "G-VW1JRLCRYV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


function App() {
  return (
    <div className="App">
      {/* <Toolbar /> */}
      <TreeCanvas />
    </div>
  );
}

export default App;
