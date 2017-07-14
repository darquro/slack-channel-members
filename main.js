var fetch = require('node-fetch');

const TOKEN = '{Slack API Token}}';
const CHANNEL_ID = '{Channel ID}';
const SLACK_API_BASE = 'https://slack.com/api';

function main() {
  const CHANNEL_REQ = `${SLACK_API_BASE}/channels.info?token=${TOKEN}&channel=${CHANNEL_ID}&pretty=1`;
  fetch(CHANNEL_REQ)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      return getMemberIDs(json);
    })
    .then((memberIDs) => {
      Promise.all(memberIDs.map(id => getRealNameOfMember(id)))
      .then((names) => {
        const results = names.filter(x => x).sort();
        console.log(results);
      });
    })
    .catch(err => console.log(err));
}

function getMemberIDs(res) {
  return res.channel.members;
}

function getRealNameOfMember(id) {
  const USER_REQ = `${SLACK_API_BASE}/users.info?token=${TOKEN}&user=${id}&pretty=1`;
  return fetch(USER_REQ)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      return !json.user.deleted ? json.user.real_name : null;
    });
}

main();
