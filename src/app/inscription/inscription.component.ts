import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {Observable, of} from "rxjs";
import {MatRadioButton, MatRadioChange, MatRadioGroup} from "@angular/material/radio";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardHeader, MatCardSmImage, MatCardTitle, MatCardTitleGroup} from "@angular/material/card";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatRadioGroup, MatRadioButton, ReactiveFormsModule, MatButton, MatCard, MatCardHeader, MatCardTitleGroup, MatCardTitle, MatCardSmImage],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent {
  users : User [] = []

  // il existe deux facons de faire des formulaires en angular : ici les reactives forms (sinon c'est ngForm)
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    imageName: new FormControl('', Validators.required)
  });
  constructor() {
    this.mockUserData().subscribe((users => this.users = users));
  }

  // cette méthode mock le post au back
  postUser(user : User) {
    this.users.push(user);
  }

  // cette méthode sert à faire comme si j'appelais mon API et qu'elle me retournais deux utilisateurs
  mockUserData() : Observable<User[]> {
    const users : User[] = [{id: "AZER", imageName: "image1"}, {id: "TFES", imageName: "image2"}]
    return of(users)
  }

  // cette méthode n'est pas obligatoire c'est pour montrer comment récupérer la valeur d'un radio button
  onRadioButtonChange($event: MatRadioChange) {
    console.log($event.value);
  }


  // lorsque je soumets mon formulaire
  onSubmit() {
    console.log(this.myForm)
    const newUser: User = {id: this.myForm.controls.name.value!!, imageName : this.myForm.controls.imageName.value!!}
    console.log(newUser)
    this.postUser(newUser);
  }
}


// a mettre dans un autre fichier
export interface User {
  id: string,
  imageName : string
}