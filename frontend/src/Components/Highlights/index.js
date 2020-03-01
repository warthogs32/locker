import React from 'react';
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

  const classes = useStyles();

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



        </div>
      </CardContent>
    </Card>
  )
}

export default Highlights;