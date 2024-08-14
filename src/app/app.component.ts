import { Component, OnInit } from '@angular/core';
import { MasterService } from './master.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  data!: any[];
  employeeHours: { [key: string]: number } = {}; 

  constructor(private readonly _master: MasterService) {}

  ngOnInit(): void {
    this.getAllDetailsRepidd();
  }

  getAllDetailsRepidd() {
    this._master.getAllDetails().subscribe(res => {
      this.data = res;
      this.calculateHours(this.data);
    });
  }

  calculateHours(data: any[]): void {
 
    const hours: { [key: string]: number } = {};

    data.forEach(entry => {
      if (entry.EmployeeName) {
        const start = new Date(entry.StarTimeUtc);
        const end = new Date(entry.EndTimeUtc);
        const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

        if (!hours[entry.EmployeeName]) {
          hours[entry.EmployeeName] = 0;
        }
        hours[entry.EmployeeName] += duration;
      }
    });

    this.employeeHours = hours;
  }
  getEmployeeNames(): string[] {
    return Object.keys(this.employeeHours);
  }

  isUnder100Hours(name: string): boolean {
    return this.employeeHours[name] < 100;
  }
}
