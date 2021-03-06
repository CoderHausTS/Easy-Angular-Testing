import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-button-toggle-ut',
  templateUrl: './button-toggle-ut.component.html',
  styleUrls: ['./button-toggle-ut.component.css']
})
export class ButtonToggleUtComponent implements OnInit {
  medForm: FormGroup;
  under13 = false;
  speakToParent = false;
  submitResult;

  constructor() {
    this.medForm = new FormGroup({
      ageGroup: new FormControl(''),
      legalGuardian: new FormControl(''),
      speakToParents: new FormControl(''),
      originCountry: new FormControl(''),
    });
  }

  ngOnInit() {
    this.medForm.removeControl('legalGuardian');
    this.medForm.removeControl('speakToParents');
  }

  onSubmit() {
    // console.log('form submitted ', this.medForm.value);
    this.submitResult = this.medForm.value;
    this.medForm.reset();
  }

  ageCheck() {
    const ageSelection = parseInt(this.medForm.controls.ageGroup.value, 10);

    // we would do this a bit differently in the "real world"
    if (ageSelection === 1) {
      if (this.medForm.contains('speakToParents')) {
        this.medForm.removeControl('speakToParents');
      }

      this.medForm.addControl('legalGuardian', new FormControl(''));
      this.under13 = true;
      this.speakToParent = false;
    } else if (ageSelection === 13) {
      if (this.medForm.contains('legalGuardian')) {
        this.medForm.removeControl('legalGuardian');
      }

      this.medForm.addControl('speakToParents', new FormControl(''));
      this.speakToParent = true;
      this.under13 = false;
    } else {
      this.under13 = false;
      this.speakToParent = false;
    }
  }
}
