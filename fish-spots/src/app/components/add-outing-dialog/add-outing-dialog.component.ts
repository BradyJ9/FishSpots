import { ChangeDetectorRef, Component, ViewEncapsulation } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule} from '@angular/material/icon';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatButtonModule } from "@angular/material/button";
import { CatchDto } from "../../../model/dto/CatchDto";
import { AddCatchBarComponent } from "../add-catch-bar/add-catch-bar.component";
import { CommonModule } from "@angular/common";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { OutingFormData } from "../../../model/dto/OutingFormData";

@Component ({
    selector: 'add-outing-dialog',
    templateUrl: './add-outing-dialog.component.html',
    styleUrl: './add-outing-dialog.component.css',
    imports: [MatDialogModule,MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule,
         MatTimepickerModule, ReactiveFormsModule, MatButtonModule, AddCatchBarComponent,
        CommonModule],
    encapsulation: ViewEncapsulation.None
})

export class AddOutingDialogComponent {
    public outingForm!: FormGroup;
    maxDate: Date = new Date();

    constructor(private cdr: ChangeDetectorRef, private dialogRef: MatDialogRef<AddOutingDialogComponent>) {}

    private timeRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
        const group = control as FormGroup;
        const startTime = group.controls['startTime'].value;
        const endTime = group.controls['endTime'].value;

        if (startTime && endTime && startTime >= endTime) {
            return { invalidTimeRange: true };
        }
        return null;
    }

    public catchesToAdd: CatchDto[] = [];

    ngOnInit() {
        this.outingForm = new FormGroup({
            notes: new FormControl('', [Validators.maxLength(500)]),
            date: new FormControl('', [Validators.required]),
            startTime: new FormControl(''),
            endTime: new FormControl('')
        }, { validators: this.timeRangeValidator });
    }

    public addCatchToOutingForm = () => {
        if (this.catchesToAdd.length < 10) {
            let newCatch: CatchDto = { species: '', catchWeight: 0, catchLength: 0 } as CatchDto; // Initialize with default values
            this.catchesToAdd.push(newCatch);
        }
        this.cdr.detectChanges();
    }

    public updateCatchDto = (newCatch : CatchDto, index: number) => {
        console.log("updating catch: " + newCatch.species );
        this.catchesToAdd[index] = newCatch;
    }

    public removeCatchFromOutingForm = (index: number) => {
        this.catchesToAdd = this.catchesToAdd.filter((_, i) => i !== index);
        this.cdr.detectChanges();
    }

    public onSubmit = () => {
        if (this.catchesToAdd && this.catchesToAdd.some(catchItem => !catchItem.species || catchItem.species.trim() === '')) {
            alert('All catches must have a species specified.');
            return;
        }

        const formData: OutingFormData = {
            date: this.outingForm.controls['date'].value,
            startTime: this.outingForm.controls['startTime'].value,
            endTime: this.outingForm.controls['endTime'].value,
            catches: this.catchesToAdd,
            notes: this.outingForm.controls['notes'].value
        };

        this.dialogRef.close(formData);
    }

    public onCancel() {
        this.dialogRef.close(null);
    }
}