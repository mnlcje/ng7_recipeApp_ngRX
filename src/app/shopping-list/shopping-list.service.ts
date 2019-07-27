import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService
{
    //Eventemitter Approach for cross Componenet Communication
    //ingredientsAdded = new EventEmitter<Ingredient[]>();

    //Subject Approach for cross Componenet Communication
    ingredientsChanged = new Subject<Ingredient[]>();
    ingredientSelectedForEditing = new Subject<number>();

    private ingredients : Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ]; 

      public getIngredients()
      {
          //Return a copy of ingredient array. Slice method returns new Array object
          return this.ingredients.slice();
      }

      public getingredientsById(index:number)
      {
          return this.ingredients[index];
      }

      public addIngredient(ingredient: Ingredient)
      {
          this.ingredients.push(ingredient);
          //Eventemitter Approach - Emit a copy of the updated ingredient array
          //this.ingredientsAdded.emit(this.ingredients.slice());

          //Subject Approach - Emit a copy of the updated ingredient array
          this.ingredientsChanged.next(this.ingredients.slice());      
      }

      public addIngreddients(ingredients:Ingredient[])
      {
          this.ingredients.push(...ingredients);
          //Eventemitter Approach - Emit a copy of the updated ingredient array
          //this.ingredientsAdded.emit(this.ingredients.slice());  
          
          //Subject Approach - Emit a copy of the updated ingredient array
          this.ingredientsChanged.next(this.ingredients.slice());          
      }

      public updateIngredient(selIndex:number,editedIngredient:Ingredient)
      {
          this.ingredients[selIndex] = editedIngredient;
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      public deleteIngredient(selIndex:number)
      {
          this.ingredients.splice(selIndex,1);
          this.ingredientsChanged.next(this.ingredients.slice());
      }
    
}