//For Convertimg Timestamp
function convertTime(isoDate) {

  var postDate = new Date(isoDate);
  var currrentdate = Date.now();
  let ms = currrentdate - postDate;
  let time = "";
  let sec = Math.floor(ms/1000);
  let min = Math.floor(sec/60);
  let hr = Math.floor(min/60);
  let day = Math.floor(hr/24);
  let week = Math.floor(day/7);

  if (sec < 60) {
    time = `few seconds ago`;

  } else if (sec >= 60 && min < 60) {
    time = `${min} minute ago`;

  } else if (min >= 60 && hr < 24) {
    time = `${hr} hour ago`;

  } else if (hr >= 24 && day < 7) {
    time = `${day} day ago`;

  } else if (day >= 7 && week < 4) {
    time = `${week} week ago`;

  } else {
    time = 'Once upon a time!'
  }
  console.log(time);

  return time;
}


function createLocalUser(user) {
  window.localStorage.setItem('user', user)
}


module.exports = {
  convertTime,
  createLocalUser,
}
