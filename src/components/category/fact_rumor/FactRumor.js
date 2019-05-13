import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PostingIcon from "@material-ui/icons/listalt";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import Skeleton from "react-loading-skeleton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from '@material-ui/core/CircularProgress';

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
  avatar: {
    opacity: "100%"
  }
});

class FactRumor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      isLoading: true,
      isLoadingComment: true,
      expanded: null,
      open: false,
      vertical: "bottom",
      horizontal: "right",
      process: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    axios({
      method: "post",
      url: "http://apps.aprizal.com/api/posting/home/fact-rumour",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(result =>
      this.setState({ posting: result.data, isLoading: false })
    );
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
        url: "http://apps.aprizal.com/api/posting/home/fact-rumour",
        headers: {
          "Acces-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }).then(result =>
        this.setState({ posting: result.data, thanks: 0, process: 1 })
      );
    }
  }

  givethanks(value, value2) {
    this.setState({
      open: true
    });
    axios({
      method: "put",
      url: "http://apps.aprizal.com/api/posting/thanks/post/user",
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
      this.setState({ thanks: 1, kode: result.data.kode.kode, process: 1 })
    );
  }

  handleClose = () => {
    this.setState({ open: false, process: 0 });
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
    axios({
      method: "POST",
      url: "http://apps.aprizal.com/api/comments",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        id_posts: panel
      }
    }).then(result =>
      this.setState({ commentByPostId: result.data, isLoadingComment: false })
    );
  };

  render() {
    const { classes } = this.props;
    const {
      posting,
      commentByPostId,
      isLoading,
      isLoadingComment,
      expanded,
      vertical,
      horizontal,
      process
    } = this.state;

    return (
      <div>
        {isLoading ? (
          this.skeletonPosting()
        ) : posting.length === 0 ? (
          <div>
            <Card className={classes.card}>
              <div>
                <center>
                  <PostingIcon style={{ fontSize: 150 }} />
                </center>
                <center>
                  <b style={{ fontSize: 25 }}>0 post</b>
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
                      }
                    />
                    {data.fotocontent === null ? (
                      <div>
                        <CardMedia
                          className={classes.media}
                          image={"http://aprizal.com/public/icon/icon/f&r.png"}
                        />
                      </div>
                    ) : (
                      <div>
                        <CardMedia
                          className={classes.media}
                          image={
                            "http://aprizal.com/public/posting/foto/" +
                            data.fotocontent
                          }
                        />
                      </div>
                    )}
                    <CardContent>
                      <Typography
                        component="p"
                        style={{
                          whiteSpace: "-moz-pre-wrap",
                          whiteSpace: "-moz-pre-wrap !important",
                          whiteSpace: "pre-wrap",
                          whiteSpace: "-webkit-pre-wrap",
                          wordBreak: "break-all",
                          whiteSpace: "normal"
                        }}
                      >
                        <b>{data.content}</b>
                      </Typography>
                    </CardContent>
                    <CardActions
                      className={classes.actions}
                      disableActionSpacing
                    >
                      
                        <div>
                          <center>
                            <FavoriteIcon style={{ color: "red" }}  onClick={() => this.givethanks(data._id, data.username)}/>
                            <br />
                            <b style={{ fontSize: "12px" }}>
                              {data.thanks} Thanks
                            </b>
                          </center>
                        </div>
                   
                      <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={this.state.open}
                        onClose={this.handleClose}
                        autoHideDuration={6000}
                        ContentProps={{
                          "aria-describedby": "message-id"
                        }}
                        message={
                          <span id="message-id">
                            {process === 0 ? (
                              <div><CircularProgress size={15} color="secondary"/></div>                             
                            ) : (
                              <div>
                                {this.state.kode === 1
                                  ? "you have been thanks"
                                  : "you have been unthanks"}
                              </div>
                            )}
                          </span>
                        }
                      />
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
      </div>
    );
  }
  skeletonPosting() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <Skeleton
          height={600}
          avatar={<Avatar aria-label="Recipe" />}
          action={<IconButton />}
        />
      </Card>
    );
  }

  skeletonComment() {
    const { classes } = this.props;
    return (
      <List>
        <Skeleton height={90} avatar={<Avatar aria-label="Recipe" />} />
      </List>
    );
  }
}

FactRumor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FactRumor);
