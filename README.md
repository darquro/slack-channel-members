# slack-channel-members

Get member names in slack channel.

## Usage

Install package.

```sh
$ npm install
```

Set Slack API token([Slack API Legacy tokens](https://api.slack.com/custom-integrations/legacy-tokens)) and channel ID into main.js.

```js
const TOKEN = '{Slack_API_token}';
const CHANNEL_ID = '{Channel_ID}';
```

Execute node command in current directory

```sh
$ node .
[ 'James Hetfield',
  'Lars Ulrich',
  'Kirk Hammett',
  'Robert Trujillo' ]
```
