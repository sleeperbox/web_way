import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from "@mdi/react";
import { mdiSettings } from "@mdi/js";
import FullnameIcon from '@material-ui/icons/PermIdentity';
import FriendIcon from '@material-ui/icons/Contacts';
import JoindateIcon from '@material-ui/icons/DirectionsWalk';
import ThankIcon from '@material-ui/icons/TouchApp';
import Thumbup from '@material-ui/icons/ThumbUp';
import Time from '@material-ui/icons/AccessTime';
import Category from '@material-ui/icons/Loyalty'
import PostIcon from '@material-ui/icons/BorderColor';
import TopicIcon from '@material-ui/icons/ShowChart';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';

import axios from 'axios'
import { Divider } from "@material-ui/core";

export default class MyPost extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            email: localStorage.getItem('email').slice(1, -1),
            open: false,
            posting: [],
            isloading: true
        }
    }

    componentDidMount() {
        axios({
          method: "post",
          url: "http://192.168.100.18:8080/api/posting/profile",
          headers: {
            "Acces-Control-Allow-Origin": true,
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          data: {
            email: this.state.email // This is the body part
          }
        }).then(result =>
          this.setState({
            posting: result.data,
            jamm: result.data,
            isLoading: false
          })
        );
    }

    render() {
        const {posting} = this.state
        console.log(posting)
        return (
            <div>
                    <Grid container spacing={16} style={{marginTop: 8, height: "325px"}}>
                        <Grid item xs={12} xl={12} sm={12} md={12}>
                            <Grid container  justify="center"  spacing={0}>
                                {posting.map(data => (
                                    <Grid item key={data._id} style={{padding: 10}}>
                                            <Card >
                                                <CardActionArea>
                                                    <center style={{marginTop: 25}}>
                                                    {data.fotocontent == null ? (
                                                    <CardMedia>
                                                        <img height="150" width="150" src={"../../../public/images/default.png"}/>
                                                    </CardMedia>
                                                    ) : (
                                                    <CardMedia>
                                                        <img height="150" width="150" src={"http://192.168.100.18/src/web-api/public/posting/foto/" + data.fotocontent}/>
                                                    </CardMedia>
                                                    )}
                                                    </center>
                                                    <CardContent>
                                                        <Typography component="p">
                                                        {data.content}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <Divider/>
                                                <div style={{padding: 5, margin: 2, fontSize: 9}}>
                                                    <div style={{float: "left" }}>
                                                     <p>{data.thanks} <small style={{fontSize: 8}}>thanks</small></p>
                                                    </div>
                                                    <div style={{float: "right" }}>
                                                    <p><small style={{fontSize: 8}}> posted on </small>{data.jam}-{data.menit}</p>
                                                    </div>
                                                    <br/>
                                                    <br/>
                                                    <p>{data.tags}</p>
                                                </div>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                        </Grid>
                    </Grid>
            </div>
        )
    }

}