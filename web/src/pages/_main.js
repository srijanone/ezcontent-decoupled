
import React from 'react';

import GoogleAnalytics from "../components/GoogleAnalytics";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Component from "../components";

const PageTemplate = (props) => {
  
  const { drupal_host = null, google_analytics = null, environment = null } = props.props.pageContext;
  const { page = null, header = null, footer = null } = JSON.parse(props.data);

  return (
    <>
      <GoogleAnalytics environment={environment} ga={google_analytics} />
      <Header data={header} />
      <Component data={page} baseUrl={drupal_host} />
      <Footer data={footer}/>
    </>
  );
};

export default PageTemplate;
