// import dayjs from 'dayjs';
// import { capitalize } from 'lodash';

// import NoDataContent from '@/components/shared/NoDataContent';
// import {
//   getDateTimeWithDuration,
//   getDuration
// } from '@/utils';
// import Feedback from '@/components/shared/ViewDetails/Feedback';

// import {
//   vriCallInformations,
//   vriEvents,
//   vriFeedback,
//   vriParticipants,
//   vriRecording,
//   vriRightSiderContent
// } from './constants';
// import { dateTime12HrFormat } from '../../constants';

// export const getCallType = (callType: string | null): string => {
//   if (callType === 'scheduled') {
//     return 'Scheduled';
//   } else if (callType === 'adhoc') {
//     return 'On-Demand';
//   } else {
//     return '-';
//   }
// };

// export const getGender = (gender: string | null): string =>
//   gender ? capitalize(gender) : '-';

// export const getState = (state: string | null): string => {
//   switch (state) {
//     case 'initial':
//       return 'Created';
//     case 'started':
//       return 'Started';
//     case 'waiting_interpreter':
//       return 'Waiting for interpreter';
//     case 'no_interpreter_sourced':
//       return 'No interpreter sourced';
//     case 'interpreter_sourced':
//       return 'Interpreter sourced';
//     case 'interpreter_dna':
//       return 'Interpreter did not attend';
//     case 'client_dna':
//       return 'Client did not attend';
//     case 'running':
//       return 'Running';
//     case 'destroying':
//       return 'Call ended';
//     case 'cancelled':
//       return 'Cancelled';
//     case 'undelivered':
//       return 'No interpreter ever joined';
//     case 'finished':
//       return 'Completed';
//     default:
//       return 'No status';
//   }
// };

// const getNoDataContent = (groupedData: any) => ({
//   ...groupedData,
//   data: [
//     {
//       key: `no-${groupedData.key}`,
//       component: (
//         <NoDataContent
//           componentHeight={'auto'}
//           imageHeight={100}
//           imageWidth={100}
//         />
//       ),
//       details: []
//     }
//   ]
// });

// export const getVRICallParameters = (record: any) => {
//   const { id, call_type, state, ended_reason } = record || {};
//   return {
//     key: 'call_parameters',
//     title: 'Call Parameters',
//     icon: 'phone',
//     details: [
//       { title: 'ID', key: 'id', content: id || '' },
//       {
//         title: 'Call Type',
//         key: 'call_type',
//         content: getCallType(call_type) || ''
//       },
//       { title: 'Status', key: 'status', content: getState(state) || '' },
//       {
//         title: 'Call end reason',
//         key: 'call_end_reason',
//         content: ended_reason || ''
//       }
//     ]
//   };
// };

// export const getVRIRequestDetails = (record: any) => {
//   const {
//     language,
//     int_gender: gender,
//     requested_interpreter,
//     booked_interpreter,
//     client_notes
//   } = record || {};
//   return {
//     title: 'Request Details',
//     icon: 'idcard',
//     key: 'request_details',
//     details: [
//       {
//         title: 'Language',
//         key: 'language',
//         content: language?.description || ''
//       },
//       { title: 'Gender', key: 'gender', content: getGender(gender) || '' },
//       {
//         title: 'Requested Interpreter',
//         key: 'requested_interpreter',
//         content: requested_interpreter
//           ? `${requested_interpreter.firstname || ''} ${requested_interpreter.lastname || ''}`
//           : ''
//       },
//       {
//         title: 'Assigned Interpreter',
//         key: 'assigned_interpreter',
//         content: booked_interpreter
//           ? `${booked_interpreter.firstname || ''} ${booked_interpreter.lastname || ''}`
//           : ''
//       },
//       {
//         title: 'Client Notes',
//         key: 'client_notes',
//         content: client_notes || ''
//       }
//     ]
//   };
// };

// export const getVRIAccessDetails = (record: any) => {
//   const { access_code, purchase_order } = record || {};
//   return {
//     title: 'Access Details',
//     icon: 'key',
//     key: 'access_details',
//     details: [
//       { title: 'PO Number', key: 'po_number', content: purchase_order || '' },
//       { title: 'Access Code', key: 'access_code', content: access_code || '' }
//     ]
//   };
// };

// export const getVRICallInformations = (record: any) => ({
//   ...vriCallInformations,
//   data: vriCallInformations.data.map((key: string) => {
//     if (key === 'call_parameters') {
//       return getVRICallParameters(record);
//     }
//     if (key === 'request_details') {
//       return getVRIRequestDetails(record);
//     }
//     if (key === 'access_details') {
//       return getVRIAccessDetails(record);
//     }
//   })
// });

// export const getParticipantName = (participant: any) => {
//   const { contact, interpreter, thirdparty_name } = participant || {};
//   if (interpreter) {
//     return `${interpreter.firstname || ''} ${interpreter.lastname || ''}`;
//   } else if (thirdparty_name) {
//     return thirdparty_name;
//   } else if (contact) {
//     return `${contact.firstname || ''} ${contact.lastname || ''}`;
//   }
//   return '';
// };

// export const getParticipantStatus = (participant: any) => {
//   const { joined_at, left_at, left_reason } = participant || {};
//   if (joined_at && !left_at) {
//     return 'In the call';
//   } else if (left_at && left_reason) {
//     if (left_reason === 'disconnect') {
//       return 'Disconnected';
//     } else if (left_reason === 'left') {
//       return 'Left the call';
//     } else if (left_reason === 'networkDisconnect') {
//       return 'Left due to network failure';
//     } else if (
//       [
//         'recordingStoppedByServer',
//         'lastParticipantLeft',
//         'sessionClosedByServer',
//         'automaticStop',
//         'openviduServerStopped',
//         'mediaServerDisconnect'
//       ].includes(left_reason)
//     ) {
//       return 'Left due to session closed by server';
//     } else {
//       return 'Left for unknown reason';
//     }
//   }
//   return 'Not Joined';
// };

// export const getParticipantType = (participant: any) => {
//   const { interpreter, thirdparty_name, contact } = participant || {};
//   if (interpreter) {
//     return 'Interpreter';
//   } else if (thirdparty_name) {
//     return 'Third-party';
//   } else if (contact) {
//     if (contact?.customer_id) {
//       return 'Client';
//     } else {
//       return 'Staff';
//     }
//   }
//   return '';
// };

// const getVRIParticipantDetails = (participant: any) => {
//   const { id, joined_at, left_at } = participant || {};
//   const participantName = getParticipantName(participant);
//   const participantType = getParticipantType(participant);
//   return {
//     key: id,
//     title: `${participantName} (${participantType})`,
//     date: getDateTimeWithDuration(joined_at, left_at),
//     icon: left_at ? 'phone-exit danger-color' : 'phone',
//     details: ['duration', 'status'].map((key) => {
//       if (key === 'duration') {
//         return {
//           key: 'duration',
//           title: 'Duration',
//           content: getDuration(joined_at, left_at)
//         };
//       } else if (key === 'status') {
//         return {
//           key: 'status',
//           title: 'Status',
//           content: getParticipantStatus(participant) || ''
//         };
//       }
//     })
//   };
// };

// export const getVRIParticipants = (record: any) => {
//   const { participants = [] } = record || {};

//   if (participants.length === 0) {
//     return getNoDataContent(vriParticipants);
//   } else {
//     return {
//       ...vriParticipants,
//       data: participants.map((participant: any) =>
//         getVRIParticipantDetails(participant)
//       )
//     };
//   }
// };

// export const getVRIRecordings = (record: any) => {
//   const { recordings = [] } = record || {};
//   if (recordings.length === 0) {
//     return getNoDataContent(vriRecording);
//   } else {
//     return {
//       ...vriRecording,
//       data: [...recordings].reverse().map((recording: any, index: number) => ({
//         key: recording.session_id,
//         title: `Recording ${recordings.length - index}`,
//         date: getDateTimeWithDuration(recording.started_at, recording.ended_at),
//         icon: 'mic',
//         details: [
//           {
//             key: 'duration',
//             title: 'Duration',
//             content: getDuration(recording.started_at, recording.ended_at)
//           }
//         ]
//       }))
//     };
//   }
// };

// export const getVRIEventBasicDetails = (event: any) => {
//   const { id, event_type, created_at } = event || {};
//   const eventDetails = {
//     key: id,
//     date: dayjs(created_at).format(dateTime12HrFormat),
//     icon: '',
//     title: ''
//   };
//   if (event_type === 'joined') {
//     eventDetails.title = 'Joined';
//     eventDetails.icon = 'phone';
//   } else if (event_type === 'left') {
//     eventDetails.title = 'Left';
//     eventDetails.icon = 'phone-exit danger-color';
//   } else if (['disconnected', 'networkDisconnect'].includes(event_type)) {
//     eventDetails.title = 'Disconnected';
//     eventDetails.icon = 'phone-exit danger-color';
//   } else if (event_type === 'audio-toggled') {
//     eventDetails.title = 'Audio Toggled';
//     eventDetails.icon = 'mic';
//   } else if (event_type === 'video-toggled') {
//     eventDetails.title = 'Video Toggled';
//     eventDetails.icon = 'video';
//   } else if (event_type === 'recording-toggled') {
//     eventDetails.title = 'Recording Toggled';
//     eventDetails.icon = 'record';
//   } else if (event_type === 'call-ended') {
//     eventDetails.title = 'Call Ended';
//     eventDetails.icon = 'phone-exit danger-color';
//   } else if (event_type === 'screen-sharing-toggled') {
//     eventDetails.title = 'Screen Sharing Toggled';
//     eventDetails.icon = 'screen-share';
//   }
//   return eventDetails;
// };

// export const getVRIEventDetails = (event: any) => {
//   const { description } = event || {};
//   return {
//     ...getVRIEventBasicDetails(event),
//     details: [{ key: 'description', content: description || '' }]
//   };
// };

// export const getVRIEvents = (record: any) => {
//   const { events = [] } = record || {};
//   if (events.length === 0) {
//     return getNoDataContent(vriEvents);
//   }
//   return {
//     ...vriEvents,
//     data: events.map((event: any) => getVRIEventDetails(event))
//   };
// };

// export const getVRIFeedBack = (record: any) => {
//   const { rating, comment } = record || {};
//   return vriFeedback.data.map((key: string) => {
//     if (key === 'rating') {
//       return {
//         key,
//         component: <Feedback data={{ rating, key }} />
//       };
//     } else if (key === 'comment') {
//       return {
//         key: 'comment',
//         title: 'Comment',
//         date: dayjs(record.created_at).format(dateTime12HrFormat),
//         icon: 'message',
//         details: [
//           {
//             key: 'comment-content',
//             content: comment || '-'
//           }
//         ]
//       };
//     }
//   });
// };

// export const getVRIFeedbacks = (record: any) => {
//   if (!record?.rating) {
//     return getNoDataContent(vriFeedback);
//   }
//   return {
//     ...vriFeedback,
//     data: getVRIFeedBack(record)
//   };
// };

// export type VRIRightSiderContentKey = keyof typeof vriRightSiderContent;

// export const getVRIRightSiderDetails = (
//   key: VRIRightSiderContentKey | string,
//   record: any
// ) =>
//   vriRightSiderContent?.[key as VRIRightSiderContentKey]?.map(
//     (itemKey: string) => {
//       if (itemKey === 'call_informations') {
//         return getVRICallInformations(record);
//       } else if (itemKey === 'participants') {
//         return getVRIParticipants(record);
//       } else if (itemKey === 'recordings') {
//         return getVRIRecordings(record);
//       } else if (itemKey === 'events') {
//         return getVRIEvents(record);
//       } else if (itemKey === 'feedback') {
//         return getVRIFeedbacks(record);
//       }
//     }
//   );

// export const getVRIRightSiderData = (
//   record: any,
//   key?: VRIRightSiderContentKey | string
// ) => {
//   const rightSiderData: {
//     id: string | number;
//     title: string;
//     collapseList: any[];
//   } = {
//     id: record.id,
//     title: 'Call Details',
//     collapseList: []
//   };
//   if (key !== undefined && key in vriRightSiderContent) {
//     rightSiderData.collapseList = getVRIRightSiderDetails(key, record);
//   }
//   return rightSiderData;
// };
