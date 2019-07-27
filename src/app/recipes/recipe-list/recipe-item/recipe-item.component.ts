import { Component, Input} from "@angular/core";
import { Recipe } from '../../recipes.model';

@Component({
selector:'app-recipe-item',
templateUrl:'./recipe-item.component.html'
})
export class RecipeIemComponent{
    
    @Input() recipe:Recipe;
    @Input() curRecipeIndex : number;

    constructor()
    {

    }
    
}