import React from 'react';
import { useHistory } from 'react-router-dom';

const Forbidden = () => {

    const history = useHistory();

    const handleClick = () => {
        history.push("/");
    }

   return (
    <div className="bounds">
    <h1>Forbidden</h1>
    <p>Oh oh! You can't access this page.</p>
    <div className="pad-bottom">
        <button className="button" onClick={handleClick} type="submit"> Return </button>
    </div>
  </div>
   )
};

export default Forbidden