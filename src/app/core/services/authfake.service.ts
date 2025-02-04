import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthfakeauthenticationService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    /**
     * current user
     */
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string) {
        return this.http.post<any>(`/users/authenticate`, { email, password }).pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {                    
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('toast', 'true');
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }
            return user;
        }));
    }

    /**
     * Logout the user
     */
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null!);
    }
}
