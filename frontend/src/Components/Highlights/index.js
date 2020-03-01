import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Modal } from '@material-ui/core';

import "./index.css";

const useStyles = makeStyles(theme => ({
  root: {
    width: "50%",
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
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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

  }, [imageData]);


  function renderAllEntriesWithFaces() {
    return highlights.map(entry => {
      console.log(entry)

      return (
        <div style={{marginBottom: "3em"}}>
          <img src={`data:image/png;base64,${entry.img_src}`}/>
          <p clasName="center-text">{entry.time}</p>
        </div>
      )
    })
  }


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
              
            {renderAllEntriesWithFaces()}
  
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