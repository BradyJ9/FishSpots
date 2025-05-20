import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDatepicker, MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInput, MatInputModule } from "@angular/material/input";

@Component ({
    selector: 'add-outing-dialog',
    templateUrl: './add-outing-dialog.component.html',
    styleUrl: './add-outing-dialog.component.css',
    imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule]
})

export class AddOutingDialogComponent {
    constructor() {}
}