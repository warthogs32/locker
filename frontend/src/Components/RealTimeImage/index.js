import React from 'react';

import './index.css';



const RealTimeImage = props => {
  const { imageData } = props;

  const lastImage = imageData[
    Object.keys(imageData)[Object.keys(imageData).length - 1]] 

  console.log(lastImage)

  // If lastImage has been loaded
  if (!!lastImage) {
    return (
      <div id="RealTimeImage">
        RealTimeImage
        <img src={`data:image/png;base64,${lastImage.img_src}`}/>
  
      </div>
    );
  }

  return (
    <div>
      Loading 
    </div>
  )

  
  
}

export default RealTimeImage;
