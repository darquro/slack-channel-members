var fetch = require('node-fetch');

const TOKEN = '{Slack_API_token}';
const CHANNEL_ID = '{Channel_ID}';
const SLACK_API_BASE = 'https://slack.com/api';

function fetchChannel() {
  return fetch(`${SLACK_API_BASE}/channels.info?token=${TOKEN}&channel=${CHANNEL_ID}&pretty=1`)
    .then(res => res.json())
    .then((res) => {
      if (!res.ok) throw new Error(res.error);
      return res.channel.members;
    });
}

function fetchMember(ids) {
  return Promise.all(ids.map((id) => {
    return fetch(`${SLACK_API_BASE}/users.info?token=${TOKEN}&user=${id}&pretty=1`)
      .then(res => res.json())
      .then((res) => {
        if (!res.ok) throw new Error(res.error);
        return res.user;
      });
  }))
  .then(users => users.filter(x => !x.deleted));
}

fetchChannel()
  .then(ids => fetchMember(ids))
  .then(users => users.map(x => x.real_name).sort())
  .then(names => console.log(names))
  .catch(err => console.error(err));
