
import React from 'react';

const PageNotFound = props => {
  return (
    <div className="page--not-found">
      <style jsx='true' global='true'>{`
            .page--not-found {
              max-width:720px;
              margin:0 auto;
              padding:80px 0
            }
          `}</style>
      <h1>404</h1>
      <h6>Page not found!</h6>
    </div>
  );
};

export default PageNotFound;