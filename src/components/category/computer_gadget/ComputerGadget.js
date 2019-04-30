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
import ShareIcon from "@material-ui/icons/Share";
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
      url: "http://192.168.100.33:8080/api/posting/home/computer-gadget",
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
        url: "http://192.168.100.33:8080/api/posting/home/computer-gadget",
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
      url: "http://192.168.100.33:8080/api/posting/thanks/post/user",
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
  handleExpandClick (id_post) {
    this.setState(state => ({
      expanded: !state.expanded
    }));
    axios({
      method: "POST",
      url: "http://192.168.100.33:8080/api/comments",
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        id_posts: id_post
      }
    }).then(result => this.setState({ commentByPostId: result.data }));
  };

  render() {
    const { classes } = this.props;
    const { posting, commentByPostId } = this.state;

    return (
      <div>
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
                        "http://192.168.100.33/src/web-api/public/avatar/" +
                        data.foto
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
                    "http://192.168.100.33/src/web-api/public/posting/foto/" +
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
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Card>
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}

ComputerGadget.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ComputerGadget);
