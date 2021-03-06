const fetch = require('node-fetch');

const TOKEN = '{Slack_API_token}';
const CHANNEL_ID = '{Channel_ID}';
const SLACK_API_BASE = 'https://slack.com/api';

function fetchChannel() {
  return fetch(`${SLACK_API_BASE}/channels.info?token=${TOKEN}&channel=${CHANNEL_ID}&pretty=1`)
    .then(res => res.json())
    .then((res) => {
      if (!res.ok) throw new Error(res.error);
      return res.channel;
    });
}

function fetchMembers(ids) {
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

(async () => {
  const channel = await fetchChannel();
  const members = await fetchMembers(channel.members);
  const names = members.map(x => x.real_name).sort();
  process.stdout.write('✄-------------------------------------\n');
  names.forEach((name) => {
    process.stdout.write(`${name}\n`);
  });
  process.stdout.write('✄-------------------------------------\n');
})()
  .catch(err => console.error(err));
