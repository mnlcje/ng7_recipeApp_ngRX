import { Ingredient } from '../shared/ingredient.model';

export class Recipe
{
    //Auto Creation and Assignment of Properties
    constructor(
        public name:string, 
        public description:string, 
        public imagePath:string,
        public ingredients : Ingredient[]
        ){ }

}