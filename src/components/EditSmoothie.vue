<template>
    <div v-if ="smoothie" class="edit-smoothie container">
        <h2>Edit {{smoothie.title}}</h2>
        <form @submit.prevent="EditSmoothie"> 
            <div class="field title">
                <label for="title">Smoothie title</label>
                <input type="text" name ="title" v-model="smoothie.title">
            </div>
            <div class="ingredients field" v-for="(ing,index) in smoothie.ingredients" :key="index">
                <label for="ingredients">Ingredients :</label>   
                <input type="text" name="ingredients" v-model="smoothie.ingredients[index]">
                <i class="material-icons delete" @click="DeleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredients">
                <label for="add-ingredients">Add an ingredients</label>
                <input type="text" name ="add-ingredients" @keydown.tab.prevent="AddIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>
                <button class="btn pink">Update Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name : 'EditSmoothie',
    data(){
        return{
            smoothie :null,
            another : null,
            feedback : null
        }
    },
    created(){
        let ref = db.collection('smoothies').where('slug','==', this.$route.params.smoothie_slug )
        ref.get().then(snapshot =>{
            snapshot.forEach(doc=>{
               this.smoothie = doc.data()
               this.smoothie.id = doc.id
            })
        })
    },
    methods :{
        EditSmoothie(){
            if(this.smoothie.title){
                this.feedback=null
                //create a slug
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower:true
                })
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title : this.smoothie.title,
                    ingredients: this.smoothie.ingredients,
                    slug: this.smoothie.slug
                }).then(()=>{
                    this.$router.push({name : 'Index'})
                }).catch(err =>{
                    console.log(err)
                })
            }
            else{
                this.feedback="You must enter a smoothie title"
            }
        },
        AddIng(){
            if(this.another){
                this.smoothie.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            }
            else{
                this.feedback = 'You must enter a valid value to add an ingredients'
            }
        },
        DeleteIng(ing){
            this.smoothie.ingredients =this.smoothie.ingredients.filter(ingredient =>{
                return ingredient != ing
            })
        }
    }
}
</script>

<style>
.edit-smoothie{
    margin-top: 60px;
    padding: 50px;
    max-width: 500px;
}
.edit-smoothie h2{
    font-size: 30px;
    margin: 20px auto;
}
.edit-smoothie .field{
    margin :20px auto;
    position : relative;
}
.edit-smoothie .delete{
    cursor :pointer;
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 16px;
}
</style>