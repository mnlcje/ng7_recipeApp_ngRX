import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeIemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RouterModule } from '@angular/router';
import { RecipeRoutingModule } from './recipes.routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations:[
        RecipesComponent,
        RecipeStartComponent,
        RecipeListComponent,
        RecipeIemComponent,
        RecipeDetailComponent,
        RecipeEditComponent
    ],
    imports:[
        RouterModule,
        RecipeRoutingModule,
        SharedModule
        ],
    exports:[]
})
export class RecipeModule
{

}

