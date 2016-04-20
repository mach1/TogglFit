import config from '../api-config.json'
import Base64 from 'Base64'

export function authenticate () {
  fetch('https://www.toggl.com/api/v8/me', {
    headers: {
      'Authorization': 'Basic ' + Base64.btoa(`${config.apiKey + ':api_token'}`)
    }
  }).then(function(response) {
    console.log(response)
  })
}
