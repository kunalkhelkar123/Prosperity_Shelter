import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'flowbite/dist/flowbite.css';
import 'flowbite';

// import 'flowbite/dist/flowbite.css';
// import Feature from './Components/Feature/Feature.jsx'
// import ViewPropertyMain from './Components/viewproperty/ViewPropertyMain.jsx'
// import SliderComp from './Components/viewproperty/SliderComp.jsx'
// import DummyTest from '../src/Components/viewproperty/DummyTest.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <ViewPropertyMain /> */}
   {/* <SliderComp/> */}
   <App/>

   {/* <Feature/> */}
  </React.StrictMode>
)
