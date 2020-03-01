import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';
import { Lock, LockOpen } from '@material-ui/icons';

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

  const { lockState, db } = props;
  

  // const toggleLock = nextLockState => {
  //   if (nextLockState !== lockState) {
  //     console.log(nextLockState)
  //   // db.ref('boxLocked').set(nextLockState);
  //   }
    
  // }
  
  return (
    <Card className={classes.root}>
      <CardContent>
        <div id="PrimaryControls">
          <div className="flex-container-vertically-center">
            <p>Lock state:</p>

            {
              lockState &&
              <Lock
                className={"pointer-on-hover"}
                fontSize={"large"}
                onClick={() => {
                  // console.log(false)
                  db.ref('boxLocked').set(false);
                }}
              />
            }
            {
              !lockState &&
              <LockOpen
                className={"pointer-on-hover"}
                fontSize={"large"}  
                onClick={() => {
                  // console.log(true)
                  db.ref('boxLocked').set(true);
                }}
              />   
            }
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  
}

export default PrimaryControls;
