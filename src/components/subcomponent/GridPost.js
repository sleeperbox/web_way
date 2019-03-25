import React, { Component } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
import Slide from '@material-ui/core/Slide';

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
        {open ? this.imageClicked() : null}
        {this.trendingPost()}
        {this.trendingUser()}
      </div>
    );
  }

  trendingPost() {
    const { expanded, posts } = this.state;
    return (
      <ExpansionPanel
        expanded={expanded === "panel1"}
        onChange={() => this.handleChange("panel1")}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div>Trending Contents</div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
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
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }

  trendingUser() {
    const { expanded, users } = this.state;
    return (
      <ExpansionPanel
        expanded={expanded === "panel2"}
        onChange={() => this.handleChange("panel2")}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div>Most Valuable Users</div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {users.length === 0 ? (
            <div>
              <p>No valuable users yet...</p>
            </div>
          ) : (
            <Table>
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
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}
