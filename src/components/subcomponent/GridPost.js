import React, { Component } from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import axios from "axios";


export default class GridPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: "panel1",
      posts: [],
      users: [],
      open: false
    };
  }

  handleChange(value) {
    this.setState({
      expanded: value
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true }, () => console.log(this.state.open));
  };

  handleClose = () => {
    this.setState({ open: false }, () => console.log(this.state.open));
  };


  componentWillMount() {
    axios
      .post("http://localhost:8080/api/posting/trending")
      .then(result => this.setState({ posts: result.data }));
    axios
      .post("http://localhost:8080/api/user/trending")
      .then(result => this.setState({ users: result.data }));
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
      <DialogTitle id="alert-dialog-slide-title">
        {"For More Experience"}
      </DialogTitle>
        <br/>
      <DialogContent>
      <DialogContentText id="alert-dialog-slide-description" style={{textAlign:"center"}}>
        <img src="https://www.lez.brussels/sites/default/files/playstore.png" /> 
      </DialogContentText>
        </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                BACK
              </Button>
        </DialogActions>
      </Dialog>
      </div>
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <div>
        {open ? this.imageClicked() : null}
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
      <p style={{ fontSize: "1.5em", margin: 5}}>trending now</p>
          {posts.length === 0 ? (
            <div>
              <p>No Trending Content For Today...</p>
            </div>
          ) : (
            <div>
              <GridList cellHeight={200} spacing={1}>
                {posts.map(data => (
                  <GridListTile key={data._id} cols={1} rows={1}>
                    {data.fotocontent == null ? (
                      <img 
                      onClick={this.handleClickOpen}
                      src={"../../../public/images/default.png"} />
                    ) : (
                      <img
                      onClick={this.handleClickOpen}
                        src={
                          "http://localhost:3000/src/web-api/public/posting/foto/" +
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
    );
  }

  trendingUser() {
    const { users } = this.state;
    return (
      <div style={{marginTop: 10}}>
         <p style={{fontSize: "1.5em", margin: 5}}>valuable user</p>
          {users.length === 0 ? (
            <div>
              <p>No valuable users yet...</p>
            </div>
          ) : (
            <Table style={{marginTop: -15}}>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell align="right">Posted</TableCell>
                  <TableCell align="right">Thanks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(row => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row.username}
                    </TableCell>
                    <TableCell align="right">{row.total_posts}</TableCell>
                    <TableCell align="right">{row.total_thanks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
      </div>
    );
  }

  trendingCategory() {
    return (
    <div style={{marginTop: 10}}>
      <div style={{padding: 15, margin: 2}}>
      <p style={{ fontSize: "1.2em"}}>Most Visited Category</p>
      <div style={{maxWidth: "100%"}}>
        <Chip
            avatar={<Avatar alt="Natacha" src="../../../public/images/default.png" />}
            label="Other"
            href="/profile"
            clickable
            style={{margin: 8}}
          />
        <Chip
            avatar={<Avatar alt="Natacha" src="../../../public/images/default.png" />}
            label="Computer &amp; Gadget"
            href="/profile"
            clickable
            style={{margin: 8}}
          />
          <Chip
            avatar={<Avatar alt="Natacha" src="../../../public/images/default.png" />}
            label="Family &amp; Love"
            href="/profile"
            clickable
            style={{margin: 8}}
          />
          <Chip
            avatar={<Avatar alt="Natacha" src="../../../public/images/default.png" />}
            label="Riddles"
            href="/profile"
            clickable
            style={{margin: 8}}
          />
        </div>
      </div>
    </div>
    );
  }
}
