import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import './listDesNotifs.css'


function ListDesNotifs({ setModalOpenNotifClient }) {
    
  return (
    <div className="modalBackground-notif">
      <div className="modalContainer-notif">
        <div className="titleCloseBtn-notif">
          <button
            onClick={() => {
                setModalOpenNotifClient(false);
            }}
          >
            X
          </button>
        </div>
        <div className="body">
           Notiffff
        </div>
      </div>
    </div>
  );
}

export default ListDesNotifs;


