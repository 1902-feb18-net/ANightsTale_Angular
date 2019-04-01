import { Component, OnInit, Inject } from '@angular/core';
import { ANightstaleApiService } from '../anightstale-api.service';
import { RollsCollection } from 'src/models/characterRolls';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})

export class CharacterComponent implements OnInit {
  number: number[];
  showError = false;
  error = '';


  constructor(private charApi: ANightstaleApiService,
    private router: Router,@Inject(DOCUMENT) private document: any) { 
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

  putRolls()
  {
    console.log(this.charApi)
    console.log(this.number)
    this.charApi.postAll(this.number).then(() => {
      this.router.navigate(['/rolls']);
    },
    error => {
      // should inspect error and put useful info on page
      console.log(error);
    });
    this.document.location.href = 'https://anightstaleui.azurewebsites.net/Campaign';
  }
  ngOnInit() {
  }

}
