# mysong
MySong is a online song recognizer, that actually works.

# Installation
You need to install Node.js 16(It might work on 14, but I did not tested it on 14),[SongRec](https://github.com/marin-m/SongRec), Git and Yarn.

Clone the repo:
```bash
git clone https://github.com/MrCheatEugene/mysong
cd mysong
```
Install all of the libraries:
```bash
yarn install
```

Start the frontend:
```bash
yarn start
```
Finally, open the second window, or start a background task to start the API:
```bash
node api.js
```

You're done! Open http://127.0.0.1:3000(or, if you have 3000 port used, and you aggreed with React to run it on another port: http://127.0.0.1:3001, where 3001 is the port that React is listening on(check terminal where you wrote `yarn start`)).

Now, you have MySong set up and running!
You can access the recognition api via http://127.0.0.1:3002.

# Configuration

Open `src/config.js`.

Here you have an object with 3 variables:
- fullAPIurl 
- useorigin
- port

1. `fullAPIurl` is a path that locates the API root url is formatted like this: `protocol://domain.name`
2. `port` is a variable that stores API port. It's used by API and `fullAPIurl` variable mentioned earlier.
3. `useorigin` is a variable that indicates to form API path by port and current `window.origin`(see [here](https://developer.mozilla.org/en-US/docs/Web/API/Location/origin)), or use `fullAPIurl` and `port` variables to form API path.

`port` variable and `useorigin` variables are *always* required.

After changing config, restart API if you changed the port.
React will probably restart by itself.

Example configuration(Whole file):
```js
var config = {"useorigin":true,"fullAPIurl":"http://domain","port":"3002"}
export default {config}
```

# How it works?

MySong uses SongRec library, to interact with Shazam apis and recognize song like you're sitting with your phone nearby the speaker.
MySong API when it sees a file upload, processes it, gets the file and passes it to SongRec, which returns song name.
Then, on Frontend, that is based on React&React Bootstrap, when a user uploads file, it sends it to MySong API and API returns success code, and song name.
If the request fails, user will have a failure message. 
If it was successful, it'll have a success message, with song name and link to search that track on YouTube.

# Setting a different background photo

Replace photo.jpg with your own photo. FullHD resolution recommended, with 16:9 aspect ratio.

# Support me

If you want to support me and development of these projects, you can do it [here](https://www.donationalerts.com/r/mrcheatt).

Thanks:)
