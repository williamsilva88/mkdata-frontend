import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { MainState } from 'src/app/state/main.state';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  private _unsubscribeAll = new Subject<void>();
  loading: boolean = false;
  constructor(private _store: Store) {}

  ngOnInit(): void {
    this.monitoringState();
  }

  monitoringState() {
    this._store
      .select(MainState.loading)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data: boolean) => {
        this.loading = data;
      });
  }
}
