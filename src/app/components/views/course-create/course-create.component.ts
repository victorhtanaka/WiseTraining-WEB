import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';

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
  getMediaGroup(content: AbstractControl): FormGroup {
    return content.get('media') as FormGroup;
  }

  get contents(): FormArray {
    return this.courseForm.get('contents') as FormArray;
  }
  get media(): FormGroup {
    return this.courseForm.get('media') as FormGroup;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      keywords: [''],
      duration: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      language: [''],
      media: this.fb.group({
        url: ['', Validators.required],
        type: ['', Validators.required]
      }),
      contents: this.fb.array([])
    });

    this.aiAssistForm = this.fb.group({
      topic: ['', Validators.required],
      contentSummary: ['', Validators.required]
    });
  }

  addContent() {
    this.contents.push(this.fb.group({
      order: [this.contents.length + 1, Validators.required],
      title: ['', Validators.required],
      textContent: [''],
      duration: [0, [Validators.required, Validators.min(1)]],
      media: this.fb.group({
        url: [''],
        type: ['']
      })
    }));
  }

  removeContent(index: number) {
    this.contents.removeAt(index);
  }

  onSaveCourse() {
    if (this.courseForm.valid) {
      // TODO: Implement save logic
      const courseData = this.courseForm.value;
      console.log('Course data:', courseData);
    }
  }

  onDiscardCourse() {
    this.courseForm.reset();
    this.suggestion = null;
    while (this.contents.length) {
      this.contents.removeAt(0);
    }
  }
}