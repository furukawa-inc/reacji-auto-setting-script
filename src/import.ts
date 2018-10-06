import * as dotenv from 'dotenv';
import * as Slack from 'slack-node';
import * as request from 'request';

dotenv.config();
const apiToken = process.env.SLACK_API_TOKEN;
const slack = new Slack(apiToken);

slack.api('emoji.list', function(err, response) {
  for(const key in response.emoji) {
    const url = response.emoji[key]; 

    // exclude alias
    if(url.match(/alias/)) {
      continue;
    }

    // send slash command
    request.post('https://slack.com/api/chat.command', {
      form: {
        token: apiToken,
        channel: '{channel id}',
        command: '/reacji-channeler',
        text: ` :${key}: #{channel name}`
      }
    });
  }
});
