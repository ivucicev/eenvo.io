import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ButtonAction {
  id: string;
  label: string;
  icon?: string;
  class?: string;
  action: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class ButtonActionService {
  private actionsSubject = new BehaviorSubject<ButtonAction[]>([]);
  actions$ = this.actionsSubject.asObservable();

  addAction(action: ButtonAction) {
    const currentActions = this.actionsSubject.getValue();
    this.actionsSubject.next([...currentActions, action]);
  }

  removeAction(actionId: string) {
    const currentActions = this.actionsSubject.getValue();
    this.actionsSubject.next(currentActions.filter(action => action.id !== actionId));
  }

  clearActions() {
    this.actionsSubject.next([]);
  }
}
