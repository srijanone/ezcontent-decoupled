// as the base path is always fixed for the assets "/sites/default/files"
function handleImageInProcessedText(textData,baseurl) {
  return textData.replace('/sites/default/files/', baseurl + '/sites/default/files/');
}
export default handleImageInProcessedText
