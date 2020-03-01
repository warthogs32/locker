import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';

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


const PrimaryControls = props => {


  const classes = useStyles();

  // console.log(lastImage)

  // If lastImage has been loaded
  
  return (
    <Card className={classes.root}>
      <CardContent>
        <div id="PrimaryControls">
          PrimaryControls
        </div>
      </CardContent>
    </Card>
  );
  
  
}

export default PrimaryControls;
