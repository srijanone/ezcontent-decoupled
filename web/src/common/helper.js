// as the base path is always fixed for the assets "/sites/default/files"
function handleImageInProcessedText(textData,baseurl) {
  if(textData){
    return textData.replace('/sites/default/files/', baseurl + '/sites/default/files/');
  }else{
    return textData;
  }
}
export default handleImageInProcessedText
