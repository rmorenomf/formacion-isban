import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';

@Component({
    selector: 'post-list',
    templateUrl: 'post.component.html',
    styleUrls: 'post.component.css'
})
export class PostComponent implements OnInit {
    
    userName = "?";

    constructor(  ) {
        this.userName = "RMF";
     }

    ngOnInit() { 
        //Vamos a realizar la llamada en la incialización del componente.
    }
}