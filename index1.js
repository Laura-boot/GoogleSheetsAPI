const express = require("express");

const { google } = require("googleapis");

const app = express();
const port = 8080;

//This allows us to parse the incoming request body as JSON
app.use(express.json());

// With this, we'll listen for the server on port 8080
app.listen(port, () => console.log(`Listening on port ${port}`));

async function authSheets() {
    //Function for authentication object
    const auth = new google.auth.GoogleAuth({
      keyFile: "keys.json",
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  
    //Create client instance for auth
    const authClient = await auth.getClient();
  
    //Instance of the Sheets API
    const sheets = google.sheets({ version: "v4", auth: authClient });
  
    return {
      auth,
      authClient,
      sheets,
    };
  }

  const id = "1uTZSyqRis2ttATQg8s-l1_K-PqqHwoT07KVrJosdcno";

  app.get("/", async (req, res) => {
    const { sheets } = await authSheets();
  
    // Read rows from spreadsheet
    const getRows = await sheets.spreadsheets.values.get({
      spreadsheetId: id,
      range: "Sheet1",
    });
  
    res.send(getRows.data);
  });

  function WriteOnSheet() {
    // Implemente sua lógica aqui para escrever na planilha
    var writeInput = document.getElementById('writeInput').value;
    console.log('Texto digitado:', writeInput);
  }

  function ReadSheetRow() {
    // Implemente sua lógica aqui para ler da planilha
    var readInput = document.getElementById('readInput').value;
    console.log('Número da linha:', readInput);
  }