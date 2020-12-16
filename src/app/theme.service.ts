import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private _theme = new BehaviorSubject<{ theme: string, darkness: boolean }>({ theme: 'teal', darkness: false });
    public theme = this._theme.asObservable();

    setTheme(theme: string, darkness: boolean = null) {
        this._theme.next({ theme: theme, darkness: darkness });
    }
}