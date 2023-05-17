import React, { useState } from "react";
const CheckBox = ({ categories,handleFilters }) => {
    const[checked,setChecked]=useState([]);

    const handleToggle=(c)=>{
const index=checked.indexOf(c);
const newChecked= [...checked];
if(index===-1){
    newChecked.push(c);
}else{
    newChecked.splice(index,1);
}
setChecked(newChecked);
handleFilters(newChecked);
    }

  return categories.map((c, i) => (

      <li key={i} className="list-unstyled">
        <input onChange={()=>handleToggle(c._id)} value={checked.indexOf(c._id===-1)} type="checkbox" className="form-check-input"></input>
        <label className="form-check-label">{c.name}</label>
      </li>
    )
  );
};

export default CheckBox;
