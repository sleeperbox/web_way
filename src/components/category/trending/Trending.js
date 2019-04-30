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
import Skeleton from 'react-loading-skeleton';


export default class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: "panel1",
      posts: [],
      users: [],
      isLoading: true
    };
  }

  componentWillMount() {
    axios
      .post("http://192.168.100.33:8080/api/posting/trending")
      .then(result => this.setState({ posts: result.data, isLoading: false }));
    axios
      .post("http://192.168.100.33:8080/api/user/trending")
      .then(result => this.setState({ users: result.data }));
  }

  render() {
    return (
      <div>
        <div>
        {this.trendingPost()}
        {this.trendingUser()}
        </div>
      </div>
    );
  }

  trendingPost() {
    const { posts, isLoading } = this.state;
    return (
      <div>
      <div style={{margin: -10}}>
      
          {isLoading ? (this.generateSkeleton()) : posts.length === 0 ? (
            <div>
              <p>No Trending Content For Today...</p>
            </div>
          ) : (
            <div>
              <GridList cellHeight={200} spacing={1} style={{marginTop: "15px"}}>
                {posts.map(data => (
                  <GridListTile key={data._id} cols={1} rows={1}>
                    {data.fotocontent == null ? (
                      <img 
                      src={"../../../public/images/default.png"} />
                    ) : (
                      <img
                        src={
                          "http://aprizal.com/public/posting/foto/" +
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
    const { users, isLoading } = this.state;

    return (
    <div style={{marginTop: 10}}>
        <div style={{padding: 15, margin: 2}}>
            <p style={{ fontSize: "1.2em"}}>Valuable User</p>
            <div style={{maxWidth: "100%"}}>
                {isLoading ? (this.skeletonValuabeUser()) : users.length === null ? (
                    <div>
                    <p>No valuable users yet...</p>
                    </div>
                ) : (
                  <div style={{maxWidth: "100%"}}>
                   <GridList cols={5} cellHeight={100} spacing={2}>
                    {users.map(user => (
                      
                      <Card style={{margin: 20}} key={user._id}>
                          <CardContent>
                              <center>
                                  <Avatar src={"http://aprizal.com/public/avatar/" + user.foto} height={20} width={20}/>
                                  <br />
                                  <small>{user.username}</small>
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
  generateSkeleton() {
    const { posts } = this.state
    return(
        <GridList cellHeight={200} spacing={2 } style={{marginTop: "15px"}}>
          <GridListTile cols={1} rows={1}>
            <Skeleton height={200} width={310}/>
          </GridListTile>
          <GridListTile cols={1} rows={1}>
            <Skeleton height={200} width={310}/>
          </GridListTile>
          <GridListTile cols={1} rows={1}>
            <Skeleton height={200} width={310}/>
          </GridListTile>
          <GridListTile cols={1} rows={1}>
            <Skeleton height={200} width={310}/>
          </GridListTile>
      </GridList>      
    );
  } 

  skeletonValuabeUser(){
    return (
      <GridList cols={5} cellHeight={100} spacing={2}>
                   
                      
                      <Card style={{margin: 20}}>
                          <CardContent>
                              <center>
                                  <Avatar height={20} width={20}/>
                                  <br />
                                  <small></small>
                              </center>
                          </CardContent>
                      </Card>
                      <Card style={{margin: 20}}>
                          <CardContent>
                              <center>
                                  <Avatar height={20} width={20}/>
                                  <br />
                                  <small></small>
                              </center>
                          </CardContent>
                      </Card>
                      <Card style={{margin: 20}}>
                          <CardContent>
                              <center>
                                  <Avatar height={20} width={20}/>
                                  <br />
                                  <small></small>
                              </center>
                          </CardContent>
                      </Card>
                      <Card style={{margin: 20}}>
                          <CardContent>
                              <center>
                                  <Avatar height={20} width={20}/>
                                  <br />
                                  <small></small>
                              </center>
                          </CardContent>
                      </Card>
                      <Card style={{margin: 20}}>
                          <CardContent>
                              <center>
                                  <Avatar height={20} width={20}/>
                                  <br />
                                  <small></small>
                              </center>
                          </CardContent>
                      </Card>
                      <Card style={{margin: 20}}>
                          <CardContent>
                              <center>
                                  <Avatar height={20} width={20}/>
                                  <br />
                                  <small></small>
                              </center>
                          </CardContent>
                      </Card>
                   
                    </GridList>
    )
  }
}
