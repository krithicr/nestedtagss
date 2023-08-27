import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const TagView = ({
  name,
  data,
  children,
  onEditName,
  setTagData,
  tagData,
  keyName,
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

  const newData = {
    name: "newchild",
    data: "newdata",
  };

  const handleAddSubchild = (subdata, key) => {
    if (typeof subdata === "object" && subdata["name"] === key) {
      if (!subdata.children) {
        subdata.children = [];
      }

      const newname = giveNewField(subdata);
      newData.name = newname;
      subdata.children.push(newData);

      console.log("Reaching here");
      setTagData(tagData);
      return;
    }

    let found = "notfound";

    if (!Array.isArray(subdata)) {
      subdata = subdata["children"];
    }

    for (const data in subdata) {
      const datas = subdata[data];
      if (key.startsWith(datas["name"])) {
        found = datas;
        break;
      }
    }

    if (found !== "notfound") {
      return handleAddSubchild(found, key);
    }
  };

  const giveNewField = (subdata) => {
    return subdata["name"] + "-child" + (subdata["children"].length + 1);
  };

  const handleAddChild = (name) => {
    if (name === tagData["name"]) {
      if (!tagData["children"]) {
        tagData["children"] = [];
      }
      const newname = "child" + (tagData["children"].length + 1);
      newData.name = newname;
      tagData["children"].push(newData);
    } else {
      handleAddSubchild(tagData["children"], name);
    }

    const updatedTagData = { ...tagData };

    setTagData(updatedTagData);
    // console.log(updatedTagData);
  };

  const handleDataEdit = (subdata, target, from) => {
    console.log(subdata);
    if (typeof subdata === "object" && subdata["name"] === target) {
      if (from === "data") {
        subdata["data"] = editedData;
        setTagData(tagData);
      }

      if (from === "name") {
        console.log(name);
        subdata["editedName"] = newName;
        setTagData(tagData);
      }

      console.log(tagData);
      return;
    }

    let found = "notfound";

    if (!Array.isArray(subdata)) {
      subdata = subdata["children"];
    }

    for (const data in subdata) {
      const datas = subdata[data];
      if (target.startsWith(datas["name"])) {
        found = datas;
        break;
      }
    }

    if (found !== "notfound") {
      return handleDataEdit(found, target, from);
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid #1976D2",
        height: "max-Content",
        minHeight: !isCollapsed && "150px",
      }}
      borderRadius={2}>
      {tagData && (
        <Box width="100%">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "50px",
              backgroundColor: "#1976D2",
              padding: "10px",
            }}
            borderRadius={1}>
            <Box
              sx={{ display: "flex", gap: "20px", alignItems: "center" }}
              pl={1}>
              <Button
                sx={{
                  backgroundColor: "#F5F5F5",
                  color: "black",
                  height: "30px",
                  cursor: "pointer",
                  fontWeight: "800",
                  fontSize: "16px",
                }}
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
                    onChange={(e) => {
                      setNewName(e.target.value);
                    }}
                    autoFocus
                  />

                  <Button
                    sx={{ backgroundColor: "#F5F5F5", color: "black" }}
                    variant="contained"
                    type="submit"
                    onClick={() => {
                      handleDataEdit(tagData, name, "name");
                      setIsEditingName(false);
                    }}>
                    Save
                  </Button>
                </>
              ) : (
                <Typography
                  variant="h5"
                  component="h2"
                  onClick={handleNameEdit}>
                  {newName}
                </Typography>
              )}
            </Box>

            <Button
              sx={{
                backgroundColor: "#F5F5F5",
                color: "black",
                height: "30px",
              }}
              variant="contained"
              onClick={() => handleAddChild(keyName)}>
              Add Child
            </Button>
          </Box>
          {!isCollapsed && (
            <Box
              sx={{
                minHeight: "50px",
              }}
              m={2}>
              {tagData &&
                children &&
                children.map((child, index) => (
                  <Box key={index} mt={1}>
                    {tagData && (
                      <TagView
                        key={index}
                        name={child.editedName || child.name}
                        keyName={child.name}
                        data={child.data}
                        children={child.children}
                        onEditName={(newName) => onEditName(newName)}
                        tagData={tagData}
                        setTagData={setTagData}
                      />
                    )}
                  </Box>
                ))}

              {data && !children && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                  }}>
                  <Typography variant="h6" component="h2">
                    Data:
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={editedData}
                    size="small"
                    style={{ paddingLeft: "10px" }}
                    onChange={(e) => {
                      setEditedData(e.target.value);
                    }}
                    onBlur={() => {
                      handleDataEdit(tagData, name, "data");
                    }}
                  />
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default TagView;
