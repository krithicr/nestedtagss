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

  const handleNameSave = (newName) => {
    onEditName(newName);
    setIsEditingName(false);
  };
  console.log(tagData);

  const handleAddChild = (name) => {
    const newChild = {
      name: "New Child",
      data: "Data",
    };
    // for(let i in tagData){

    // }
    if (!name.children) name.children = [];
    name.children.push(newChild);
    setTagData({ ...tagData });

    // const newChild = {
    //   name: "New Child",
    //   data: "Data",
    //   // children: [],
    // };

    // const addChildToNode = (node) => {
    //   if (node.children) {
    //     node.children.push(newChild);
    //   }
    //   // node.children = [];
    // };

    // const addChildRecursive = (currentNode) => {
    //   if (currentNode.name === Name) {
    //     addChildToNode(currentNode);
    //   } else if (currentNode.children) {
    //     currentNode.children.forEach((childNode) => {
    //       addChildRecursive(childNode);
    //     });
    //   }
    // };

    // const updatedTagData = JSON.stringify(tagData);
    // addChildRecursive(updatedTagData);

    // setTagData(updatedTagData);
    // console.log(Name);
  };

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
                onClick={() => handleNameSave(newName)}>
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
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default TagView;
