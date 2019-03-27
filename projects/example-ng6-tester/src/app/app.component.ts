import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'example-ng6-tester';

    ngOnInit() {
        console.log('Hello Debugger 2');
    }
}
