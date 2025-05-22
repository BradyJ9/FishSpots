import { ChangeDetectorRef, Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule} from '@angular/material/icon';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatButtonModule } from "@angular/material/button";
import { CatchDto } from "../../../model/dto/CatchDto";
import { AddCatchBarComponent } from "../add-catch-bar/add-catch-bar.component";
import { CommonModule } from "@angular/common";

@Component ({
    selector: 'add-outing-dialog',
    templateUrl: './add-outing-dialog.component.html',
    styleUrl: './add-outing-dialog.component.css',
    imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule,
         MatTimepickerModule, ReactiveFormsModule, MatButtonModule, AddCatchBarComponent,
        CommonModule]
})

export class AddOutingDialogComponent {
    public outingForm: FormGroup = new FormGroup({
        notes: new FormControl(''),
        date: new FormControl('', Validators.required),
        startTime: new FormControl(''),
        endTime: new FormControl('')
    });

    public catchesToAdd: CatchDto[] = [];

    constructor(private cdr: ChangeDetectorRef) {}

    public addCatchToOutingForm = () => {
        console.log(this.catchesToAdd.length);
        if (this.catchesToAdd.length < 10) {
            let newCatch: CatchDto = {} as CatchDto;
            this.catchesToAdd.push(newCatch);
        }
        this.cdr.detectChanges();
    }

    public removeCatchFromOutingForm = (index: number) => {
        console.log("REMOVING " + index);
        console.log(this.catchesToAdd);
        this.catchesToAdd = this.catchesToAdd.filter((_, i) => i !== index);
        this.cdr.detectChanges();
    }

    public onSubmit() {

    }

    public onCancel() {

    }
}