
import React from 'react';
import { graphql } from 'gatsby';
import PageTemplate from "./_main";

const LandingPage = (props) => {
  let data = props.data.nodeLandingPage.full_content;
  return (
    <PageTemplate props={props} data={data} />
  );
};

export default LandingPage;

export const querypage = graphql`
 query landingPageData ($id: String){
    nodeLandingPage (id: { eq: $id })  {
      full_content
    }
  }
`