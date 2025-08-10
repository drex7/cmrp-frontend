import {bootstrapApplication} from '@angular/platform-browser';
import {cmrpConfig} from './app/cmrp.config';
import {Cmrp} from './app/cmrp';
import {Amplify} from 'aws-amplify';
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);

bootstrapApplication(Cmrp, cmrpConfig)
  .catch((err) => console.error(err));
