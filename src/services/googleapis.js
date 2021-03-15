const { google }= require('googleapis');


const CLIENT_ID = '178033643863-q6967s9v814jdk8drsi1nf3c449mdlp5.apps.googleusercontent.com';
const CLIENT_SECRET = '2oPqTDDKHm8DTqJ1ecS5uZBd';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04wzawkxlJwMvCgYIARAAGAQSNwF-L9Ir5n0avV6zwh3ntPXevKG307r4NV1uY-luD_YOg2Cth_z28BYU3Pb-320mEH5_mcKlXKE';


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
