import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, getIdToken, signOut  } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { JwtUser } from '../models/jwt-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'token';
  private currentUser: JwtUser | null = null;

  constructor(private readonly router: Router, private readonly auth: Auth) {
    const token = this.getToken();
    if (token && this.isTokenValid(token)) {
      /* this.setUserFromToken(token); */
    } else {
      this.logout();
    }
  }

  authenticate(token: string) {
    localStorage.setItem(this.tokenKey, token);
    /* this.setUserFromToken(token); */
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.currentUser = null;
    this.router.navigate(['/Unlogged']);
  }

  /* private setUserFromToken(token: string) {
    try {
      const decoded = jwtDecode<JwtUser>(token);
      this.currentUser = decoded;
    } catch (e) {
      console.error('Failed to decode JWT token:', e);
      this.currentUser = null;
    }
  } */

  private isTokenValid(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtUser>(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  getUser(): JwtUser | null {
    return this.currentUser;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && this.isTokenValid(token);
  }

  async getFirebaseToken(): Promise<string | null> {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    const user = result.user;

    return await getIdToken(user);
  }

  logoutGoogle() {
    const auth = this.auth;
    return signOut(auth);
  }
}
