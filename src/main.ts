import {bootstrapApplication} from '@angular/platform-browser';
import {cmrpConfig} from './app/cmrp.config';
import {Cmrp} from './app/cmrp';

import outputs from '../amplify_outputs.json';
import {Amplify} from 'aws-amplify';

Amplify.configure(outputs);

bootstrapApplication(Cmrp, cmrpConfig)
  .catch((err) => console.error(err));
