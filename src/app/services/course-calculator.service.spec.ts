import { TestBed } from '@angular/core/testing';
import { CourseCalculatorService } from './course-calculator.service';
import { Course } from './course-calculator.service';

describe('CourseCalculatorService', () => {
  let service: CourseCalculatorService;

 
  const createCourse = (
    type: 'ліцензійний' | 'магістерський' | 'науковий', 
    difficulty: 'легкий' | 'середній' | 'складний'
  ): Course => ({ type, difficulty });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate base cost correctly', () => {
    const courses: Course[] = [
      createCourse('ліцензійний', 'легкий'),
      createCourse('магістерський', 'середній')
    ];
    const result = service.calculateTotal(courses);
    expect(result.totalCost).toBe(300); // 100 + 200
  });

  it('should apply 10% discount for >5 courses', () => {
    const courses: Course[] = Array(6).fill(createCourse('ліцензійний', 'легкий'));
    const result = service.calculateTotal(courses);
    expect(result.discount).toBe(10);
    expect(result.totalCost).toBe(600);
    expect(result.finalCost).toBe(540); // 600 - 10%
  });

  it('should apply 15% surcharge per difficult course', () => {
    const courses: Course[] = [
      createCourse('ліцензійний', 'складний'),
      createCourse('ліцензійний', 'складний'),
      createCourse('ліцензійний', 'легкий')
    ];
    const result = service.calculateTotal(courses);
    expect(result.surcharge).toBe(30); // 2 × 15%
    expect(result.finalCost).toBe(390); // (100×3) + 30%
    expect(result.difficultCoursesCount).toBe(2);
  });

  it('should combine discount and surcharge correctly', () => {
    const courses: Course[] = [
      createCourse('науковий', 'складний'),
      createCourse('науковий', 'складний'),
      createCourse('магістерський', 'легкий'),
      createCourse('ліцензійний', 'легкий'),
      createCourse('ліцензійний', 'легкий'),
      createCourse('ліцензійний', 'легкий')
    ];
    const result = service.calculateTotal(courses);
    expect(result.finalCost).toBe(1287);
  });
});