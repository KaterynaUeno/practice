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
  activeDay: WritableSignal<DateTime| null> = signal(null);
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
    activeDayMeetings: Signal<string[]> = computed(() => {
    const activeDay = this.activeDay();
    if (activeDay === null) {
      return []
    }
    const activeDayISO = activeDay.toISODate();
     if (!activeDayISO){
      return [];
    }
    return this.meetings()[activeDayISO] ?? [];
  });

DATE_MED = DateTime.DATE_MED;

gotToNextMonth(): void {
  this.firstDateOfActiveMonth.
  set(this.firstDateOfActiveMonth().plus({ month: 1 }))
}

goToPreviousMonth(): void {
  this.firstDateOfActiveMonth.
  set(this.firstDateOfActiveMonth().minus({ month: 1 }))
}


stayToday():void {
  this.activeDay.set(this.today());
  this.firstDateOfActiveMonth.set(this.today().startOf('month'));

}

constructor() {
  console.log(this.daysOfMonth())
}
}
