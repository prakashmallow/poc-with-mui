export const vriCallInformations = {
  key: 'call_informations',
  title: 'Call Informations',
  data: ['call_parameters', 'request_details', 'access_details']
};
export const vriParticipants = {
  key: 'participants',
  title: 'Participants',
  data: []
};
export const vriRecording = {
  key: 'recording',
  title: 'Recording',
  data: []
};
export const vriEvents = {
  key: 'events',
  title: 'Events',
  data: []
};
export const vriFeedback = {
  key: 'feedback',
  title: 'Feedback',
  data: ['rating', 'comment']
};

export const vriRightSiderContent = {
  completed_calls: [
    'call_informations',
    'participants',
    'recordings',
    'events',
    'feedback'
  ],
  active_calls: ['call_informations', 'participants', 'recordings', 'events'],
  pending_calls: ['call_informations', 'participants', 'recordings', 'events'],
  support_calls: ['call_informations', 'participants', 'recordings', 'events'],
  scheduled_calls: ['call_informations'],
  on_demand_calls: []
};
