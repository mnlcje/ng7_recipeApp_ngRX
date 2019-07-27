import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients : Ingredient[];
  igAddedSubs : Subscription;

  constructor(private shoppingListService : ShoppingListService){
  }

  ngOnInit()
  {
    this.ingredients =  this.shoppingListService.getIngredients();
    this.igAddedSubs =  this.shoppingListService.ingredientsChanged.subscribe((ingredients:Ingredient[])=>{
      this.ingredients = ingredients
    });    
  } 

  onEditItem(selItemIndex:number)
  {
    this.shoppingListService.ingredientSelectedForEditing.next(selItemIndex);
  }
  
  ngOnDestroy()
  {
    //When Using Subject we need to explicitly Unsubscribe when Component is destroyed
    this.igAddedSubs.unsubscribe();
  }
}


