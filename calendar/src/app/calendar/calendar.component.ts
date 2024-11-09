import {
  Component,
  InputSignal,
  Signal,
  WritableSignal,
  computed,
  input,
  signal,
} from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';
import { CommonModule } from '@angular/common';
import { Meetings } from './meetings.interface';



@Component ({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  standalone: true,
  imports: [CommonModule]
})

export class CalendarComponent{

  meetings: InputSignal<Meetings> = input.required();
  activeDay: WritableSignal<DateTime | null> = signal(null);
  today: Signal<DateTime> = signal(DateTime.now());
  firstDateOfActiveMonth: WritableSignal<DateTime> = signal(this.today().startOf('month'));
  weekDays : Signal<string[]> = signal(Info.weekdays('long'));
  daysOfMonth: Signal<DateTime[]> = computed(() =>{
  return Interval.fromDateTimes(
    this.firstDateOfActiveMonth().startOf('week'),
    this.firstDateOfActiveMonth().endOf('month').endOf('week'),
  ).splitBy({day:1}).map((day) => {
    if(day.start === null ) {
      throw new Error ('invalid day')
    }
    return day.start;
  })
})


DATE_MED = DateTime.DATE_MED;

constructor() {
  console.log(this.daysOfMonth())
}
}
