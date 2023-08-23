import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const TagView = ({
  name,
  data,
  children,
  onAddChild,
  onUpdateData,
  onEditName,
  setTagData,
  tagData,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(name);
  const [editedData, setEditedData] = useState(data);

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNameSave = () => {
    onEditName(newName);
    setIsEditingName(false);
  };

  const data1 = tagData;

  const handleAddChild = (name) => {
    const newChild = {
      name: "New Child",
      data: "Data",
    };

    if (data1 && data1.name === name) {
      if (!data1.children) {
        data1.children = [];
      }
      data1.children.push(newChild);
      setTagData(data1);
      console.log(tagData);
    } else if (data1.children && data1.children) {
      for (let i of data1.children) {
        handleAddChild(name);
      }
    }
    // function searchObject(tagData) {
    //   for (let i in tagData) {
    //     if (tagData[i] === name) {
    //       // tagData[i].children.push(newChild);
    //       console.log(name);
    //     } else {
    //       searchObject(tagData[i].children);
    //     }
    //   }
    // }
    // searchObject(tagData);
    // setTagData({ ...tagData });
    // console.log(name);
  };

  // const newChild = {
  //   name: "New Child",
  //   data: "Data",
  // };
  // if (!parent.children) parent.children = [];
  // parent.children.push(newChild);
  // setTagData({ ...tagData }); // Trigger a re-render

  return (
    <Box
      sx={{
        border: "1px solid #1976D2",
        height: "max-Content",
        // paddingLeft: "10px",
        // paddingRight: "10px",
        minHeight: "150px",
      }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "50px",
          width: "100%",
          backgroundColor: "#1976D2",
          // padding: "5px",
        }}>
        <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Button
            sx={{ backgroundColor: "#F5F5F5", color: "black", height: "30px" }}
            variant="contained"
            onClick={handleCollapse}>
            {isCollapsed ? ">" : "v"}
          </Button>
          {isEditingName ? (
            <>
              <TextField
                id="standard-basic"
                // label="Standard"
                variant="standard"
                type="text"
                value={newName}
                onChange={handleNameChange}
                autoFocus
              />

              <Button
                sx={{ backgroundColor: "#F5F5F5", color: "black" }}
                variant="contained"
                type="submit"
                onClick={handleNameSave}>
                Save
              </Button>
            </>
          ) : (
            <Typography variant="h4" component="h2" onClick={handleNameEdit}>
              {name}
            </Typography>
          )}
        </Box>

        <Button
          sx={{ backgroundColor: "#F5F5F5", color: "black", height: "30px" }}
          variant="contained"
          onClick={() => handleAddChild(name)}>
          Add Child
        </Button>
      </Box>
      {!isCollapsed && (
        <Box
          sx={{
            marginLeft: "15px",
            minHeight: "50px",
            marginTop: "10px",
          }}>
          {children &&
            children.map((child, index) => (
              <TagView
                key={index}
                name={child.name}
                data={child.data}
                children={child.children}
                // newName={newName}
                // editedData={editedData}
                onEditName={(newName) => onEditName(newName)}
              />
            ))}

          {data && (
            <Box sx={{ display: "flex", justifyContent: "start" }}>
              <Typography variant="h6" component="h2">
                Data:
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={editedData}
                contentEditable="true"
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default TagView;
