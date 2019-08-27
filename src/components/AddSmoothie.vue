<template>
    <div class="add-smoothie container">
        <h2 class="center-align indigo-text">Add new smoothie recipe</h2>
        <form @submit.prevent="AddSmoothie"> 
            <div class="field title">
                <label for="title">Smoothie title</label>
                <input type="text" name ="title" v-model="title">
            </div>
            <div class="ingredients" v-for="(ing,index) in ingredients" :key="index">
                <label for="ingredients">Ingredients :</label>   
                <input type="text" name="ingredients" v-model="ingredients[index]">
            </div>
            <div class="field add-ingredients">
                <label for="add-ingredients">Add an ingredients</label>
                <input type="text" name ="add-ingredients" @keydown.tab.prevent="AddIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>
                <button class="btn pink">Add Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
    name : 'AddSmoothie',
    data(){
        return{
            title :null,
            another :null,
            ingredients :[],
            feedback:null,
            slug:null
        }
    },
    methods:{
        AddSmoothie(){
            if(this.title){
                this.feedback=null
                //create a slug
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower:true
                })
                console.log(this.slug)
                // db.collection('smoothies').add({
                //     title : this.title,
                //     ingredients: this.ingredients,
                //     // slug: this.slug
                // }).then(()=>{
                //     this.$router.push({name : 'Index'})
                // }).catch(err =>{
                //     console.log(err)
                // })
            }
            else{
                this.feedback="You must enter a smoothie title"
            }
        },
        AddIng(){
            if(this.another){
                this.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            }
            else{
                this.feedback = 'You must enter a valid value to add an ingredients'
            }
        }
    }
}
</script>

<style>
.add-smoothie{
    margin-top: 60px;
    padding: 50px;
    max-width: 500px;
}
.add-smoothie h2{
    font-size: 30px;
    margin: 20px auto;
}
.add-smoothie .field{
    margin :20px auto;
}
</style>