import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpaceShipMessageService {
    private subject = new Subject<any>();

    sendMessage(message: any) {
        this.subject.next({message:message});
    }

    clearMessages() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}

