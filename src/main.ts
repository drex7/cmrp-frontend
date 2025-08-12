import {bootstrapApplication} from '@angular/platform-browser';
import {cmrpConfig} from './app/cmrp.config';
import {Cmrp} from './app/cmrp';

import outputs from '../amplify_outputs.json';
import {Amplify} from 'aws-amplify';

Amplify.configure(outputs);
// TODO: Reconfigure amplify
// Amplify.configure({
//   Auth: {
//     Cognito: {
//       userPoolId: "",
//       userPoolClientId: "",
//     }
//   },
//   API: {
//     Events: {
//
//     }
//   }
// });

bootstrapApplication(Cmrp, cmrpConfig)
  .catch((err) => console.error(err));
