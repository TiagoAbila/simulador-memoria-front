import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  @Input() tempo: number = 0;
  @Output() tempoRetornado = new EventEmitter<number>();

  ngOnInit(): void {
    if(this.tempo > 0) {
      const source = timer(1000, 1000);
      const abc = source.subscribe(val => {
        if(this.tempo >= 0) {
          this.tempoRetornado.emit(this.tempo--);
        }
      });
    }
  }
}
