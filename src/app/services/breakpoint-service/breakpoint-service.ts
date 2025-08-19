import {inject, Injectable, OnDestroy, signal} from '@angular/core';
import {map, Subject, takeUntil} from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService implements OnDestroy {
  public isSmallerScreen = signal(false)
  protected destroy$ = new Subject<void>();
  protected breakpointObserver = inject(BreakpointObserver);
  public isSmallScreen = this.breakpointObserver.isMatched('(max-width: 1025px)');

  constructor() {
    this.breakpointObserver
      .observe('(max-width: 1024px)')
      .pipe(
        takeUntil(this.destroy$),
        map(res => res.matches),
      ).subscribe(res => {
      this.isSmallerScreen.set(res);
    })
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
