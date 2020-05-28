import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import {DishService} from '../services/dish.service';
import { Dish } from '../shared/dish';
import {Comment} from '../shared/comment';
import { switchMap } from 'rxjs/operators';
import { visibility,expand } from '../animations/animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
   visibility(),
   expand()
  ]
})
export class DishdetailComponent implements OnInit {

  @ViewChild('cform') commentFormDirective;

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
  dishIds: string[];
  prev: string;
  next: string;
  msgErr: String;
  dishcopy: Dish;
  visibility = 'shown';


  constructor(private _dishService:DishService,
    private _location : Location,
    private _route: ActivatedRoute,
    private _fb:FormBuilder,
    @Inject('BaseUrl') public BaseUrl
    ) {  this.createForm();}


  ngOnInit() {
    this._dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this._route.params.pipe(switchMap((params: Params) => {this.visibility = 'hidden';return this._dishService.getDish(params['id'])}))
    .subscribe(dish => { this.dish = dish;this.dishcopy=dish; this.setPrevNext(dish.id); this.visibility = 'shown';},
    msgErr=>this.msgErr=<any>msgErr);
  }
  

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
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
    this.dishcopy.comments.push(this.comment);
    this._dishService.putDish(this.dishcopy)
      .subscribe(
        data=>{
        this.dishcopy=data;
        this.dish=data
              },
  error=>{
    this.dish=null;
    this.dishcopy=null;
    this.msgErr=<any>error;
  }
);
this.commentFormDirective.resetForm();
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
