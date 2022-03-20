import React, { useState } from 'react';
import theme, { pxToVh } from '../utils/theme';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Footer from '../components/Footer';
import { Typography } from '@material-ui/core';
import { InputBase, TextField, OutlinedInput, Button } from '@material-ui/core';
import Header from '../components/Header';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: '1vw',
    paddingRight: '1vw',
  },
  textStyle1: {
    color: '#FFFFFFA6',
    fontSize: '2.5vw',
    marginTop: '2vh',
  },
  textStyle2: {
    color: '#FFFFFFA6',
    fontSize: '1.5vw',
  },
  textfield: {
    color: '#FFFFFFA6',
    fontSize: '1.5vw',
  },
  nameInput: {
    fontSize: '1vw',
    color: '#FFFFFF',
  },
  notchedOutline: { borderWidth: '1px', borderColor: '#5DAAE0 !important' },
  searchBtnStarted: {
    marginTop: '8vh',
    minWidth: '5vw',
    minHeight: '2.188vw',
    fontSize: '0.95vw',
    border: 'solid 0.75px #3B617C',
    // marginRight: '0.5rem',
    alignSelf: 'center',
    color: '#5DAAE0',
    '&:hover': {
      backgroundColor: '#5daae0',
      color: 'white',
    },
  },
  searchBtnDisabled: {
    minWidth: '5vw',
    minHeight: '2.188vw',
    fontSize: '0.95vw',
    border: 'solid 0.75px #3B617C',
    // marginRight: '0.5rem',
    alignSelf: 'center',
    color: 'white !important',
    background: '#FFFFFFa5',
    '&:hover': {
      cursor: 'default',
      backgroundColor: '#FFFFFFa5',
    },
  },
  hellotext: {
    fontSize: '4vw',
    color: '#FFFFFFA6',
    height: '10vh',
  },
  hellotext1: {
    fontSize: '2.5vw',
    marginTop: '5vh',
    padding: '1vh',
    color: '#FFFFFF',
    backgroundColor: '#5DAAE0',
  },
  hellotext3: {
    fontSize: '1vw',
    marginTop: '5vh',
    padding: '0.5vh',
    color: '#FFFFFF',
    backgroundColor: '#5DAAE0',
  },
  hellotext2: {
    fontSize: '1.2vw',
    marginTop: '5vh',
    padding: '1vh',
    color: '#FFFFFF',
    backgroundColor: '#5DAAE0',
  },
  hellotext4: {
    fontSize: '1.5vw',
    marginTop: '2vh',
    padding: '1vh',
    color: '#FFFFFF',
  },
  searchBtn: {
    marginTop: '2vh',
    minWidth: '5vw',
    minHeight: '2.188vw',
    fontSize: '0.95vw',
    border: 'solid 0.75px #3B617C',
    // marginRight: '0.5rem',
    alignSelf: 'center',
    color: '#5DAAE0',
    '&:hover': {
      backgroundColor: '#5daae0',
      color: 'white',
    },
  },
}));

const CollectorDashboard = (props) => {
  const [name, setName] = useState('');
  const [started, setStarted] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleGetStarted = (e) => {
    if (started) setName('');
    setStarted((prev) => !prev);
  };

  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={2} xs={12}>
      <Grid
        container
        style={{ height: '95vh' }}
        justify="center"
        alignItems="center"
      >
        <Grid
          item
          style={{
            height: started ? '90vh' : '45vh',
            width: started ? '60vw' : '40vw',
            backgroundColor: started ? '' : '#252C48',
            display: 'flex',
          }}
          alignItems="center"
          direction="column"
        >
          <Typography className={classes.textStyle1}>
            {started ? `Hello ${name}` : 'Hey There !'}
          </Typography>
          <Typography className={classes.textStyle2}>
            {started
              ? ' WELCOME TO SUMMER INTERNSHIP 2021'
              : `What's your name?`}
          </Typography>
          {!started ? (
            <>
              <TextField
                id="outlined-basic"
                variant="outlined"
                autoid="ship-to-input"
                type="text"
                style={{ marginTop: '4vh' }}
                value={name}
                onChange={handleNameChange}
                InputProps={{
                  classes: {
                    input: classes.nameInput,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />

              <Button
                size="small"
                className={classes.searchBtnStarted}
                classes={{ disabled: classes.searchBtnDisabled }}
                disabled={name == ''}
                onClick={handleGetStarted}
              >
                GET STARTED
              </Button>
            </>
          ) : (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '30vh',
                  width: '51vw',
                  marginTop: '5vh',
                  border: 'solid 1px #5daae0',
                }}
              >
                <Button
                  size="medium"
                  className={classes.searchBtn}
                  onClick={handleGetStarted}
                >
                  CLICK HERE TO GET THE COMPLETE SOURCE CODE OF THE PROJECT
                </Button>
                <Button
                  size="medium"
                  className={classes.searchBtn}
                  onClick={handleGetStarted}
                >
                  CLICK HERE TO BRIBE YOUR MODERATOR DURING EVALUATION
                </Button>

                <Button
                  size="medium"
                  className={classes.searchBtn}
                  onClick={handleGetStarted}
                >
                  CLICK HERE TO GET ALL UPCOMING QUIZ ANSWERS BEFOREHAND
                </Button>
              </div>
              <Typography className={classes.hellotext3}>
                WITH LOTS OF LOVE,
              </Typography>
              <Typography className={classes.hellotext4}>
                Highradius Illuminati
              </Typography>
              <Typography className={classes.hellotext2}>
                THE ILLUMINATI WILL BE THERE WITH YOU ALWAYS...AND WILL HELP YOU
                WHENEVER YOU ARE STUCK. MAY THE FORCE BE WITH YOU
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
      <Header/>
      <Footer />
    </Grid>
  );
};

export default CollectorDashboard;
