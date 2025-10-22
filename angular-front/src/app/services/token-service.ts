import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { Auth } from '../interfaces/Auth';

type StorageType = 'indexeddb' | 'session' | 'memory';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    inMemoryToken: string | null = null;

    DB_NAME = 'auth-db';
    STORE_NAME = 'tokens';
    dbPromise: ReturnType<typeof openDB> | null = null;
    currentStorage: StorageType | null = null;
    tokenKey = 'access_token';

    async isIndexedDBAvailable(): Promise<boolean> {
        if (!('indexedDB' in window)) return false;
        try {
            const db = await openDB(this.DB_NAME, 1, {
                upgrade: (db) => db.createObjectStore(this.STORE_NAME),
            });
            await db.put(this.STORE_NAME, 'test', 'test_key');
            await db.delete(this.STORE_NAME, 'test_key');
            return true;
        } catch {
            return false;
        }
    }

    async init() {
        const supported = await this.isIndexedDBAvailable();
        if (supported) {
            this.dbPromise = openDB(this.DB_NAME, 1);
            this.currentStorage = 'indexeddb';
        } else if (typeof sessionStorage !== 'undefined') {
            this.currentStorage = 'session';
        } else {
            this.currentStorage = 'memory';
        }
    }

    async setToken(token: Auth | null) {
        if (!this.currentStorage) await this.init();
        const json = token ? JSON.stringify(token) : null;

        switch (this.currentStorage) {
            case 'indexeddb':
                if (json) {
                    (await this.dbPromise!).put(this.STORE_NAME, json, this.tokenKey);
                } else {
                    (await this.dbPromise!).delete(this.STORE_NAME, this.tokenKey);
                }
                break;
            case 'session':
                if (json) {
                    sessionStorage.setItem(this.tokenKey, json);
                } else {
                    sessionStorage.removeItem(this.tokenKey);
                }
                break;
            case 'memory':
                this.inMemoryToken = json;
                break;
        }
    }

    async getToken(): Promise<Auth | null> {
        if (!this.currentStorage) await this.init();
        let json: string | null = null;

        switch (this.currentStorage) {
            case 'indexeddb':
                json = await (await this.dbPromise!).get(this.STORE_NAME, this.tokenKey);
                break;
            case 'session':
                json = sessionStorage.getItem(this.tokenKey);
                break;
            case 'memory':
                json = this.inMemoryToken;
                break;
        }

        return json ? JSON.parse(json) : null;
    }

    async clearToken(): Promise<void> {
        await this.setToken(null);
    }
}
