import React, { Component } from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from "axios";

export default class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: "panel1",
      posts: [],
      users: [],
    };
  }

  handleChange(value) {
    this.setState({
      expanded: value
    });
  }

  componentWillMount() {
    axios
      .post("https://api.aprizal.com/api/posting/trending")
      .then(result => this.setState({ posts: result.data }));
    axios
      .post("https://api.aprizal.com/api/user/trending")
      .then(result => this.setState({ users: result.data }));
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <div>
        {open ? this.imageClicked() : null}
        {this.trendingPost()}
        {this.trendingUser()}
        </div>
      </div>
    );
  }

  trendingPost() {
    const { posts } = this.state;
    return (
      <div>
      <div style={{margin: -10}}>
     
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
                      src={"../../../public/images/default.png"} />
                    ) : (
                      <img
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
            <p style={{ fontSize: "1.2em"}}>Valuable User</p>
            <div style={{maxWidth: "100%"}}>
                {users.length === null ? (
                    <div>
                    <p>No valuable users yet...</p>
                    </div>
                ) : (
                  <div style={{maxWidth: "100%"}}>
                   <GridList cols={5} cellHeight={100} spacing={2}>
                    {users.map((user, index) => (
                      
                    <Card style={{margin: 20}} key={index}>
                        <CardContent>
                            <center>
                                <Avatar src={"https://aprizal.com/public/avatar/" + user.foto} height={20} width={20}/>
                                <br />
                                <small>{"@" + user.username}</small>
                            </center>
                        </CardContent>
                    </Card>
                    ))}
                    </GridList>
                    </div>
                )}    
            </div>
        </div>
    </div>
    );
  }
}
