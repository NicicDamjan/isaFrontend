import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';

/**
 * Handles local storage functions
 * @author Mudrinic
 */
@Injectable()
export class LocalStorageService {

  /**
   * Getting jwt token from storage
   */
  getToken(): String {
    return localStorage.getItem('token');
  }

  /**
   * Setting up jwt token to storage
   * @param token 
   */
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  /**
   * Getting user data from storage
   */
  getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Retriving selected attribute from currently user
   * @param attr 
   */
  getUserAttr(attr: string) {
    return this.getUser[attr] || null;
  }

  /**
   * Setting up user data to storage
   * @param user 
   */
  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Destroying jwt token from storage
   */
  destroyToken() {
    localStorage.removeItem('token');
  }

  /**
   * Setting storage after login method
   * @param user 
   * @param token 
   */
  setUser(user: User, token: string) {
    this.saveToken(token);
    this.saveUser(user);
  }

  /**
   * Clearing storage after logout event
   */
  logoutUser() {
    localStorage.clear();
  }
}
