import { useState, useEffect } from "react";
import Papa from "papaparse";
import SustainabilityTable from "./Table";
import csvFile from "./scores.csv";
import "./App.css";
import Container from "@mui/material/Container";

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the CSV file from the public folder
    Papa.parse(csvFile, {
      download: true,
      header: true,
      delimiter: ",",
      complete: function (input) {
        setData(input.data);
        console.log(input.data);
      },
    });
  }, []);

  return (
    <div className="App">
      <Container maxWidth="xl" style={{ margin: "5%"}}>
        <SustainabilityTable data={data} />
      </Container>
    </div>
  );
}

export default App;
