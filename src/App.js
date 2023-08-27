import React, { useState } from "react";
import TagView from "./TagView";
import { Box, Button, Container, Typography } from "@mui/material";

const App = () => {
  const initialData = {
    name: "root",
  };

  const [tagData, setTagData] = useState(initialData);
  const [jsonData, setJsonData] = useState();

  const exportData = () => {
    setJsonData(JSON.stringify(tagData));
  };

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
      <Typography
        fontSize={32}
        fontWeight="500"
        variant="h1"
        component="h1"
        mt={3}
        mb={4}
        style={{ textDecoration: "underline" }}>
        Nested Tags Tree
      </Typography>
      <TagView
        name={tagData.editedName || tagData.name}
        keyName={tagData.name}
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

      <Box mb={6}>
        <Typography fontWeight="300" fontSize={16} letterSpacing={0.5}>
          {jsonData && jsonData}
        </Typography>
      </Box>
    </Container>
  );
};

export default App;
