import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
    declarations:[
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective
        ],
    imports :[
    CommonModule,
    ReactiveFormsModule,
    FormsModule
    ],
    exports:[
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class SharedModule{

}