import { loadRemoteModule } from '@angular-architects/native-federation';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MicrofrontendService {

  constructor() { }

  async loadRemoteComponent(remoteName: string) {
    try {
      return await loadRemoteModule({
        exposedModule: './Component',
        remoteName: remoteName,
        // remoteEntry: `http://localhost:${port}/remoteEntry.js`,
        fallback: 'Unathorized'

      })
    } catch (error) {
      console.error(`Error loading ${remoteName} component:`, error);
      throw error;
    }  
  }
}
