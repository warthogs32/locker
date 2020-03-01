import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';

import "./index.css";

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

const Highlights = props => {
  const { imageData } = props; 
  const [ highlights, setHighlights] = React.useState([]);
  const [ isModalExpanded, setIsModalExpanded ] = React.useState(false);

  const classes = useStyles();

  // Find highlights (images with faces)
  useEffect(() => {
    let entriesWithFaces = [];

    Object.entries(imageData).forEach(image => {
      if (!!image[1].facial_detection_data) {
        entriesWithFaces.push(image[1])
      }
    });

    setHighlights(entriesWithFaces.reverse())  

  }, [imageData])


  if (!!highlights && highlights.length > 0) {
    return (
      <Card className={classes.root}>
        <CardContent>
          <div id="Highlights">
            <h2 className="center-text"
              style={{
                fontWeight: "normal"
              }}
            >
              Highlights you may have missed
            </h2>
            
            <img src={`data:image/png;base64,${highlights[0].img_src}`}/>
  
  
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      Loading
    </div>
  )
  
}

export default Highlights;