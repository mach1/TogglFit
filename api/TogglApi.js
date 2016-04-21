import config from '../api-config.json'
import Base64 from 'Base64'

export function authenticate () {
  return fetch('https://www.toggl.com/api/v8/me', {
    headers: {
      'Authorization': 'Basic ' + Base64.btoa(`${config.apiKey + ':api_token'}`)
    }
  }).then(function(response) {

  })
}

export function startTimeEntry (description) {
  return fetch('https://www.toggl.com/api/v8/time_entries/start', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Base64.btoa(`${config.apiKey + ':api_token'}`)
    },
    body : JSON.stringify({
      time_entry: {
        description,
        created_with: 'TogglFit'
      }
    })
  }).then(function(response) {
    console.log('Started time entry:', description)
    return response.json()
  })
}

export function stopTimeEntry (id) {
  return fetch(`https://www.toggl.com/api/v8/time_entries/${id}/stop`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Base64.btoa(`${config.apiKey + ':api_token'}`)
    }
  }).then(function(response) {
    console.log('Stopped time entry')
  })
}

