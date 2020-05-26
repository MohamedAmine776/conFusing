import { Component, OnInit,ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import {DishService} from '../services/dish.service';
import { Dish } from '../shared/dish';
import {Comment} from '../shared/comment';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  @ViewChild('cform') feedbackFormDirective;

  formErrors = {
     'author':'',
     'comment':''
  };

  validationMessages = {
    'author': {
      'required':      'Author name is required.',
      'minlength':     'Author name must be at least 2 characters long.',
      'maxlength':     'Author name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'comment is required.'
    }
  };
dish:Dish;
comment:Comment;
commentForm:FormGroup;
value=5;
  constructor(private _dishService:DishService,
    private _location : Location,
    private _route: ActivatedRoute,
    private _fb:FormBuilder
    ) {  this.createForm();}

  ngOnInit() {
    const id = this._route.snapshot.params['id'];
   this._dishService.getDish(id).then(dish =>  this.dish=dish);
  }

  goBack():void{
    this._location.back();
  }
  createForm(){

    this.commentForm=this._fb.group({
        rating:5,
        comment:['',[Validators.required,Validators.minLength(2)]],
        author:['',Validators.required]
    });
    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

  this.onValueChanged();
  }

  onSubmit(){
let date=new Date;
this.comment=this.commentForm.value;
this.comment=this.commentForm.value;
this.comment.date=date.toISOString();
this.dish.comments.push(this.comment);
console.log(this.dish.comments)
this.commentForm.reset({
  rating:5,
  comment:'',
  author:''
});

  }

  onValueChanged(data?:any){
   if(!this.commentForm){return;}
   const form=this.commentForm;
   for (const field in this.formErrors) {
    if (this.formErrors.hasOwnProperty(field)) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }
 }
}
