import React, { Component } from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import bisnis from '../../../public/icon/bisnis.png';
import camera from '../../../public/icon/camera.png';
import fandr from '../../../public/icon/f&r.png';
import family from '../../../public/icon/family.png';
import fashion from '../../../public/icon/fashion.png';
import follow from '../../../public/icon/follow.png';
import gift from '../../../public/icon/gift.png';
import komp from '../../../public/icon/komp.png';
import other from '../../../public/icon/other.png';
import quotes from '../../../public/icon/quotes.png';
import riddle from '../../../public/icon/riddle.png';

export default class GridPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: "panel1",
      posts: [],
      users: [],
      postsFromCategory: [],
      open: false,
      openModal: false
    };
  }

  handleChange(value) {
    this.setState({
      expanded: value
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, openModal: false });
  };


  componentWillMount() {
    axios
      .post("https://api.aprizal.com/api/posting/trending")
      .then(result => this.setState({ posts: result.data }));
    axios
      .post("https://api.aprizal.com/api/user/trending")
      .then(result => this.setState({ users: result.data }));
  }

  categoryClicked(value){
    axios({
      method: "post",
      url: "https://api.aprizal.com/api/posting/limit",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        tag: value // This is the body part
      }
    }).then(result =>
      this.setState({ postsFromCategory: result.data, openModal: true })
    );
  }

  pickedCategoryIsNotEmpty() {
  console.log(this.state)
   const {postsFromCategory} = this.state
   return postsFromCategory.map((data, index) => (
     <div key={index}>
     <Chip
       avatar={<Avatar alt="Natacha" src={"https://aprizal.com/public/avatar/" + data.foto} />}
       label={<b>@{data.username}</b>}
     /> <span style={{fontSize: 11, float: "right"}}><b>at {data.jam}:{data.menit}</b></span>
     <br/>
     <br/>
     <center>
     {data.fotocontent == null ? (
      <img 
        onClick={this.handleClickOpen}
        src={"../../../public/images/default.png"}  style={{height: "350px", width: "350px"}} />
      ) : (
     <img 
       onClick={this.handleClickOpen}
       src={"https://aprizal.com/public/posting/foto/" + data.fotocontent} style={{height: "350px", width: "350px"}}/>
      )}
     </center>
     <div style={{marginTop: 2, padding: 10, margin: 2}}>
      <span style={{fontSize: 10}}><b>{data.comment} comment &nbsp;&nbsp; {data.thanks} thanks </b></span>
       <p style={{fontSize: 12}}>{data.content}</p>
     </div>
     <br/>
     <br/>
     <hr/>
     <br/>
     </div>
     ))
  }
  pickedCategoryIsEmpty() {
    return <h1 style={{textAlign: "center"}}>PLEASE NOT NOW</h1>
  }

  seeMorePost(){
    return <DialogActions>
            <Button onClick={this.handleClickOpen} style={{background: "#CC3333", color: "white"}} variant="contained" fullWidth >
              SEE MORE POST
            </Button>
          </DialogActions>
  }

  postsFromCategory() {
    const {postsFromCategory} = this.state
      return <div>
        <Dialog
          open={this.state.openModal}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth
        >
            <DialogTitle style={{background: "#222"}}>
              <span style={{padding: 10, color: "white"}}>Picked Tag</span>
            </DialogTitle>
            <br/>
            <DialogContent>
            {postsFromCategory.length == 0 ? this.pickedCategoryIsEmpty()  : this.pickedCategoryIsNotEmpty()}
            </DialogContent>
            {postsFromCategory.length == 0 ? null  : this.seeMorePost() }
        </Dialog>
        </div>
  }

  imageClicked() {
    return <div>
      <Dialog
        open={this.state.open}
        keepMounted
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        style={{textAlign: "center"}}
      >
        <DialogTitle>
          {"For More Experience"}
        </DialogTitle>
          <br/>
        <DialogContent>
          <DialogContentText style={{textAlign:"center"}}>
            <img src="https://www.lez.brussels/sites/default/files/playstore.png" /> 
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText style={{textAlign:"center"}}>
           or sign in to see this content
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{marginTop: -30}}>
          <Button onClick={this.handleClose} style={{background: "#CC3333", color: "white"}} variant="contained">
            BACK
          </Button>
        </DialogActions>
      </Dialog>
      </div>
  }

  render() {
    const { open, openModal } = this.state;
    return (
      <div>
        <div>
        {open ? this.imageClicked() : null}
        {openModal ? this.postsFromCategory() : null}
        {this.trendingPost()}
        {this.trendingUser()}
        {this.trendingCategory()}
        </div>
      </div>
    );
  }

  trendingPost() {
    const { posts } = this.state;
    return (
      <div style={{marginTop: 15}}>
      <div style={{padding: 15, margin: 2}}>
      <p style={{ fontSize: "1.5em", margin: 5}}>trending now</p>
          {posts.length === 0 ? (
            <div>
              <p>No Trending Content For Today...</p>
            </div>
          ) : (
            <div>
              <GridList cellHeight={200} spacing={1} style={{marginTop: "15px"}}>
                {posts.map((data, index) => (
                  <GridListTile key={index} cols={1} rows={1}>
                    {data.fotocontent == null ? (
                      <img 
                      onClick={this.handleClickOpen}
                      src={"../../../public/images/default.png"} />
                    ) : (
                      <img
                      onClick={this.handleClickOpen}
                        src={
                          "https://aprizal.com/public/posting/foto/" +
                          data.fotocontent
                        }
                      />
                    )}
                    <GridListTileBar
                      title={data.content}
                      titlePosition="top"
                      actionIcon={
                        <IconButton>
                          <StarBorderIcon />
                        </IconButton>
                      }
                      actionPosition="left"
                    />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          )}
          </div>  
      </div>
    );
  }

  trendingUser() {
    const { users } = this.state;
    return (
      <div style={{marginTop: 10}}>
      <div style={{padding: 15, margin: 2}}>
         <p style={{fontSize: "1.5em", margin: 5}}>valuable user</p>
          {users.length === 0 ? (
            <div>
              <p>No valuable users yet...</p>
            </div>
          ) : (
            <div style={{maxWidth: "100%"}}>
            {users.map((user, index) => (
            <Chip
                onClick={this.handleClickOpen}
                key={index}
                avatar={<Avatar alt="Natacha" src={"https://aprizal.com/public/avatar/" + user.foto} />}
                label={"@" + user.username}
                href="/profile"
                clickable
                style={{margin: 8}}
              />
            ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  trendingCategory() {
    return (
    <div style={{marginTop: 10}}>
      <div style={{padding: 15, margin: 2}}>
      <p style={{ fontSize: "1.2em"}}>Category For You</p>
      <div style={{maxWidth: "100%"}}>
        <GridList cols={5} cellHeight={100} spacing={2}>
          <Card style={{margin: 5}}>
            <CardContent onClick={() => this.categoryClicked("business-work")}>
              <center>
                <img src={bisnis} height={50} width={50}/>
                <small>business</small>
              </center>
            </CardContent>
          </Card>
          <Card style={{margin: 5}}>
            <CardContent onClick={() => this.categoryClicked("fact-rumour")}>
              <center>
                <img src={fandr} height={50} width={50}/>
                <small>fact&amp;rumor</small>
              </center>
            </CardContent>
          </Card>
          <Card style={{margin: 5}}>
            <CardContent onClick={() => this.categoryClicked("fashion-lifestyle")}>
              <center>
                <img src={fashion} height={50} width={50}/>
                <small>fashion</small>
              </center>
            </CardContent>
          </Card>
          <Card style={{margin: 5}}>
            <CardContent onClick={() => this.categoryClicked("computer-gadget")}>
              <center>
                <img src={komp} height={50} width={50}/>
                <small>com&amp;gadget</small>
              </center>
            </CardContent>
          </Card>
          <Card style={{margin: 5}}>
            <CardContent onClick={() => this.categoryClicked("family-love")}>
              <center>
                <img src={family} height={50} width={50}/>
                <small>fams&amp;love</small>
              </center>
            </CardContent>
          </Card>
          <Card style={{margin: 5}}>
            <CardContent onClick={() => this.categoryClicked("riddles")}>
              <center>
                <img src={riddle} height={50} width={50}/>
                <small>riddle</small>
              </center>
            </CardContent>
          </Card>
          <Card style={{margin: 5}}>
            <CardContent onClick={() => this.categoryClicked("other")}>
              <center>
                <img src={other} height={50} width={50}/>
                <small> other</small>
              </center>
            </CardContent>
          </Card>
        </GridList>
        </div>
      </div>
    </div>
    );
  }
}
