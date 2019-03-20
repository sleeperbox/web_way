import React, { Component } from "react";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import axios from 'axios'

export default class GridPost extends Component {

  constructor(props) {
      super(props);
      this.state = {
         posts: []
      };
  }

  componentWillMount() {
    axios.get('http://localhost:8080/api/posts').then(result => this.setState({posts: result.data}))
  }

  render () {
    const {posts} = this.state
    console.log(posts)
    return (
      <GridList cellHeight={200} spacing={1}>
        {posts.map(data => (
          <GridListTile key={data._id} cols={1} rows={1}>
            {data.fotocontent == null ? <img src={'../../../public/images/default.png'} />: <img src={'../../../public/images/' + data.fotocontent} />} 
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
    );
  }
}