const google = require('googleapis')

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

  function WriteOnSheet() {
    // Implemente sua lógica aqui para escrever na planilha
    var writeInput = document.getElementById('writeInput').value;
    console.log('Texto digitado:', writeInput);
  }

async function ReadSheetRow() {
    // Implemente sua lógica aqui para ler da planilha
    var readInput = document.getElementById('readInput').value;
    const { sheets } = await authSheets();
  
    // Read rows from spreadsheet
    const getRows = await sheets.spreadsheets.values.get({
      spreadsheetId: id,
      range: "Sheet1",
    });

    console.log(getRows.data);
}