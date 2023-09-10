'use strict';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Action,
  NgxsOnInit,
  Selector,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { UtilService } from '../utils/util.service';
import { AtualizarLoading } from './main.actions';

export interface MainStateModel {
  loading: boolean;
}

export class MainStateModel implements MainStateModel {
  constructor(loading: boolean = false) {
    this.loading = UtilService.isEmpty(loading) ? false : loading;
  }
}

export const MAIN_STATE_DEFAULTS = new MainStateModel();
export const MAIN_STATE_TOKEN = new StateToken<MainStateModel>('Main');

@State({
  name: MAIN_STATE_TOKEN,
  defaults: MAIN_STATE_DEFAULTS,
})
@Injectable()
export class MainState implements NgxsOnInit {
  @Selector() static loading(state: MainStateModel) {
    return state.loading;
  }

  constructor(private _snackBar: MatSnackBar) {}

  ngxsOnInit(ctx?: StateContext<MainStateModel>) {}

  @Action(AtualizarLoading)
  atualizarLoading(
    ctx: StateContext<MainStateModel>,
    action: AtualizarLoading
  ) {
    const state: MainStateModel = { ...ctx.getState() } as MainStateModel;
    const loading = UtilService.isEmpty(action?.ativar)
      ? false
      : action?.ativar;
    state.loading = loading ? true : false;
    ctx.setState(state);
  }
}
