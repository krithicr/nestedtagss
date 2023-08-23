import React, { useEffect, useState } from "react";
import TagView from "./TagView";
import "../src/App.css";
import { Box, Button, Container, Typography } from "@mui/material";

const App = () => {
  const initialData = {
    name: "root",
    children: [
      {
        name: "child1",
        children: [
          { name: "child1-child1", data: "c1-c1 Hello" },
          { name: "child1-child2", data: "c1-c2 JS" },
        ],
      },
      { name: "child2", data: "c2 World" },
      { name: "child2", data: "c2 World" },
    ],
  };

  const [tagData, setTagData] = useState(initialData);
  const [jsonData, setJsonData] = useState();

  const exportData = () => {
    console.log(JSON.stringify(tagData));
    setJsonData(JSON.stringify(tagData));
  };

  // useEffect(() => {
  //   setJsonData(JSON.stringify(tagData));
  // }, [tagData]);

  const onEditName = (tag, newName) => {
    // for (let i in tagData) {
    //   if (tagData[i] === "oldName") {
    //     tagData[i] = newName;
    //   }
    // }
    tag.name = newName;
    setTagData({ ...tagData });
  };

  return (
    <Container
      sx={{
        // border: "1px solid black",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        textAlign: "center",
      }}>
      <h1>Nested Tags Tree</h1>
      <TagView
        name={tagData.name}
        data={tagData.data}
        children={tagData.children}
        onEditName={(newName) => onEditName(tagData, newName)}
        setTagData={setTagData}
        tagData={tagData}
      />
      <Button sx={{ width: "70px" }} variant="contained" onClick={exportData}>
        Export
      </Button>

      <Typography variant="body1" gutterBottom>
        {jsonData && jsonData}
      </Typography>
    </Container>
  );
};

export default App;
