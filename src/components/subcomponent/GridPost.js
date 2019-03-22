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
import axios from "axios";

export default class GridPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: "panel1",
      posts: [],
      users: []
    };
  }

  componentWillMount() {
    axios
      .post("http://localhost:8080/api/posting/trending")
      .then(result => this.setState({ posts: result.data }));
    axios
      .post("http://localhost:8080/api/user/trending")
      .then(result => this.setState({ users: result.data }));
  }

  handleChange(value) {
    this.setState({
      expanded: value
    });
  }

  render() {
    return (
      <div>
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
                      <img src={"../../../public/images/default.png"} />
                    ) : (
                      <img
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
