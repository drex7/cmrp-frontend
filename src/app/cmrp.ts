import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Amplify} from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './cmrp.html',
  styleUrl: './cmrp.css'
})
export class Cmrp {
  constructor() {
    Amplify.configure(outputs);
  }

  // protected destroy$ = new Subject<void>();
  // protected breakpointObserver = inject(BreakpointObserver);
  // protected isSmallerScreen = signal(false)
  //
  // // isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
  //
  // constructor() {
  //     this.breakpointObserver
  //         .observe([Breakpoints.Handset, Breakpoints.Tablet])
  //         .pipe(
  //             takeUntil(this.destroy$),
  //             map(res => res.matches),
  //         ).subscribe(res => {
  //         this.isSmallerScreen.set(res);
  //     })
  // }
  //
  // ngOnDestroy() {
  //     this.destroy$.next()
  //     this.destroy$.complete()
  // }
}
