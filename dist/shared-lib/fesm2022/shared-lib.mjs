import * as i0 from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import * as i1 from '@angular/common/http';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import * as i2$1 from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup, getIdToken, signOut } from '@angular/fire/auth';
import { jwtDecode } from 'jwt-decode';
import * as i2 from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import * as i3 from '@angular/material/snack-bar';
import { tap, catchError } from 'rxjs/operators';

const environment = {
    production: false,
    apiUri: 'https://localhost:7213/api',
    redirectUrl: 'http://localhost:4200',
    firebase: {
        apiKey: "AIzaSyDMjK-gQghxo1RMf6iFcc42nrktJdyUgZY",
        authDomain: "famous-sandbox-398111.firebaseapp.com",
        projectId: "famous-sandbox-398111",
        storageBucket: "famous-sandbox-398111.firebasestorage.app",
        messagingSenderId: "736847236700",
        appId: "1:736847236700:web:a3287e0dfdcde28e0c6099",
        measurementId: "G-Z65VKWN367"
    }
};

class BaseService {
    constructor(http, endpoint) {
        this.http = http;
        this.endpoint = endpoint;
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        };
    }
    getAll() {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.get(`${environment.apiUri}/${this.endpoint}`, this.httpOptions);
    }
    getById(id) {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.get(`${environment.apiUri}/${this.endpoint}/GetById/${id}`, this.httpOptions);
    }
    post(item) {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.post(`${environment.apiUri}/${this.endpoint}`, item, this.httpOptions);
    }
    put(item) {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.put(`${environment.apiUri}/${this.endpoint}`, item, this.httpOptions);
    }
    delete(id) {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.delete(`${environment.apiUri}/${this.endpoint}/${id}`, this.httpOptions);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BaseService, deps: [{ token: i1.HttpClient }, { token: String }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BaseService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: BaseService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [String]
                }] }] });

class AnswerService extends BaseService {
    constructor(http) {
        super(http, `Answer`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: AnswerService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: AnswerService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: AnswerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });

class AuthService {
    constructor(router, auth) {
        this.router = router;
        this.auth = auth;
        this.tokenKey = 'token';
        this.currentUser = null;
        const token = this.getToken();
        if (token && this.isTokenValid(token)) {
            this.setUserFromToken(token);
        }
        else {
            this.logout();
        }
    }
    authenticate(token) {
        localStorage.setItem(this.tokenKey, token);
        this.setUserFromToken(token);
    }
    setUserFromToken(token) {
        try {
            this.currentUser = jwtDecode(token);
        }
        catch (error) {
            console.error('Error decoding token:', error);
            this.currentUser = null;
        }
    }
    logout() {
        localStorage.removeItem(this.tokenKey);
        this.currentUser = null;
        this.router.navigate(['/Unlogged']);
    }
    isTokenValid(token) {
        try {
            const decoded = jwtDecode(token);
            return decoded.exp * 1000 > Date.now();
        }
        catch {
            return false;
        }
    }
    getToken() {
        return localStorage.getItem(this.tokenKey);
    }
    isAuthenticated() {
        const token = this.getToken();
        return !!token && this.isTokenValid(token);
    }
    async getFirebaseToken() {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(this.auth, provider);
        const user = result.user;
        return await getIdToken(user);
    }
    logoutGoogle() {
        const auth = this.auth;
        return signOut(auth);
    }
    getCurrentUser() {
        const token = this.getToken();
        if (token && this.isTokenValid(token)) {
            if (!this.currentUser) {
                this.setUserFromToken(token);
            }
            return this.currentUser;
        }
        return null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: AuthService, deps: [{ token: i2.Router }, { token: i2$1.Auth }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: AuthService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: AuthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i2.Router }, { type: i2$1.Auth }] });

class CategoryService extends BaseService {
    constructor(http) {
        super(http, `Category`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CategoryService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CategoryService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CategoryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });

class CompanyManagementService extends BaseService {
    constructor(http) {
        super(http, 'Company');
        this.http = http;
    }
    getMyCompany() {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.get(`${environment.apiUri}/Company/GetMyCompany`, this.httpOptions);
    }
    getCompanyUsers(companyId) {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.get(`${environment.apiUri}/Company/GetCompanyUsers/${companyId}`, this.httpOptions);
    }
    addUserToGroup(userId, groupId) {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.post(`${environment.apiUri}/Company/AddUserToGroup`, { userId, groupId }, this.httpOptions);
    }
    removeUserFromGroup(userId, groupId) {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.delete(`${environment.apiUri}/Company/RemoveUserFromGroup/${userId}/${groupId}`, this.httpOptions);
    }
    update(company) {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.put(`${environment.apiUri}/${this.endpoint}`, company, this.httpOptions);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CompanyManagementService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CompanyManagementService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CompanyManagementService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });

class CompanySubscriptionService extends BaseService {
    constructor(http) {
        super(http, `CompanySubscription`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CompanySubscriptionService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CompanySubscriptionService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CompanySubscriptionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });

class CompanyService extends BaseService {
    constructor(http) {
        super(http, `Company`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CompanyService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CompanyService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CompanyService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });

class CourseService extends BaseService {
    constructor(http) {
        super(http, `Course`);
    }
    saveComplete(courseComplete) {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.post(`${environment.apiUri}/${this.endpoint}/SaveComplete`, courseComplete, this.httpOptions);
    }
    getContents(courseId) {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.get(`${environment.apiUri}/${this.endpoint}/GetContents/${courseId}`, this.httpOptions);
    }
    searchCourses(searchParams) {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.post(`${environment.apiUri}/${this.endpoint}/Search`, searchParams, this.httpOptions);
    }
    purchaseCourse(courseId, companyId) {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.post(`${environment.apiUri}/${this.endpoint}/Purchase`, { CourseId: courseId, CompanyId: companyId }, this.httpOptions);
    }
    isCourseOwnedByCompany(courseId, companyId) {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.get(`${environment.apiUri}/${this.endpoint}/IsOwnedByCompany/${courseId}/${companyId}`, this.httpOptions);
    }
    getCourse(courseId) {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.get(`${environment.apiUri}/${this.endpoint}/GetById/${courseId}`, this.httpOptions);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CourseService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CourseService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CourseService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });

class CourseContentService extends BaseService {
    constructor(http) {
        super(http, `CourseContent`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CourseContentService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CourseContentService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CourseContentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });

class ExamService extends BaseService {
    constructor(http) {
        super(http, `Exam`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: ExamService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: ExamService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: ExamService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });

class GroupService extends BaseService {
    constructor(http) {
        super(http, `Group`);
        this.http = http;
    }
    getByCompanyId(companyId) {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.get(`${environment.apiUri}/Group/GetByCompanyId/${companyId}`, this.httpOptions);
    }
    create(group) {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.post(`${environment.apiUri}/Group`, group, this.httpOptions);
    }
    update(group) {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.put(`${environment.apiUri}/Group`, group, this.httpOptions);
    }
    deleteGroup(groupId) {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.delete(`${environment.apiUri}/Group/${groupId}`, this.httpOptions);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: GroupService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: GroupService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: GroupService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });

class MediaService extends BaseService {
    constructor(http) {
        super(http, `Media`);
    }
    uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        // Create a new headers object without Content-Type
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        // Use the new headers in the request
        return this.http.post(`${environment.apiUri}/${this.endpoint}/upload`, formData, { headers });
    }
    getFullUrl(relativeUrl) {
        // Check if it's already a full URL
        if (relativeUrl && (relativeUrl.startsWith('http://') || relativeUrl.startsWith('https://'))) {
            return relativeUrl;
        }
        // Check if it's a data URL
        if (relativeUrl && relativeUrl.startsWith('data:')) {
            return relativeUrl;
        }
        // Otherwise, construct full URL
        return relativeUrl ? `${environment.apiUri}${relativeUrl}` : '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: MediaService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: MediaService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: MediaService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });

class QuestionService extends BaseService {
    constructor(http) {
        super(http, `Question`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: QuestionService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: QuestionService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: QuestionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });

class RoleService extends BaseService {
    constructor(http) {
        super(http, `Role`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: RoleService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: RoleService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: RoleService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });

class SidenavService {
    constructor() {
        this.sidenavState = new BehaviorSubject(false);
        this.sidenavState$ = this.sidenavState.asObservable();
    }
    setSidenav(sidenav) {
        this.sidenav = sidenav;
    }
    open() {
        if (this.sidenav) {
            this.sidenav.open();
            this.sidenavState.next(true);
        }
    }
    close() {
        if (this.sidenav) {
            this.sidenav.close();
            this.sidenavState.next(false);
        }
    }
    toggle() {
        if (this.sidenav) {
            console.log('Toggling sidenav. Current state:', this.sidenav.opened);
            this.sidenav.toggle();
            console.log('New sidenav state:', this.sidenav.opened);
            this.sidenavState.next(this.sidenav.opened);
        }
        else {
            console.error('Sidenav reference is not set in SidenavService');
        }
    }
    isOpen() {
        return this.sidenav && this.sidenav.opened;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: SidenavService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: SidenavService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: SidenavService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class SpinnerService {
    constructor() {
        this.visibility = new BehaviorSubject(false);
    }
    show() {
        this.visibility.next(true);
    }
    hide() {
        this.visibility.next(false);
    }
    isVisible() {
        return this.visibility.getValue();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: SpinnerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: SpinnerService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: SpinnerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

class SubscriptionPlanService extends BaseService {
    constructor(http) {
        super(http, `SubscriptionPlan`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: SubscriptionPlanService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: SubscriptionPlanService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: SubscriptionPlanService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });

class TagService extends BaseService {
    constructor(http) {
        super(http, `Tag`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: TagService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: TagService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: TagService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });

class UserService extends BaseService {
    constructor(http) {
        super(http, `User`);
    }
    register(user, isCompany) {
        return this.http.post(`${environment.apiUri}/User/Register?isCompany=${isCompany}`, user, this.httpOptions);
    }
    login(credentials) {
        return this.http.post(`${environment.apiUri}/User/Login`, credentials, this.httpOptions);
    }
    loginGoogle(token) {
        const tokenRequest = { IdToken: token };
        return this.http.post(`${environment.apiUri}/User/LoginWithGoogle`, tokenRequest, this.httpOptions);
    }
    getAuthenticatedUser() {
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.get(`${environment.apiUri}/User/GetAuthenticatedUser`, this.httpOptions);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: UserService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: UserService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: UserService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });

class JwtUser {
    constructor(init) {
        Object.assign(this, init);
    }
}

class PaginationParams {
    constructor(init) {
        Object.assign(this, init);
    }
}

class AuthGuard {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivate() {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        else {
            this.router.navigate(['/Unlogged']);
            return false;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: AuthGuard, deps: [{ token: AuthService }, { token: i2.Router }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: AuthGuard, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: AuthGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: AuthService }, { type: i2.Router }] });

class RoleGuard {
    constructor(authService, router, snackBar) {
        this.authService = authService;
        this.router = router;
        this.snackBar = snackBar;
    }
    canActivate(route, state) {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/Login']);
            return false;
        }
        const user = this.authService.getCurrentUser();
        const requiredRole = route.data['role'];
        if (!user || !user.role || user.role !== requiredRole) {
            this.snackBar.open('Você não tem permissão para acessar esta página.', 'Fechar', {
                duration: 5000
            });
            this.router.navigate(['/Dashboard']);
            return false;
        }
        return true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: RoleGuard, deps: [{ token: AuthService }, { token: i2.Router }, { token: i3.MatSnackBar }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: RoleGuard, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: RoleGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: AuthService }, { type: i2.Router }, { type: i3.MatSnackBar }] });

class SpinnerInterceptor {
    constructor(spinnerService) {
        this.spinnerService = spinnerService;
        this.reqCount = 0;
    }
    intercept(req, next) {
        this.reqCount++;
        this.spinnerService.show();
        return next
            .handle(req)
            .pipe(tap((event) => {
            if (event instanceof HttpResponse) {
                this.reqCount--;
                if (this.reqCount <= 0) {
                    this.spinnerService.hide();
                    this.reqCount = 0;
                }
            }
        }, (error) => {
            this.reqCount--;
            if (this.reqCount <= 0) {
                this.spinnerService.hide();
                this.reqCount = 0;
            }
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: SpinnerInterceptor, deps: [{ token: SpinnerService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: SpinnerInterceptor }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: SpinnerInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: SpinnerService }] });

class SnackbarInterceptor {
    constructor(snackBar) {
        this.snackBar = snackBar;
    }
    intercept(request, next) {
        return next.handle(request).pipe(tap(e => {
            if (request.method == "POST" || request.method == "PUT")
                if (e instanceof HttpResponse && e.status == 200) {
                    this.snackBar.open('Saved successfully.', 'close', { duration: 2000, panelClass: 'successSnack' });
                }
        }), catchError(error => {
            this.snackBar.open('Error while saving.', 'close', { duration: 2000, panelClass: 'errorSnack' });
            return throwError(error);
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: SnackbarInterceptor, deps: [{ token: i3.MatSnackBar }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: SnackbarInterceptor }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: SnackbarInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i3.MatSnackBar }] });

/*
 * Public API Surface of shared-lib
 */
// Services

/**
 * Generated bundle index. Do not edit.
 */

export { AnswerService, AuthGuard, AuthService, BaseService, CategoryService, CompanyManagementService, CompanyService, CompanySubscriptionService, CourseContentService, CourseService, ExamService, GroupService, JwtUser, MediaService, PaginationParams, QuestionService, RoleGuard, RoleService, SidenavService, SnackbarInterceptor, SpinnerInterceptor, SpinnerService, SubscriptionPlanService, TagService, UserService };
//# sourceMappingURL=shared-lib.mjs.map
