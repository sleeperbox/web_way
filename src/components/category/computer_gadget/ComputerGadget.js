import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
<<<<<<< HEAD
import PostingIcon from "@material-ui/icons/listalt";
=======
import ShareIcon from "@material-ui/icons/Share";
>>>>>>> dev/1.5
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";


const styles = theme => ({
  card: {
    maxWidth: "100%"
  },
  media: {
    paddingTop: "100%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    opacity: "100%"
  }
});

class ComputerGadget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      email: localStorage.getItem("email").slice(1, -1),
      posting: [],
      tgl: new Date().toDateString(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      date: new Date().getDay(),
      datemonth: new Date().toDateString().slice(4, -5),
      jam: new Date().getHours(),
      menit: new Date().getMinutes(),
      menitPosting: [],
      commentByPostId: [],
      waktu: [],
      thanks: 0,
      kode: 0,
    };
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }
  componentDidMount() {
    axios({
      method: "post",
      url: "http://192.168.100.18:8080/api/posting/home/computer-gadget",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(result => this.setState({ posting: result.data }));
  }

  shouldComponentUpdate(newProps, newState) {
    if (newState) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.thanks == 1) {
      axios({
        method: "post",
        url: "http://192.168.100.18:8080/api/posting/home/computer-gadget",
        headers: {
          "Acces-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }).then(result => this.setState({ posting: result.data, thanks: 0 }));
    }
  }

  givethanks(value, value2) {
    axios({
      method: "put",
      url: "http://192.168.100.18:8080/api/posting/thanks/post/user",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email,
        _id: value,
        username: value2
      }
    }).then(result =>
      this.setState({ thanks: 1, kode: result.data.kode.kode })
    );
  }
<<<<<<< HEAD

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
    axios({
      method: "POST",
      url: "http://apps.aprizal.com/api/comments",
=======
  handleExpandClick (id_post) {
    this.setState(state => ({
      expanded: !state.expanded
    }));
    axios({
      method: "POST",
      url: "http://192.168.100.18:8080/api/comments",
>>>>>>> dev/1.5
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
<<<<<<< HEAD
        id_posts: panel
      }
    }).then(result =>
      this.setState({ commentByPostId: result.data, isLoadingComment: false })
    );
=======
        id_posts: id_post
      }
    }).then(result => this.setState({ commentByPostId: result.data }));
>>>>>>> dev/1.5
  };

  render() {
    const { classes } = this.props;
    const { posting, commentByPostId } = this.state;

    return (
      <div>
<<<<<<< HEAD
        {isLoading ? (
          this.skeletonPosting()
        ) : posting.length === 0 ? (
          <div>
            <Card className={classes.card}>
              <div>
                <center>
                <PostingIcon style={{fontSize: 150}}/>
                </center>
                <center>
                  <b style={{fontSize: 25}}>0 post</b>
                </center>
                <br />
                <br />
              </div>
            </Card>
            <br />
          </div>
        ) : (
          <div>
            {posting.map((data, index) => {
              return (
                <div key={data._id}>
                  <Card className={classes.card}>
                    <CardHeader
                      avatar={
                        <Avatar
                          className={classes.avatar}
                          src={"http://aprizal.com/public/avatar/" + data.foto}
                        />
                      }
                      title={data.username}
                      subheader={
                        data.date.slice(11) == this.state.year
                          ? data.date.slice(4, -5) == this.state.datemonth
                            ? data.jam == this.state.jam
                              ? data.menit == this.state.menit
                                ? "Now"
                                : this.state.menit - data.menit + " m ago"
                              : this.state.jam - data.jam + " h ago"
                            : data.date.slice(4, -5)
                          : data.date.slice(4)
=======
        {posting.map((data, index) => {
          return (
            <div key={data._id}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar
                      aria-label="Recipe"
                      className={classes.avatar}
                      src={
                        "http://192.168.100.18/src/web-api/public/avatar/" +
                        data.foto
>>>>>>> dev/1.5
                      }
                    />
                  }
                  title={"@" + data.username}
                  subheader={
                    data.date.slice(11) == this.state.year
                      ? data.date.slice(4, -5) == this.state.datemonth
                        ? data.jam == this.state.jam
                          ? data.menit == this.state.menit
                            ? "Now"
                            : this.state.menit - data.menit + " m ago"
                          : this.state.jam - data.jam + " h ago"
                        : data.date.slice(4, -5)
                      : data.date.slice(4)
                  }
                />

                <CardMedia
                  className={classes.media}
                  image={
                    "http://192.168.100.18/src/web-api/public/posting/foto/" +
                    data.fotocontent
                  }
                />

                <CardContent>
                  <Typography component="p">
                    <b>{data.content}</b>
                  </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="Share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>

                <ExpansionPanel
                  onClick={() => this.handleExpandClick(data.id_posts)}
                >
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>
                      Comments
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <CardContent>
                      {commentByPostId.map((a, index) => {
                            return (
                       
                                <Typography key={a._id}>
                                  {a.comment}   
                                </Typography>
                             
                            );
                      })}
                    </CardContent>
<<<<<<< HEAD
                    <CardActions
                      className={classes.actions}
                      disableActionSpacing
                    >
                      <IconButton aria-label="Thanks">
                        <div>
                          <center>
                            <FavoriteIcon
                              style={{ color: "red" }}
                              onClick={() =>
                                this.givethanks(data._id, data.username)
                              }
                            />{" "}
                            <b style={{ fontSize: "12px" }}>
                              {data.thanks} Thanks
                            </b>
                          </center>
                        </div>
                      </IconButton>
                    </CardActions>
                    <ExpansionPanel
                      expanded={expanded === data.id_posts}
                      onChange={this.handleChange(data.id_posts)}
                    >
                      <ExpansionPanelSummary
                        style={{ background: "#f7f7f7" }}
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <Typography className={classes.heading}>
                          <i style={{ color: "blue" }}>
                            {data.comment} Comments
                          </i>
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails style={{ background: "#f7f7f7" }}>
                        <CardContent style={{ marginTop: "-30PX" }}>
                          {isLoadingComment ? (
                            this.skeletonComment()
                          ) : commentByPostId.length === 0 ? (
                            <p>No Comment yet.</p>
                          ) : (
                            commentByPostId.map((a, index) => {
                              return (
                                <List
                                  style={{ marginTop: "-20PX" }}
                                  key={a._id}
                                >
                                  <ListItem>
                                    <Avatar
                                      className={classes.avatar}
                                      src={
                                        "http://aprizal.com/public/avatar/" +
                                        a.foto
                                      }
                                    />
                                    <ListItemText
                                      primary={a.username}
                                      secondary={
                                        <Typography
                                          component="p"
                                          style={{
                                            whiteSpace: "-moz-pre-wrap",
                                            whiteSpace:
                                              "-moz-pre-wrap !important",
                                            whiteSpace: "pre-wrap",
                                            whiteSpace: "-webkit-pre-wrap",
                                            wordBreak: "break-all",
                                            whiteSpace: "normal"
                                          }}
                                        >
                                          {a.comment}
                                        </Typography>
                                      }
                                    />
                                  </ListItem>
                                </List>
                              );
                            })
                          )}
                        </CardContent>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </Card>
                  <br />
                </div>
              );
            })}
          </div>
        )}
=======
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Card>
              <br />
            </div>
          );
        })}
>>>>>>> dev/1.5
      </div>
    );
  }
}

ComputerGadget.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ComputerGadget);
