import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { default as MuiDrawer } from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
// import ListItemText from '@material-ui/core/ListItemText';
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import { FiSettings } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";

// import formimage from "../../images/test-images/formimage.png"
// import excelsheetimage from "../../images/test-images/excelsheetimage.png"
// import docimage from "../../images/test-images/docimage.png"
// import slidesimage from "../../images/test-images/slidesimage.png"
// import driveimage from "../../images/test-images/driveimage.png"

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

const Drawer = () => {
  const classes = useStyles();
  const [drawer, setDrawer] = useState({ left: false });

  const toggleDrawer =
    (anchor: string, open: boolean) => (event: React.MouseEvent) => {
      setDrawer({ ...drawer, [anchor]: open });
    };

  const list = (anchor: string) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
    >
      <Divider />
      <List>
        <ListItem className="logo_title">
          {/* <ListItemText  style={{fontSize:"48px",marginLeft:"5px"}}>
                    <span style={{color:"blue",fontWeight:"bolder",fontSize:"22px",fontFamily: "'Product Sans',Arial,sans-serif"}}>G</span>
                    <span style={{color:"red",fontWeight:"bolder",fontSize:"22px",fontFamily: "'Product Sans',Arial,sans-serif"}}>o</span>
                    <span style={{color:"yellow",fontWeight:"bolder",fontSize:"22px",fontFamily: "'Product Sans',Arial,sans-serif"}}>o</span>
                    <span style={{color:"blue",fontWeight:"bolder",fontSize:"22px",fontFamily: "'Product Sans',Arial,sans-serif"}}>g</span>
                    <span style={{color:"green",fontWeight:"bolder",fontSize:"22px",fontFamily: "'Product Sans',Arial,sans-serif"}}>l</span>
                    <span style={{color:"red",fontWeight:"bolder",fontSize:"22px",marginRight:"10px",fontFamily: "'Product Sans',Arial,sans-serif"}}>e</span> 
                    <span style={{color:"#5f6368",fontWeight:"bolder",fontSize:"22px",fontFamily: "'Product Sans',Arial,sans-serif"}}> Docs</span>
    
                   </ListItemText> */}
        </ListItem>
      </List>

      <Divider />
      <List
        style={{ marginLeft: "08px", marginRight: "8px", marginTop: "15px" }}
      >
        <ListItem className="list_item">
          {/* <img src={docimage} style={{height:"20px",width:"20px"}}/> */}
          {/* <div  style={{marginLeft:"20px",fontSize:"14px",fontWeight:"bolder",color:"grey"}} > Docs</div> */}
        </ListItem>

        <ListItem className="list_item">
          {/* <img src={excelsheetimage} style={{height:"20px",width:"20px"}}/> */}
          {/* <div  style={{marginLeft:"20px",fontSize:"14px",fontWeight:"bolder",color:"grey"}} > Sheets</div> */}
        </ListItem>

        <ListItem className="list_item">
          {/* <img src={slidesimage} style={{height:"20px",width:"20px"}}/> */}
          {/* <div  style={{marginLeft:"20px",fontSize:"14px",fontWeight:"bolder",color:"grey"}} > Slides</div> */}
        </ListItem>

        <ListItem className="list_item">
          {/* <img src={formimage} style={{height:"20px",width:"20px"}}/> */}
          {/* <div  style={{marginLeft:"20px",fontSize:"14px",fontWeight:"bolder",color:"grey"}} > Forms</div> */}
        </ListItem>
      </List>

      <Divider />
      <List
        style={{ marginLeft: "08px", marginRight: "08px", marginTop: "15px" }}
      >
        <ListItem className="list_item">
          <FiSettings />
          <div style={{ marginLeft: "20px", fontSize: "14px" }}> Settings</div>
        </ListItem>

        <ListItem className="list_item">
          <BsQuestionCircle />
          <div
            style={{
              marginLeft: "20px",
              fontSize: "14px",
              fontWeight: "bolder",
              color: "grey",
            }}
          >
            {" "}
            Help & Feedback
          </div>
        </ListItem>
      </List>

      <Divider />
      <List
        style={{ marginLeft: "08px", marginRight: "08px", marginTop: "15px" }}
      >
        <ListItem className="list_item">
          {/* <img src={driveimage} style={{height:"20px",width:"20px"}}/>
              
                <div  style={{marginLeft:"20px",fontSize:"14px"}} > Drive</div> */}
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <IconButton onClick={toggleDrawer("left", true)}>
          <MenuIcon />
        </IconButton>
        <MuiDrawer
          anchor={"left"}
          open={drawer["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </MuiDrawer>
      </React.Fragment>
    </div>
  );
};

export default Drawer;
