import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  set(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify({ value }));
  }

  setJson(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getJson(key: string): any{
    return JSON.parse(this.storage.getItem(key) || '');
  }

  get<T>(key: string): T | null;
  get<T>(key: string, otherwise: T): T;
  get<T>(key: string, otherwise?: T): T | null {
    const data: string | null = localStorage.getItem(key);

    if (data !== null) {
      return JSON.parse(data).value;
    }

    if (otherwise) {
      return otherwise;
    }

    return null;
  }
}
