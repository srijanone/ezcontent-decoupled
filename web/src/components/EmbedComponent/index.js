import React, { useEffect ,useState} from "react";
import get from 'lodash/get';
import BlockTitle from "../BlockTitle";
// import './index.css';

export default props => {
  const [htmlSrc,setHtmlSrc]=useState(null)
  const { 
    field_script: script
  } = props;
  const blockCheck = get(props, 'blockcomponent__val');
  let finalScript = get(script, 'value');
  const extractscript = /<script>.*?<\/script>/gi.exec(finalScript);
  if (extractscript) {
    finalScript = finalScript.replace(extractscript[0], "");
  }
  let blockCheckClass;
  if (blockCheck){
    blockCheckClass = "block--type-embed-block"
  }
  useEffect(() => {
    if (extractscript) {
      window.eval(extractscript[1]);
    }
    if (!finalScript.includes("blockquote")){
      {
        const html = `<head><style>iframe{ height:100%; width:100%; }</style></head><body>${finalScript}</body>`
        setHtmlSrc("data:text/html;charset=utf-8," + encodeURI(html))
      }
    }
    // if (finalScript.includes('hbspt.forms.create')) {
    //   const execScript = finalScript
    //     .split('<script>')[1]
    //     .replace('</script>', '');
    //   const hbsptForm = new Function(execScript);
    //   return hbsptForm();
    // }
  }, []);

  return (
    <>
      <BlockTitle blockTitle={props.data} landingPageCheck={props.landingPageCheck}/>
      <div className="w-100 mb-3 mt-3">
        {
          htmlSrc && !finalScript.includes('hbspt')?
          <iframe src={htmlSrc} height="400px" width="100%" frameBorder = "0"/>:
          <div
          className={`text-center mt-3 mb-3 w-auto d-block mx-auto final-block ${blockCheckClass}`}
          dangerouslySetInnerHTML={{
            __html: finalScript
          }}
        />
        }
      </div>
    </>
  );
};
