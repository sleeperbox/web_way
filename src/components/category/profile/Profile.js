import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Icon from "@mdi/react";
import { mdiSettings } from "@mdi/js";
import FullnameIcon from '@material-ui/icons/PermIdentity';
import FriendIcon from '@material-ui/icons/Contacts';
import JoindateIcon from '@material-ui/icons/DirectionsWalk';
import ThankIcon from '@material-ui/icons/TouchApp';
import PostIcon from '@material-ui/icons/BorderColor';
import TopicIcon from '@material-ui/icons/ShowChart';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';


import MyPost from './MyPost'

import axios from 'axios'

const textStyling = {
    textAlign: "right"
}

export default class Profile extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            first_name: "",
            last_name: "",
            awards: 0,
            total_friends: 0,
            join_date: "",
            followed_topic: "other",
            foto: "",
            total_posts: 0,
            total_thanks: 0,
            email: localStorage.getItem('email').slice(1, -1),
            open: false,
            bottom: false,
        }
        
    }
    
    componentWillMount() {
        const { email } = this.state;
        if(email == ""){
            this.setState(state => {return{
                email: localStorage.getItem('phone').slice(1, -1)   
            };
            }, () => axios({
                method: "post",
                url: "http://192.168.100.18:8080/api/profile",
                headers: {
                  "Acces-Control-Allow-Origin": true,
                  "Content-Type": "application/json",
                  Accept: "application/json"
                },
                data: {
                    
                  email: this.state.email  // This is the body part
                  
              }
              }).then(result =>
                  this.setState({
                      username: result.data.username,
                      first_name: result.data.first_name,
                      last_name: result.data.last_name,
                      awards: result.data.awards,
                      total_friends: result.data.total_friends,
                      total_posts: result.data.total_posts,
                      total_thanks: result.data.total_thanks,
                      join_date: result.data.join_date,
                      followed_topic: result.data.tags,
                      foto: result.data.foto
                    }, () => console.log('state: =>>>>>>>>>>>>>>> ', this.state))
              ));
            
        }else{
            axios({
                method: "post",
                url: "http://192.168.100.18:8080/api/profile",
                headers: {
                  "Acces-Control-Allow-Origin": true,
                  "Content-Type": "application/json",
                  Accept: "application/json"
                },
                data: {
                    
                  email: this.state.email  // This is the body part
                  
              }
              }).then(result =>
                  this.setState({
                      username: result.data.username,
                      first_name: result.data.first_name,
                      last_name: result.data.last_name,
                      awards: result.data.awards,
                      total_friends: result.data.total_friends,
                      total_posts: result.data.total_posts,
                      total_thanks: result.data.total_thanks,
                      join_date: result.data.join_date,
                      followed_topic: result.data.tags,
                      foto: result.data.foto
                    }, () => console.log('state: =>>>>>>>>>>>>>>> ', this.state))
              );
        
        
        console.log("test", this.state)
        }

            
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    settingMenu() {
        return  <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        disableBackdropClick={true}
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Ini menu edit profile, lanjutkan!
           <br/>
           <Button onClick={() => this.logout()} color="primary">
            Logout
          </Button>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
      };

    detailUser(){
        const {username, first_name, last_name, foto, total_friends, total_posts, total_thanks, followed_topic, join_date, awards} = this.state
        return <Grid container>
        <Grid item xs={12} sm={6}>
            <List>
                <ListItem>
                    <Avatar style={{background: "#FF9B01"}}>
                        <FullnameIcon/>
                    </Avatar>
                    <ListItemText primary="Full Name" secondary={first_name + " " + last_name} />
                </ListItem>
                <ListItem>
                    <Avatar style={{background: "#80AEA6"}}>
                        <FriendIcon />
                    </Avatar>
                    <ListItemText primary="Friends" secondary={total_friends + " people"} />
                </ListItem>
                <ListItem>
                    <Avatar style={{background: "#EF7F85"}}>
                        <JoindateIcon />
                    </Avatar>
                     {/* <ListItemText primary="Join Date" secondary={join_date.slice(0, -4)} /> */}
                </ListItem>
            </List>
        </Grid>

        <Grid item xs={12} sm={6}>
            <List>
                <ListItem onClick={this.toggleDrawer('bottom', true)} className="stylist">
                    <ListItemText style={textStyling} primary="Posts" secondary={total_posts + " posted"}/>
                    <Avatar  style={{background: "#AF64B6"}}>
                        <PostIcon />
                    </Avatar>
                </ListItem>
                <ListItem>
                    <ListItemText style={textStyling}primary="Thanks" secondary={total_thanks + " thanked"} />
                    <Avatar  style={{background: "#2D9EB4"}}>
                        <ThankIcon />
                    </Avatar>
                </ListItem>
                <ListItem>
                    <ListItemText style={textStyling} primary="Topic Follow" secondary={followed_topic} />
                    <Avatar  style={{background: "#799F8D"}}>
                        <TopicIcon />
                    </Avatar>
                </ListItem>
            </List>
        </Grid>
    </Grid>
    }

    render(){
          const myPost = (
            <div>
              <MyPost/>
            </div>
          );
        return (
            <div>
                {this.state.open ? this.settingMenu() : null}
                {this.state.bottom ? (
                <SwipeableDrawer
                anchor="bottom"
                open={this.state.bottom}
                onClose={this.toggleDrawer('bottom', false)}
                onOpen={this.toggleDrawer('bottom', true)}
                >
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer('bottom', false)}
                    onKeyDown={this.toggleDrawer('bottom', false)}
                >
                {myPost}
            </div>

                </SwipeableDrawer>) : null}
                <Paper style={{padding: 10}}>
                    <Fab style={{position: "absolute", margin: 10, right: 125, zIndex: 99}} size="small" onClick={this.handleClickOpen}>
                        <Icon path={mdiSettings} size={0.8} color="#444" />
                    </Fab>
                    <center>
                        <Avatar alt={this.state.username} src={"http://192.168.100.18/src/web-api/public/avatar/" + this.state.foto} style={{width: "150px", height: "150px"}}/>
                        <h2>{this.state.username}</h2>
                    </center>
                    <div>
                        {this.detailUser()}
                    </div>
                </Paper>
            </div>
        )
    }
    
    logout() {
        localStorage.removeItem('email')
        localStorage.removeItem('auth')
        localStorage.removeItem('phone')
        window.location='#/login';
    }
}
