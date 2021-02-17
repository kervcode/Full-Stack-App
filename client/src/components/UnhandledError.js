import React from 'react';
import { useHistory } from 'react-router-dom';

const UnhandledError = () => {
  const history = useHistory();
    const handleClick = () => {
        history.push("/");
    }

  return (
    <div className="bounds">
      <h1>Error</h1>
      <p>Sorry! We just encountered an unexpected error.</p>
      <div className="pad-bottom">
          <button className="button" onClick={handleClick} type="submit"> Return </button>
      </div>
    </div>
  )
};

export default UnhandledError;


