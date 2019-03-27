import { Component, OnInit } from '@angular/core';
import * as cloud from 'd3-cloud';
import * as d3 from 'd3';

@Component({
    selector: 'enl-foo',
    templateUrl: './foo.component.html',
    styleUrls: ['./foo.component.css']
})
export class FooComponent implements OnInit {
    private words = ['Hello', 'world', 'normally', 'you', 'want', 'more', 'words', 'than', 'this'].map(function(d) {
        return { text: d, size: 10 + Math.random() * 90 };
    });

    constructor() {}

    ngOnInit() {
        console.log('Hello Debugger');
        /*d3.layout
            .cloud()
            .size([960, 500])
            .words(this.words)
            .padding(5)
            .rotate(~~(Math.random() * 2) * 90)
            .font('Impact')
            .fontSize(d => d.size())
            .on('end', this.end)
            .start();
            */
    }

    end(words) {
        console.log(JSON.stringify(words));
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
