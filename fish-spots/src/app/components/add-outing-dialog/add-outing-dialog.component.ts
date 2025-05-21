import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDatepicker, MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInput, MatInputModule } from "@angular/material/input";
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { MatTimepicker, MatTimepickerModule } from '@angular/material/timepicker';

@Component ({
    selector: 'add-outing-dialog',
    templateUrl: './add-outing-dialog.component.html',
    styleUrl: './add-outing-dialog.component.css',
    imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule, MatTimepickerModule, ReactiveFormsModule]
})

export class AddOutingDialogComponent {
    public outingForm: FormGroup = new FormGroup({
        notes: new FormControl(''),
        date: new FormControl('', Validators.required),
        startTime: new FormControl(''),
        endTime: new FormControl('')
    });

    constructor() {}
}