import React from 'react'

import { IconButton } from '@material-ui/core';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import './SA-templates.css'

import newCreator from '../../images/new-creator-sign.png';


const templates = () => {
    return (
        <div className="template_section">
           <div className="template_top">
            <div className="template_left">
                  <p style={{color:"#202124",fontSize:"16px"}}>Start a new SA</p>
            </div>
            {/* <div className="template_right">
            <div className="gallery_button">
                Template gallery
                <UnfoldMoreIcon fontSize="small" />
              
            </div>
            <IconButton >
              <MoreVertIcon fontSize="small"/>
            </IconButton>
           
            
            </div> */}
            </div>
            <div className="template_body">
              <div className="card">
                  {/* <img src={newCreator} className="card_image" style={{}}/> */}
                  <AddCircleOutlineIcon style={{fontSize: 100, color: "darkgreen"}} />
                  <p className="title" >Blank</p>
              </div>
              {/* <div className="card">
                  <img className="card_image" style={{}}/>
                  <p className="title" style={{fontSize:"small"}}>Party Invite</p>
              </div>
              <div className="card">
                  <img className="card_image" style={{}}/>
                  <p className="title" style={{fontSize:"small"}}>Contact Information</p>
              </div> */}
            </div>
        </div>
    )
}

export default templates
