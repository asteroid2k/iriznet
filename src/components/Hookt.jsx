import React, { useState } from 'react';
import toaster  from 'toasted-notes';
import "toasted-notes/src/styles.css";
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'reactstrap';

toast.configure()
function Hookt() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);


  function dl(event){
      event.preventDefault()
      toaster.notify(
                    <div className="container bg-success">
                      <div className="row">
                        <div className="col">
                          svg
                        </div>
                        <div className="col">
                          texttttttttt                          
                        </div>
                      </div>                     
                    </div>
                    ,{duration:2000});
      

};
  

  return (
    <div>
      <Spinner type="grow" color="dark" style={{ width: '3rem', height: '3rem' }}/>
      <svg >
    <path
      fillRule="evenodd"
      d="M5.05.01c.81 2.17.41 3.38-.52 4.31C3.55 5.37 1.98 6.15.9 7.68c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.01 8.68 2.15 5.05.02L5.03 0l.02.01z"
    />
  </svg>
      <p>You clicked {count} times</p>
      <button onClick={() => toast.error('jhdshdshjs')}>
        Click me
      </button>
      <button onClick={dl}>
        Toast
      </button>
    </div>
  );
}

export default Hookt;
