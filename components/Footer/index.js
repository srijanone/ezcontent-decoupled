import React from 'react';
import get from 'lodash/get';

export default (props) => {

  let footerItemsLeft = get(props, 'data.footerLeft');
  let footerItemsRight = get(props, 'data.footerRight');
  // if(!footerItems) {
  //   footerItems = get(props, "data.footer");
  // }
  const privacyPolicyItems = get(props, 'data.privacy-policy');

  return (
    <>
      <footer className="page-footer footer region-footer">
        <div className="">
          <div className="container">
            <div className="row">
              {footerItemsLeft || footerItemsRight ? (
                <>
                  <div className="col-lg-6 d-flex align-items-start">
                    {footerItemsLeft && (
                      <nav className="row">
                        <h2 className="footer__heading">TGR Section</h2>
                        <ul className="menu--footer-menu w-100 d-flex flex-wrap">
                          {footerItemsLeft?.map((item) => {
                            return (
                              <li key={item?.id}>
                                <a href={item.link.url}>{item.title}</a>
                              </li>
                            );
                          })}
                        </ul>
                      </nav>
                    )}
                    {footerItemsRight && (
                      <nav className="row">
                        <h2 className="footer__heading">About TGR</h2>
                        <ul className="menu--footer-menu w-100 d-flex flex-wrap">
                          {footerItemsRight?.map((item) => {
                            return (
                              <li key={item?.id}>
                                <a href={item.link.url}>{item.title}</a>
                              </li>
                            );
                          })}
                        </ul>
                      </nav>
                    )}
                  </div>

                  <div className="col-lg-6 d-flex">
                    {/* Newsletter */}
                    <div className="subscription__content subscription_form__1556">
                      <h2 className="h2">
                        <span className="heading-border">
                          Be among the first to know the Breaking news
                        </span>
                      </h2>
                      <form
                        className="subscription-form-1"
                        action="/home-ezcontent-all-its-component"
                        method="post"
                        id="subscription-form-1"
                        accept-charset="UTF-8"
                      >
                        <input
                          type="hidden"
                          name="newsletter_shortcode"
                          value="Mediacorp_Partners"
                        />
                        <div className="subscribe-form-wrapper">
                          <div className="form-item">
                            <input
                              placeholder="Enter email address"
                              type="text"
                              id="edit-email"
                              name="email"
                              value=""
                              size="60"
                              maxLength="128"
                              className="form-text"
                            />
                          </div>
                          <input
                            type="hidden"
                            name="subscription_div_identifier"
                            value="subscription_form__1556"
                          />
                          <input
                            type="hidden"
                            name="form_build_id"
                            value="form-Yj9bOIhx_EoABHkVzdf-QRe5PdhhkvuPmXqcd59cxv8"
                          />
                          <input
                            type="hidden"
                            name="form_id"
                            value="subscription_form_1"
                          />
                          <div className="submit-wrapper">
                            <input
                              type="submit"
                              id="edit-submit--2"
                              name="op"
                              value="Subscribe Now"
                              className="button"
                            />
                          </div>
                        </div>
                      </form>
                      <p className="subscription__sub-heading">
                        By clicking subscribe, I agree to receive news updates
                        and promotional material from TGP.
                      </p>
                    </div>

                    {/* Social Media */}

                    <section
                      id="block-mc-cna-theme-socialmedialinks"
                      className="block-social-media-links block"
                    >
                      <h2 className="h2 h2--social-heading">
                        <span className="heading-border">Follow our news</span>
                      </h2>
                      <div className="footer-dowload">
                        <a
                          className="footer-dowload__link"
                          href="https://play.google.com/store/apps/details"
                          title="Google Play"
                        >
                          <img
                            className="footer-dowload__google-play"
                            src="/assets/img/logos_google-play-icon.png"
                            alt="Google Play"
                          />
                        </a>
                        <a
                          className="footer-dowload__link"
                          href="https://itunes.apple.com/us/app/"
                          title="App Store"
                        >
                          <img
                            className="footer-dowload__app-store"
                            src="/assets/img/logos_apple-app-store.png"
                            alt="App Store"
                          />
                        </a>
                      </div>
                    </section>
                  </div>
                </>
              ) : (
                <div className="col-12 col-sm-3 block--type-text-block">
                  <div className="footer--about--address">
                    <p>Srijan Technologies</p>
                    <p>7E Vandana Building</p>
                    <p>Tolstoy Rd, Atul Grove Road,</p>
                    <p>Janpath, Connaught Place,</p>
                    <p>New Delhi, Delhi 110001</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <nav aria-labelledby="block-privacypolicy-menu">
          <div className="container">
            <div className="row edge-footer">
              <div className="menu--privacy-policy">
                {privacyPolicyItems && (
                  <ul className="menu">
                    {privacyPolicyItems.map((element) => (
                      <li key={`pp${element.drupal_internal__id}`}>
                        <a href={element.link.url}>{element.title}</a>
                      </li>
                    ))}
                    <li className="last">
                      <span>&copy; {new Date().getFullYear()} Copyright</span>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </nav>
      </footer>
    </>
  );
};