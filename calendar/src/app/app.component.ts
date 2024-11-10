import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'calendar';
  meetings = {
    '2024-11-08': ['Meeting 1', 'Meeting 2'],
    '2024-11-14': ['Meeting 3'],
    '2024-11-22': ['Meeting 4', 'Meeting 5'],
    '2024-11-24': ['Meeting 4', 'Meeting 5']
  }
}
