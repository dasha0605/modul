import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

export interface Course {
  type: 'ліцензійний' | 'магістерський' | 'науковий';
  difficulty: 'легкий' | 'середній' | 'складний';
}

@Component({
  selector: 'app-course-input',
  templateUrl: './course-input.component.html',
  styleUrls: ['./course-input.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class CourseInputComponent {
  @Output() submitData = new EventEmitter<Course[]>();
  
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      courseCount: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      courses: this.fb.array([])
    });

    this.generateCourses();
    
    this.form.get('courseCount')?.valueChanges.subscribe(() => {
      this.generateCourses();
    });
  }

  get courses() {
    return this.form.get('courses') as FormArray;
  }

  generateCourses() {
    const count = this.form.get('courseCount')?.value;
    this.courses.clear();
    
    for (let i = 0; i < count; i++) {
      this.courses.push(this.fb.group({
        type: ['ліцензійний', Validators.required],
        difficulty: ['легкий', Validators.required]
      }));
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitData.emit(this.form.value.courses);
    }
  }
}