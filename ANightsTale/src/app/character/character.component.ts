import { Component, OnInit } from '@angular/core';
import { ANightstaleApiService } from '../anightstale-api.service';
import { RollsCollection } from 'src/models/characterRolls';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  number: number[];
  showError = false;
  error = '';

  constructor(private charApi: ANightstaleApiService) { 
    console.log(charApi)
  }


  getRolls()
  {
    console.log(this.charApi)
    this.charApi.getAll().subscribe((rollsCollection: number[] ) => {
      console.log('received response');
      console.log(rollsCollection);
      this.number = rollsCollection;
    }, error => {
      this.showError = true;
      this.error = error;
    });

  }
  ngOnInit() {
  }

}
