import { useState } from "react";
import { Stack, Button } from "@mantine/core";
import Header from "./components/Header";
import Content from './components/Content'

function App() {
  const [count, setCount] = useState(0);

  return (
    <Stack align="center" spacing={0}>
      <Header />
      <Content />
    </Stack>
  );
}

export default App;
