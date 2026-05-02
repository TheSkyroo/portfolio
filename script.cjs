const fs = require('fs');
const imgBuffer = fs.readFileSync('public/favicon.jpg');
const b64 = imgBuffer.toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <clipPath id="circle">
      <circle cx="50" cy="50" r="50"/>
    </clipPath>
  </defs>
  <image width="100" height="100" href="data:image/jpeg;base64,${b64}" clip-path="url(#circle)" preserveAspectRatio="xMidYMid slice"/>
</svg>`;
fs.writeFileSync('public/favicon.svg', svg);
