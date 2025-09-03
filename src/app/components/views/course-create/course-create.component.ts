import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-create',
  standalone: false,
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss']
})
export class CourseCreateComponent implements OnInit {
  courseForm: FormGroup;
  aiAssistForm: FormGroup;
  suggestion: any = null;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      keywords: ['']
    });

    this.aiAssistForm = this.fb.group({
      topic: ['', Validators.required],
      contentSummary: ['', Validators.required]
    });
  }

  onSubmitAiAssist() {
    /* if (this.aiAssistForm.valid) {
      // Simulate AI suggestion
      const topic = this.aiAssistForm.get('topic').value;
      
      setTimeout(() => {
        this.suggestion = {
          title: `Master ${topic}`,
          description: `A comprehensive course covering all aspects of ${topic} for professionals looking to enhance their skills.`,
          keywords: `${topic}, professional, skills, training`
        };
        
        this.courseForm.patchValue(this.suggestion);
      }, 1500);
    } */
  }

  onSaveCourse() {
    if (this.courseForm.valid) {
      console.log('Course saved:', this.courseForm.value);
      // Add logic to save course
    }
  }

  onDiscardCourse() {
    this.courseForm.reset();
    this.suggestion = null;
  }
}