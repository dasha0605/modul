import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CalculationResult } from '../../../services/course-calculator.service';

@Component({
  selector: 'app-course-result',
  templateUrl: './course-result.component.html',
  styleUrls: ['./course-result.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class CourseResultComponent {
  @Input() result?: CalculationResult;
}