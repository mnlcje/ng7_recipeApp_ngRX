import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';

const route : Routes = [
{
    path:'', component:AuthComponent
}
];

@NgModule({
    imports:[RouterModule.forChild(route)],
    exports:[RouterModule]
})
export class AuthRoutingModule{

}