import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'enl-foo',
    templateUrl: './foo.component.html',
    styleUrls: ['./foo.component.css']
})
export class FooComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        console.log('Hello Debugger');
    }

    clicked(event: any) {
        d3.select(event.target)
            .append('circle')
            .attr('cx', event.offsetX)
            .attr('cy', event.offsetY)
            .attr('r', () => {
                return 10;
            })
            .attr('fill', 'red');
    }
}
