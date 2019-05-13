import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import ComputerGadget from "./../computer_gadget/ComputerGadget";
import FactRumor from "./../fact_rumor/FactRumor";
import FamilyLove from "./../family_love/FamilyLove";
import Business from "./../business/Business";
import Fashion from "./../fashion/Fashion";
import Riddles from "./../riddles/Riddles";
import Quotes from "./../quotes/Quotes";
import Other from "./../other/Other";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Skeleton from "react-loading-skeleton";
import Card from "@material-ui/core/Card";

const styles = theme => ({
  subHeader: {
    backgroundColor: 'white'
  },
  paper: {
    marginTop: -7
  }
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      tags: [],
      isLoading: true
    };
  }
  componentDidMount() {
    const email = localStorage.getItem("email").slice(1, -1);
    this.setState(
      {
        email: email
      },
      () =>
        axios({
          method: "post",
          url: "http://apps.aprizal.com/api/profile",
          headers: {
            "Acces-Control-Allow-Origin": true,
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          data: {
            email: this.state.email // This is the body part
          }
        }).then(result =>
          this.setState({ tags: result.data.tags, isLoading: false })
        )
    );
  }

  skeletonPosting() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <Skeleton height={50} avatar={<Avatar aria-label="Recipe" />} />
      </Card>
    );
  }
  render() {
    const { classes } = this.props;
    const { tags, isLoading } = this.state;
    var element = tags.join();
    const newArray = element.split(",");
    var judul = newArray.values();
    return (
      <React.Fragment>
        <List>
          {isLoading
            ? this.skeletonPosting()
            : newArray.map((data, index) => (
                <Fragment key={index}>
                  <Paper square className={classes.paper}>
                    <ListSubheader
                      className={classes.subHeader}
                      style={{ paddingTop: 10 }}
                    >
                      {data === "null" ? (
                        <Avatar
                          src="http://aprizal.com/public/icon/icon/follow.png"
                          width="7%"
                          style={{ float: "left" }}
                        />
                      ) : data === "computer-gadget" ? (
                        <Avatar
                          src="http://aprizal.com/public/icon/icon/komp.png"
                          width="7%"
                          style={{ float: "left" }}
                        />
                      ) : data === "family-love" ? (
                        <Avatar
                          src="http://aprizal.com/public/icon/icon/family.png"
                          width="7%"
                          style={{ float: "left" }}
                        />
                      ) : data === "fact-rumour" ? (
                        <Avatar
                          src="http://aprizal.com/public/icon/icon/f&r.png"
                          width="7%"
                          style={{ float: "left" }}
                        />
                      ) : data === "business-work" ? (
                        <Avatar
                          src="http://aprizal.com/public/icon/icon/bisnis.png"
                          width="7%"
                          style={{ float: "left" }}
                        />
                      ) : data === "fashion-lifestyle" ? (
                        <Avatar
                          src="http://aprizal.com/public/icon/icon/fashion.png"
                          width="7%"
                          style={{ float: "left" }}
                        />
                      ) : data === "quotes" ? (
                        <Avatar
                          src="http://aprizal.com/public/icon/icon/quotes.png"
                          width="7%"
                          style={{ float: "left" }}
                        />
                      ) : data === "other" ? (
                        <Avatar
                          src="http://aprizal.com/public/icon/icon/other.png"
                          width="7%"
                          style={{ float: "left" }}
                        />
                      ) : data === "riddles" ? (
                        <Avatar
                          src="http://aprizal.com/public/icon/icon/riddle.png"
                          width="7%"
                          style={{ float: "left" }}
                        />
                      ) : null}
                      <b>{judul.next().value}</b>
                    </ListSubheader>
                  </Paper>
                  <Divider style={{ backgroundColor: "red" }} />
                  {data === "other" ? (
                    <Other />
                  ) : data === "quotes" ? (
                    <Quotes />
                  ) : data === "riddles" ? (
                    <Riddles />
                  ) : data === "computer-gadget" ? (
                    <ComputerGadget />
                  ) : data === "family-love" ? (
                    <FamilyLove />
                  ) : data === "business-work" ? (
                    <Business />
                  ) : data === "fact-rumour" ? (
                    <FactRumor />
                  ) : data === "fashion-lifestyle" ? (
                    <Fashion />
                  ) : null}
                </Fragment>
              ))}
        </List>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
