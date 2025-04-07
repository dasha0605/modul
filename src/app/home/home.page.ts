import { Component } from '@angular/core';
import { CourseCalculatorService } from '../services/course-calculator.service';
import { IonicModule } from '@ionic/angular';
import { CourseInputComponent } from '../components/course-input/course-input/course-input.component';
import { CourseResultComponent } from '../components/course-result/course-result/course-result.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, CourseInputComponent, CourseResultComponent]
})
export class HomePage {
  calculationResult?: any;

  constructor(private calculator: CourseCalculatorService) {}

  handleSubmit(courses: any) {
    this.calculationResult = this.calculator.calculateTotal(courses);
  }
}
