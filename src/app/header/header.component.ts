import {Component,EventEmitter, Output, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from '../recipes/recipes.model';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipes/recipes.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl:'./header.component.html',
    selector:'app-header'
})
export class HeaderComponent implements OnInit,OnDestroy
{
    isAuthenticated = false;
    recipes:Recipe[];
    recipeChangeSubscription : Subscription;
    userSubscription : Subscription;

    constructor(private recipeService : RecipeService, 
        private dataStorageService : DataStorageService,
        private authService : AuthService,
        private router : Router
        ){}
    
    ngOnInit(){
        this.userSubscription = this.authService.user.subscribe( (user)=> {
            this.isAuthenticated = !!user;            
        });

        console.log(this.isAuthenticated);

        this.recipeChangeSubscription = this.recipeService.recipeChanged.subscribe(
                                    (recipes:Recipe[])=>{
                                        this.recipes = recipes
                                    }
        );

    }

    onSaveData()
    {
        this.dataStorageService.storeRecipes();
    }

    onFetchData()
    {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    ngOnDestroy()
    {
        this.recipeChangeSubscription.unsubscribe();
        this.userSubscription.unsubscribe();
    }

    onLogOut()
    {
        this.authService.logout();
        this.router.navigate(['/auth']);    
    }
    
}