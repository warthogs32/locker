import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Modal } from '@material-ui/core';

import "./index.css";

const useStyles = makeStyles(theme => ({
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
  const [modalStyle] = React.useState(getModalStyle);

  const classes = useStyles();

  // let a = [];

  // Find highlights (images with faces)
  // useEffect(() => {
  //   let entriesWithFaces = [];

  //   Object.entries(imageData).forEach(image => {
  //     if (!!image[1].facial_detection_data) {
  //       entriesWithFaces.push(image[1])
  //     }
  //   });

  //   console.log(entriesWithFaces)

  //   // a = entriesWithFaces.reverse();

  //   // console.log(a)

  //   if (entriesWithFaces.length > highlights.length) {
  //     // setHighlights(entriesWithFaces.reverse());
  //     // console.log(reverse);
  //   }

  // }, [imageData])

  // console.log(a)

  let entriesWithFaces = [];

  // Object.entries(imageData).forEach(image => {
  //   if (!!image[1].facial_detection_data) {
  //     entriesWithFaces.push(image[1])
  //   }
  // });




  if (!!entriesWithFaces && entriesWithFaces.length > 0) {
    console.log(entriesWithFaces);

    return (
      <div>
        <Card className={classes.root}>
          <CardContent>
            <div id="Highlights" className="pointer-on-hover"
              onClick={setIsModalExpanded(true)}
            >
              <h2 className="center-text"
                style={{
                  fontWeight: "normal"
                }}
              >
                Highlights you may have missed
              </h2>
              
              <img src={`data:image/png;base64,${entriesWithFaces[0].img_src}`}/>
    
    
            </div>
          </CardContent>
        </Card>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={setIsModalExpanded(true)}
          onClose={setIsModalExpanded(false)}
        >
          <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Text in a modal</h2>
            <p id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
            
          </div>
        </Modal>
      </div>
    )
  }

  return (
    <div>
      Loading
    </div>
  )
  
}

export default Highlights;