import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MicrofrontendService } from './microfrontend.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'movie-ticket-host';

  @ViewChild('movieapp', { read: ViewContainerRef, static: true }) listContainer!: ViewContainerRef;
  @ViewChild('ticketapp', { read: ViewContainerRef, static: true }) ticketContainer!: ViewContainerRef;

  private movieAppComponentRef: ComponentRef<any> | null = null;
  private ticketAppComponentRef: ComponentRef<any> | null = null;

  constructor(private microfrontendService: MicrofrontendService) { }

  async ngOnInit() {
    try {
      // 1. Load movieapp
      const movieappModule = await this.microfrontendService.loadRemoteComponent('movieapp');
      this.listContainer.clear();
      this.movieAppComponentRef = this.listContainer.createComponent(movieappModule.AppComponent);

      // 2. Subscribe to the 'movieSelected' Output from movieapp's AppComponent
      if (this.movieAppComponentRef.instance.movieSelected) {
        this.movieAppComponentRef.instance.movieSelected.subscribe((movieId: number) => {
          console.log(`Host received movie ID: ${movieId} from movieapp`);
          // 3. Pass the movie ID as an Input to ticketapp's AppComponent
          if (this.ticketAppComponentRef) {
            this.ticketAppComponentRef.instance.receivedMovieId = movieId;
            this.ticketAppComponentRef.changeDetectorRef.detectChanges();
          }
        });
      }
      this.movieAppComponentRef.changeDetectorRef.detectChanges();

      // 4. Load ticketapp
      const ticketappModule = await this.microfrontendService.loadRemoteComponent('ticketapp');
      this.ticketContainer.clear();
      this.ticketAppComponentRef = this.ticketContainer.createComponent(ticketappModule.AppComponent);
      this.ticketAppComponentRef.changeDetectorRef.detectChanges();

    } catch (error) {
      console.error('Error loading remote components:', error);
    }
  }

  ngOnDestroy() {
    if (this.movieAppComponentRef) {
      this.movieAppComponentRef.destroy();
    }
    if (this.ticketAppComponentRef) {
      this.ticketAppComponentRef.destroy();
    }
  }
  
}
