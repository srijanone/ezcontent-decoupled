import React from "react";
import get from "lodash/get";
import { Helmet } from "react-helmet";

export default props => {
  let environment = get(props, "environment");
  let google_analytics = get(props, "ga");
  let url = "https://www.googletagmanager.com/gtag/js?id=" + google_analytics;

  return (
    <>
    {
      
      (environment !== 'dev') ?
      <Helmet>
      <script async src={url} />
      <script>
        {
        `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','`+google_analytics+`');`
      }
      </script>
      </Helmet>
      : null
    }
    </>
  );
  
};
