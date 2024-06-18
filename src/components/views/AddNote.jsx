import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function AddNote(props) {
  const nevigate = useNavigate();

  const HandleOnClick = () => {
    nevigate("/AddItem/Form");
  };

  return (
    <IconButton
      className="add-note-button"
      title="Add New Note"
      onClick={HandleOnClick}
    >
      <AddCircleOutlineOutlined />
    </IconButton>
  );
}

export default AddNote;
