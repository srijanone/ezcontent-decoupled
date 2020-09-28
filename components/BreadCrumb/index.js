import React from "react";

export default ({data}) =>  (
  <>
    <div className="breadcrumb">
          <ol className="breadcrumb_list">
            {data && data.map((list, key) => (list) ? (
              <li className="breadcrumb_list-item" key={key}>
                {list.url ? <a href={list.url} className="breadcrumb_list-item-link">{list.name}</a> : <span className="breadcrumb_list-item-current">{list.name}</span>}
              </li>   
            ): null)}
          </ol>
    </div>
  </>
);
