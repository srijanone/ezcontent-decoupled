import React from "react";
import get from "lodash/get";

export default props => {
  let footerItems = get(props, "data.footer-menu");
  if(!footerItems) {
    footerItems = get(props, "data.footer");
  }
  const privacyPolicyItems = get(props, "data.privacy-policy");
  
  return (
    <>
    <footer className="page-footer footer region-footer">
      <div className="">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-3 block--type-text-block">
              <div className="footer--about--address">
                <p>Srijan Technologies</p>
                <p>7E Vandana Building</p>
                <p>Tolstoy Rd, Atul Grove Road,</p>
                <p>Janpath, Connaught Place,</p>
                <p>New Delhi, Delhi 110001</p>
              </div>
            </div>
            <div className="col-sm-8">
              {footerItems &&
                <nav className="row">
                  <ul className="menu--footer-menu w-100 d-flex flex-wrap">
                    {footerItems.map(item => {
                      return (
                        <li className="col-sm-4" key={`f-m-${item.drupal_internal__id}`}>
                          <a href={item.link.url}>
                            {item.title}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              }
            </div>
          </div>
        </div>
      </div>
      <nav aria-labelledby="block-privacypolicy-menu">
        <div className="container">
          <div className="row edge-footer">
            <div className="menu--privacy-policy">
              {privacyPolicyItems &&
                <ul className="menu">
                  {privacyPolicyItems.map(element => (
                    <li key={`pp${element.drupal_internal__id}`}>
                      <a href={element.link.url}>
                        {element.title}
                      </a>
                    </li>
                  ))}
                  <li className="last">
                    <span>&copy; {new Date().getFullYear()} Copyright</span>
                  </li>
                </ul>
              }
            </div>
          </div>
        </div>
      </nav>
    </footer>
    </>
  );
  
};
