import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'enl-force-graph',
    templateUrl: './force-graph.component.html',
    styleUrls: ['./force-graph.component.css']
})
export class ForceGraphComponent implements OnInit {
    nodes: any[] = [
        { r: 5, fill: '#1f77b4', x: 10, y: 20 },
        { r: 5, fill: '#1f77b4', x: 20, y: 20 },
        { r: 5, fill: '#ff7f0e', x: 30, y: 20 },
        { r: 5, fill: '#ff7f0e', x: 40, y: 20 },
        { r: 5, fill: '#2ca02c', x: 50, y: 20 }
    ];

    constructor() {}

    ngOnInit() {}
}
