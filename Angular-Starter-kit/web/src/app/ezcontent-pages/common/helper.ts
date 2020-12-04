function handleImageInProcessedText(textData,baseurl) {
  if(textData){
    return textData.replace('/sites/default/files/', baseurl + '/sites/default/files/');
  }else{
    return textData;
  }
}
export default handleImageInProcessedText