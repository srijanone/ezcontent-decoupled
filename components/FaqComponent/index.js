import React from "react";
import get from "lodash/get";
import BlockTitle from "../BlockTitle";
import handleImageInProcessedText from "../../common/helper";
// import "./style.css";

export default class Faq extends React.Component {
  constructor() {
    super();
    this.state = {
      faqData: []
    };
  }
  componentDidMount() {
    const data = get(this.props, "data.items");
    let faqData = [];
    faqData = data.map(x => {
      const singleFaq = {
        question: x.field_question,
        answer: handleImageInProcessedText(x.field_answer.processed, this.props.baseUrl)
      };
      return singleFaq;
    });
    this.setState({ faqData });
  }

  render() {
    return (
      <>
      <BlockTitle blockTitle={this.props.data} landingPageCheck={this.props.landingPageCheck}/>
      <div className="accordion mb-3 mt-3 paragraph--type--faq" id="accordionExample">
        {this.state.faqData.map((element, index) => {
          return (
            <div className="card" key={index}>
              <div 
                className="card-header CollapseCursor" 
                id={index} 
                data-toggle="collapse"
                data-target={`#collapse${index}`}
                aria-expanded="true"
                aria-controls={`collapse${index}`}
              >
                <h2 className="mb-0">
                  <button
                    className="btn"
                    type="button"
                  >
                    {element.question}
                  </button>
                </h2>
              </div>
              <div
                id={`collapse${index}`}
                className="collapse"
                aria-labelledby={`heading${index}`}
                data-parent="#accordionExample"
              >
                <div
                  className="card-body"
                  dangerouslySetInnerHTML={{ __html: element.answer }}
                />
              </div>
            </div>
          );
        })}
      </div>
      </>
    );
  }
}
