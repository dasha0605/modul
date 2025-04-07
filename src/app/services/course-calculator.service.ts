import { Injectable } from '@angular/core';

export interface Course {
  type: 'ліцензійний' | 'магістерський' | 'науковий';
  difficulty: 'легкий' | 'середній' | 'складний';
}

export interface CalculationResult {
  totalCost: number;
  discount: number;
  surcharge: number;
  finalCost: number;
  difficultCoursesCount: number; 
}

@Injectable({
  providedIn: 'root'
})
export class CourseCalculatorService {
  private rates = {
    'ліцензійний': 100,
    'магістерський': 200,
    'науковий': 300
  };

  calculateTotal(courses: Course[]): CalculationResult {
    let totalCost = 0;
    let difficultCoursesCount = 0;

 
    courses.forEach(course => {
      totalCost += this.rates[course.type];
      if (course.difficulty === 'складний') {
        difficultCoursesCount++;
      }
    });

  
    const discount = courses.length > 5 ? 0.1 : 0;
    const surchargePerDifficultCourse = 0.15; 
    const totalSurcharge = difficultCoursesCount * surchargePerDifficultCourse;

   
    const discounted = totalCost * (1 - discount);
    const finalCost = discounted * (1 + totalSurcharge);

    return {
      totalCost,
      discount: discount * 100,
      surcharge: totalSurcharge * 100,
      finalCost,
      difficultCoursesCount
    };
  }
}