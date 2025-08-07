import {bootstrapApplication} from '@angular/platform-browser';
import {cmrpConfig} from './app/cmrp.config';
import {Cmrp} from './app/cmrp';

bootstrapApplication(Cmrp, cmrpConfig)
  .catch((err) => console.error(err));
