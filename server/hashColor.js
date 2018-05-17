// Modified from :
// https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
module.exports = (str) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (i = 0; i < 3; i++) {
    // Replaced 0xFF -> 0x88 to ensure colours are dark
    var value = (hash >> (i * 8)) & 0x88;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

