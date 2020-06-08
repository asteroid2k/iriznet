import React from 'react';
import toaster  from 'toasted-notes';
import "toasted-notes/src/styles.css";


export const showStudent=(response)=>{
    let style={fontSize:'1.2em'};
    toaster.notify(
        <div className="card border-light" >
          <div className="card-header text-info" style={style}>
            Student Info
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item" style={style}><b>ID</b>: {response.data.student_id}</li>
            <li className="list-group-item" style={style}><b>Name</b>: {response.data.name}</li>
            <li className="list-group-item" style={style}><b>Level</b>: {response.data.level}</li>
            <li className="list-group-item" style={style}><b>Email</b>: {response.data.email}</li>
            <li className="list-group-item" style={style}><b>Sex</b>: {response.data.sex}</li>
          </ul>
          </div>
        ,{autoClose:10000,position:"bottom-right"})  
}