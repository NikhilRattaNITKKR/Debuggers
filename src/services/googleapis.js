const { google }= require('googleapis');


const CLIENT_ID = '178033643863-q6967s9v814jdk8drsi1nf3c449mdlp5.apps.googleusercontent.com';
const CLIENT_SECRET = 'NPdXNmARw2gpNIEqQ_tZIwnS';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04800dAap57vXCgYIARAAGAQSNwF-L9IrujWFuag1cEmYvswnwwz9sYGiBsNJsgqvgTGhziDaU6ISLy0DMXE9z4U7B9YWs8hCXto';


const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const drive =  google.drive({
  version: 'v3',
  auth: oauth2Client
})

async function uploadFile () {
  try {

    const response = await drive.files.create({
      requestBody: {
        name: '',
        mimeType: 'image/png'
      },
      media: {
        mimeType: 'image/png',
        // body: fs.createReadStream(filePath)
      }
    });

    console.log(response.data);

  } catch (e) {
    console.error(e.message);
  }
}



module.exports = {
  drive,
}
