import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
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
            isloading: true,
            snackbar: false
        }
    }

    componentDidMount() {
        axios({
          method: "post",
          url: "http://192.168.100.33:8080/api/posting/profile",
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

    handleClick () {
        this.setState({ snackbar: true});
      };

    handleClose = () => {
        this.setState({ snackbar: false });
      };

    renderNoPost() {
        return <div>
            <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              open
              autoHideDuration={3000}
              onClose={this.handleClose}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              action={
                <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
              >
                <CloseIcon />
              </IconButton>
              }
              message={<span id="message-id">You have no post ...</span>}
            />
        </div>
    }

    render() {
        const {posting} = this.state
        return (
            <div>
                {posting.length === 0 ? (this.renderNoPost()) : (
                    <Grid container spacing={16} style={{marginTop: 8, height: "555px"}}>
                        <Grid item xs={12} xl={12} sm={12} md={12}>
                            <Grid container  justify="center"  spacing={24}>
                                {posting.map(data => (
                                    <Grid item key={data._id} style={{padding: 10}} style={{width: "300px"}}>
                                            <Card>
                                                <CardActionArea>
                                                    <center style={{marginTop: 25}}>
                                                    {data.fotocontent == null ? (
                                                    <CardMedia>
                                                        <img height="225" width="225" src={"../../../public/images/default.png"}/>
                                                    </CardMedia>
                                                    ) : (
                                                    <CardMedia>
                                                        <img height="225" width="225" src={"http://aprizal.com/public/posting/foto/" + data.fotocontent}/>
                                                    </CardMedia>
                                                    )}
                                                    </center>
                                                    <CardContent style={{height: "170px"}}>
                                                        <Typography component="p">
                                                        <span style={{fontWeight: "bold"}}>{data.username}</span> {data.content}
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
                    )}
            </div>
        )
    }

}