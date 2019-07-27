import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('shoppingEditForm') shoppingEditForm : NgForm;
  subscriptionForIngEditing : Subscription;
  editMode = false;
  editedIngIndex:number;
  editedIngredient:Ingredient;

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
    this.subscriptionForIngEditing = this.shoppingListService.ingredientSelectedForEditing
          .subscribe((selItemIndex:number)=>{
            this.editMode = true;
            this.editedIngIndex = selItemIndex;
            this.editedIngredient = this.shoppingListService.getingredientsById(selItemIndex);
            this.shoppingEditForm.setValue({
              name : this.editedIngredient.name,
              amount: this.editedIngredient.amount
            })
          }); 

  }

  onSubmit(){
   const newIngredient = new Ingredient(this.shoppingEditForm.value.name,this.shoppingEditForm.value.amount);
   if(this.editMode)
   {
     this.shoppingListService.updateIngredient(this.editedIngIndex,newIngredient);
   }
   else
   {
    this.shoppingListService.addIngredient(newIngredient);
   }
   this.editMode = false;
   this.shoppingEditForm.reset();
  }

  onClear()
  {
     this.shoppingEditForm.reset();
     this.editMode = false;
  }

  onDelete(selIndex:number)
  {
    this.shoppingListService.deleteIngredient(selIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscriptionForIngEditing.unsubscribe();
  }

}

