<<<<<<< HEAD
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import Home from "./home/Home";
import TrendingIcon from "@material-ui/icons/TrendingUp";
import Trending from "./trending/Trending";
import Profile from "./profile/Profile";
import ComputerGadget from "./computer_gadget/ComputerGadget";
import FactRumor from "./fact_rumor/FactRumor";
import FamilyLove from "./family_love/FamilyLove";
import Business from "./business/Business";
import Fashion from "./fashion/Fashion";
import Riddles from "./riddles/Riddles";
import Quotes from "./quotes/Quotes";
import Other from "./other/Other";
=======
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import Home from './home/Home';
import TrendingIcon from '@material-ui/icons/TrendingUp';
import Trending from './trending/Trending';
import Profile from './profile/Profile';
import ComputerGadget from './computer_gadget/ComputerGadget';
>>>>>>> dev/1.5

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class Container extends React.Component {
  state = {
    value: 1
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="sticky" color="default">
<<<<<<< HEAD
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<TrendingIcon />} style={{ minWidth: 50 }} />
            <Tab label="Home" />
            <Tab label="Computer & Gadget" />
            <Tab label="Family & Love" />
            <Tab label="Fact & Rumor" />
            <Tab label="Business" />
            <Tab label="Fashion" />
=======
        <Tabs
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
            <Tab icon={<TrendingIcon/>} style={{minWidth: 50}}/>
            <Tab label="Home" />
            <Tab label="Komputer & gadget" />
            <Tab label="Keluarga & Asmara" />
            <Tab label="Fakta & Rumor" />
            <Tab label="Bisnis & Pekerjaan" />
            <Tab label="Fashion & Gaya Hidup" />
>>>>>>> dev/1.5
            <Tab label="Quotes" />
            <Tab label="Riddless" />
            <Tab label="Lainnya" />
          </Tabs>
        </AppBar>
        <br />
        <br />
        <Grid container justify="center">
<<<<<<< HEAD
          <Grid item xs sm={6} style={{ height: "100%" }}>
            {value === 0 && (
              <TabContainer>
                <Trending />
              </TabContainer>
            )}
            {value === 1 && (
              <TabContainer>
                <Home />
              </TabContainer>
            )}
            {value === 2 && (
              <TabContainer>
                <ComputerGadget />
              </TabContainer>
            )}
            {value === 3 && (
              <TabContainer>
                <FamilyLove />
              </TabContainer>
            )}
            {value === 4 && (
=======
          <Grid item xs sm={6} style={{height:'100%'}}>
              {value === 0 && <TabContainer><Trending/></TabContainer>}
              {value === 1 && <TabContainer><Home/></TabContainer>}
              {value === 2 && <TabContainer><ComputerGadget/></TabContainer>}
              {value === 3 && <TabContainer>Keluarga dan asmara</TabContainer>}
              {value === 4 && <TabContainer>Fakta & rumor</TabContainer>}
              {value === 5 && <TabContainer>Bisnis & Pekerjaan</TabContainer>}
              {value === 6 && <TabContainer>Fashion & gaya hidup</TabContainer>}
              {value === 7 && <TabContainer>Quotes</TabContainer>} 
              {value === 8 && <TabContainer>Riddless</TabContainer>}    
              {value === 9 && <TabContainer>Lainnya</TabContainer>}    
          </Grid>
          <Grid item xs sm={4} style={{height:'100%'}}>
>>>>>>> dev/1.5
              <TabContainer>
                <FactRumor />
              </TabContainer>
            )}
            {value === 5 && (
              <TabContainer>
                <Business />
              </TabContainer>
            )}
            {value === 6 && (
              <TabContainer>
                <Fashion />
              </TabContainer>
            )}
            {value === 7 && (
              <TabContainer>
                <Quotes />
              </TabContainer>
            )}
            {value === 8 && (
              <TabContainer>
                <Riddles />
              </TabContainer>
            )}
            {value === 9 && (
              <TabContainer>
                <Other />
              </TabContainer>
            )}
          </Grid>
          <Grid item xs sm={4} style={{ height: "100%" }}>
            <TabContainer>
              <Profile />
            </TabContainer>
          </Grid>
        </Grid>
        {value === 0 && (
          <Grid item xs={12}>
            <center>
              <DialogContentText style={{ textAlign: "center" }}>
                Get the Application
                <br />
                <img
                  src="https://www.lez.brussels/sites/default/files/playstore.png"
                  style={{ height: 50, weight: 50, padding: 5 }}
                />
              </DialogContentText>
            </center>
          </Grid>
        )}
      </div>
    );
  }
}

Container.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Container);
