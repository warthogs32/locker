import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';

import Helper from '../../Helper';

import './index.css';

const useStyles = makeStyles({
  root: {
    // width: "45%",
    margin: "1em"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


const RealTimeImage = props => {
  const { imageData } = props;

  const helper = new Helper();
  const lastImage = helper.getLastItemOfObject(imageData);

  const classes = useStyles();

  // console.log(lastImage)

  // If lastImage has been loaded
  if (!!lastImage) {
    return (
      <Card className={classes.root}>
        <CardContent>
          <div id="RealTimeImage">
            <h1 className="center-text"
              style={{fontWeight: "normal"}}
            >
              Real-time Image Tracking
            </h1>
            <img id="real-time-image-img"
              src={`data:image/png;base64,${lastImage.img_src}`}/>

          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      Loading 
    </div>
  )

  
  
}

export default RealTimeImage;
