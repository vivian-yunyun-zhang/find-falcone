import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlanetMessageService {
    private subject = new Subject<any>();

    sendMessage(act:string,message: string) {
        this.subject.next({act:act,message:message});
    }

    clearMessages() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
