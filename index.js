const express = require("express");

const { google } = require("googleapis");
const path = require('path');

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

  async function getRows() {
    const { sheets } = await authSheets();
  
    // Read rows from spreadsheet
    const getRows = await sheets.spreadsheets.values.get({
      spreadsheetId: id,
      range: "Sheet1",
    });

    return getRows.data;
  }

  app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
  });


  app.get("/getRows", async (req,res) => {
    res.send(await getRows());
  })

  app.get("/styles.css", async( req, res ) => {

    res.sendFile(path.join(__dirname, "styles.css"));
  });
