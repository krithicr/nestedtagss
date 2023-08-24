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
  // console.log(tagData);

  const exportData = () => {
    console.log(JSON.stringify(tagData));
    setJsonData(JSON.stringify(tagData));
  };
  // const onAddChild = (name) => {
  //   if (tagData) {
  // Create a new child with a fixed name
  // const newChild = {
  //   name: "New Child",
  //   data: "Data",
  //   children: [], // Ensure children is an array
  // };

  // Create a deep copy of tagData and add the new child
  // const updatedTagData = JSON.parse(JSON.stringify(tagData));
  // console.log(updatedTagData);
  // console.log(tagData);

  // for (let i in updatedTagData) {
  //   console.log(updatedTagData[i]);
  // }

  // const updatedArray = tagData.map((index) => ({
  //   ...index,
  //   name: "krithic",
  // }));

  // function searchElement(updatedTagData) {
  //   for (let i in updatedTagData) {
  //     if (name === updatedTagData[i]) {
  //       console.log(updatedTagData[i]);
  //       //  if (!name.children) {
  //       //    name.children = [];
  //       //   updatedTagData[i].children.push(newChild);
  //       // }
  //     } else {
  //       searchElement(updatedTagData[i]);
  //     }
  //   }
  // }
  // searchElement(updatedTagData);
  // setTagData(updatedArray);
  //   }
  // };
  //   }
  //   const newChild = {
  //     name: "New Child",
  //     data: "Data",
  //     children: [], // Ensure children is an array
  //   };

  //   // Create a deep copy of tagData and add the new child
  //   const updatedTagData = JSON.parse(JSON.stringify(tagData));

  //   if (updatedTagData.name === name) {
  //     if (!updatedTagData.children) {
  //       updatedTagData.children = [];
  //     }
  //     updatedTagData.children.push(newChild);
  //     console.log(updatedTagData);
  //     setTagData(updatedTagData); // Pass the updated data back to the parent
  //   }
  // };
  //     const newChild = {
  //       name: "New Child",
  //       data: "Data",
  //     };

  //     if (tagData && tagData.name === name) {
  //       if (!tagData.children) {
  //         tagData.children = [];
  //       }
  //       tagData.children.push(newChild);
  //       setTagData(tagData);
  //     }
  //   }
  // };
  //     console.log(tagData);
  //   } else if (tagData.children && tagData.children) {
  //     for (let i of tagData.children) {
  //       onAddChild(name);
  //     }
  //   }
  // };

  const onEditName = (tag, newName) => {
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
        // onAddChild={onAddChild}
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
