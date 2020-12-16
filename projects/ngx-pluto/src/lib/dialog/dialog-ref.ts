import { Subject, Observable } from "rxjs";

/**
 * @ignore
 */
export class DialogRef {
    private readonly _afterClosed = new Subject<any>();
    afterClosed: Observable<any> = this._afterClosed.asObservable();

    constructor() { }

    close(result?: any) {
        this._afterClosed.next(result);
    }
}