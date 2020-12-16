
import React from 'react';
import { graphql } from 'gatsby';
import PageTemplate from "./_main";

const ArticlePage = (props) => {
  let data = props.data.nodeArticle.full_content
  return (
    <PageTemplate props={props} data={data} />
  );
};

export default ArticlePage;

export const querypage = graphql`
 query articleData ($id: String){
    nodeArticle (id: { eq: $id })  {
      full_content
    }
  }
`
