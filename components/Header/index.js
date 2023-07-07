import React from "react";
import get from "lodash/get";

export default props => {
  let headerData = get(props, "data.main");
  let subMenu;


  if (headerData) {
    subMenu = headerData.filter(function (item) {
      return item.parent != null;
    });
  }

  function getParentId(item) {
    let parentId = item.parent ? item.parent : null;
    let id = parentId ? parentId.match(/:(.*)/g).pop().replace(":", "") : null;
    return id;
  }

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg ezcontent-header">
        <div className="container">
          <a className="navbar-brand logo" href="/">
            <img src="/logo.svg" />
          </a>
          <button
            className="navbar-toggler navbar-toggler-right navbar-light"
            type="button"
            data-toggle="collapse"
            data-target="#CollapsingNavbar"
            aria-controls="navbar-collapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="CollapsingNavbar" className="navbar-collapse collapse">
            {headerData &&
              <nav className="form-inline navbar-form">
                <ul className="navbar-nav nav">
                  {headerData.map(menuItem => {
                    return (
                      !menuItem.parent && <li className="nav-item" key={menuItem.drupal_internal__id}>
                        <a className="nav-link px-md-3" href={menuItem.link.url}>
                          {menuItem.title}
                        </a>
                        {subMenu && <ul className="submenu">
                          {subMenu.map(submenuItem => {
                            let id = getParentId(submenuItem);
                            return (id === menuItem.uuid && <li className="nav-item" key={menuItem.drupal_internal__id}>
                              <a className="nav-link px-md-3" href={submenuItem.link.url}>
                                {submenuItem.title}
                              </a>
                              {subMenu && <ul className="tertiaryMenu">
                                {subMenu.map(item => {
                                  let id = getParentId(item);
                                  return (id === submenuItem.uuid && <li className="nav-item" key={menuItem.drupal_internal__id}>
                                    <a className="nav-link px-md-3" href={item.link.url}>
                                      {item.title}
                                    </a>
                                  </li>
                                  )
                                })}
                              </ul>}
                            </li>)
                          })}
                        </ul>}
                      </li>
                    )
                  })}
                </ul>
              </nav>
            }
          </div>
        </div>
      </nav>
    </>
  );

};
