import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from "axios";

const styles = theme => ({
  card: {
    maxWidth: '100%',
  },
  media: {
    paddingTop: '100%', // 16:9    
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    opacity: '100%'
  },
});

class ComputerGadget extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: null,
      expanded: false,
      email: localStorage.getItem('email').slice(1,-1),
      posting: [],
      tgl: new Date().toDateString(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      date: new Date().getDay(),
      datemonth: new Date().toDateString().slice(4,-5),
      jam: new Date().getHours(),
      menit: new Date().getMinutes(),
      menitPosting: [],
      waktu: [],
      thanks: 0,
      kode: 0,
    }
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }
  componentDidMount() {
    axios({
      method: 'post',
      url: 'http://192.168.100.18:8080/api/posting/home/computer-gadget',
      headers: {
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(result =>
      this.setState({ posting: result.data })
    );
  }

  shouldComponentUpdate(newProps, newState){
    if(newState){
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
  
  givethanks(value, value2){
    axios({
      method: 'put',
      url: 'http://192.168.100.18:8080/api/posting/thanks/post/user',
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
    }).then( result => 
      this.setState({ thanks: 1, kode: result.data.kode.kode })
    );
  }
  handleExpandClick = (id) => {
      
    this.setState(state => ({ expanded: !state.expanded, id: id }));
  };

  render() {
    const { classes } = this.props;
    const { posting, id } = this.state;

    return (
      <div>
      {posting.map((data, index) => {
        return (
          <div key={data._id}>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label="Recipe" className={classes.avatar} src={
                  "http://192.168.100.18/src/web-api/public/avatar/" +
                  data.foto
                }/>
              }
              title= { "@" + data.username }
              subheader= {data.date.slice(11) == this.state.year
                ? data.date.slice(4, -5) ==
                  this.state.datemonth
                  ? data.jam == this.state.jam
                    ? data.menit == this.state.menit
                      ? "Now"
                      : this.state.menit -
                        data.menit +
                        " m ago"
                    : this.state.jam - data.jam + " h ago"
                  : data.date.slice(4, -5)
                : data.date.slice(4)}
            />
            
            <CardMedia
              className={classes.media}
              image={"http://192.168.100.18/src/web-api/public/posting/foto/" +
              data.fotocontent}
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
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded,
                })}
                onClick={() => this.handleExpandClick(data._id)}
                aria-expanded={data._id}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            {id === data._id ? (
                 <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                 <CardContent>
                   <Typography paragraph>Method:</Typography>
                   <Typography paragraph>
                     Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                     minutes.
                   </Typography>
                   <Typography paragraph>
                     Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                     heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                     browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                     chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                     salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                     minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                   </Typography>
                   <Typography paragraph>
                     Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                     without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
                     to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
                     cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
                     minutes more. (Discard any mussels that don’t open.)
                   </Typography>
                   <Typography>
                     Set aside off of the heat to let rest for 10 minutes, and then serve.
                   </Typography>
                 </CardContent>
               </Collapse>
            ) : null}
         
          </Card>
          <br />
          </div>
        )
      })}
      </div>
    );
  }
}

ComputerGadget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComputerGadget);
