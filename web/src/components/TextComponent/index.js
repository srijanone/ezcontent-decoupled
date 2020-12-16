import React from 'react';
import BlockTitle from '../BlockTitle';
export default (
  {
    text, xSmall, small, medium, large, xlarge, bold, className,data,landingPageCheck
  },
) => (
  <>
    <BlockTitle blockTitle={data} landingPageCheck={landingPageCheck}/>
    <div  
      xsmall={xSmall}
      small={small}
      medium={medium}
      large={large}
      xlarge={xlarge}
      bold={bold}
      className={className}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  </>
);