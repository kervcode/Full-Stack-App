import React from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
  const history = useHistory();
    console.log(history)

    const handleClick = () => {
        history.push("/");
    }

  return (
    <div className="bounds">
      <h1>Not Found</h1>
      <p>Sorry! We couldn't find the page you're looking for.</p>
      <div className="pad-bottom">
          <button className="button" onClick={handleClick} type="submit"> Return </button>
      </div>
    </div>
  )
};

