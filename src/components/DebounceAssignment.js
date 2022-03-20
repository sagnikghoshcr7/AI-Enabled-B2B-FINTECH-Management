import React from 'react'
import { makeStyles, InputBase, Grid } from '@material-ui/core';
import  Paper from '@material-ui/core/Paper';
import  IconButton  from '@material-ui/core/IconButton';
import  SearchIcon from '@material-ui/icons/Search';
import { useEffect, useState } from 'react';
import Books from '../utils/DebounceData'

const useStyles = makeStyles((theme) => ({
    searchpaper: {
        backgroundColor: theme.palette.primary.dark,
        height: '30px',
        margin:'auto',
        marginBottom:'5vh',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 200,
        border: `1px solid ${theme.palette.secondary.main}`,
        color: 'white'
    },
    input: {
        color: 'white',
        fontSize: '0.6rem',
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    grid:{
        backgroundColor:theme.palette.primary.main
    }
}))


const DebounceAssignment = () => {
    
    const classes = useStyles();
    const [search,setSearch]=useState(null);

    const debounce = (func) =>{
        let timer;
        return function(...args){
          const context = this;
          if(timer) clearTimeout(timer)
          timer = setTimeout(() => {
            timer = null
            func.apply(context, args);
          }, 3000);
        }
      }
      const handleSearch = (e) => {
        
          console.log(e.target.value);
          setSearch(e.target.value);
      };
    
      const optimisedSearch = React.useCallback(debounce(handleSearch),[]);

    const cardStyle = 
    {   border:'1px solid black',
        backgroundColor:'cyan',
        marginBottom:'3vh',
        padding:'0.5vw'}

      const setItems = Books.filter((data)=>{
            if(search == null)
                return data
            else if(data.author.toLowerCase().includes(search.toLowerCase()))
            {
                return data
            }
          })
    
    const items = Books.filter((data)=>{
        if(search == null)
            return data
        else if(data.author.toLowerCase().includes(search.toLowerCase()))
        {
            return data
        }
      }).map(data=>{
        return(
        <div>
            <div style={cardStyle}>
                <span ><b>Isbn: </b>{data.isbn}</span><br/>
                <span ><b>Title: </b>{data.title}</span><br/>
                <span ><b>Subtitle: </b>{data.subtitle}</span><br/>
                <span ><b>Author: </b>{data.author}</span>
            </div>
        </div>
        )
      })

    return (
    <div>
        <Grid container direction="column" >
                <Paper component="form" className={classes.searchpaper} >
                    <InputBase
                        className={classes.input}
                        placeholder="Search by Author Name"
                        inputProps={{ 'aria-label': 'Search by Author Name', size: 'small' }}
                        onChange={optimisedSearch}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon color="primary" fontSize="small" />
                    </IconButton>
                </Paper>
        </Grid>

        <Paper style={{maxHeight: 400,maxWidth:500,margin:'auto',padding:'5vh 5vw', overflow: 'auto'}}
        className={classes.grid}
        >
            {items}
        </Paper>            
    </div>
    )
}

export default DebounceAssignment
