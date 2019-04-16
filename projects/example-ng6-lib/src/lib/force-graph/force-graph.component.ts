import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'enl-force-graph',
    templateUrl: './force-graph.component.html',
    styleUrls: ['./force-graph.component.css']
})
export class ForceGraphComponent implements OnInit {
    @Input() width = 500;
    @Input() height = 500;

    Math: Math = Math;
    nodes: any[] = [
        { id: '1', r: 5, fill: '#1f77b4', x: 10, y: 20 },
        { id: '2', r: 5, fill: '#1f77b4', x: 20, y: 20 },
        { id: '3', r: 5, fill: '#ff7f0e', x: 30, y: 20 },
        { id: '4', r: 5, fill: '#ff7f0e', x: 40, y: 20 },
        { id: '5', r: 5, fill: '#2ca02c', x: 50, y: 20 }
    ];

    links: any[] = [
        { source: '1', target: '2', value: 1 },
        { source: '1', target: '3', value: 5 },
        { source: '1', target: '4', value: 10 },
        { source: '2', target: '4', value: 3 },
        { source: '2', target: '5', value: 4 },
        { source: '3', target: '4', value: 8 },
        { source: '4', target: '5', value: 2 }
    ];

    constructor() {}

    ngOnInit() {
        // const links = this.links.map(d => Object.create(d));
        // const nodes = this.nodes.map(d => Object.create(d));

        const simulation = d3
            .forceSimulation(this.nodes)
            .force(
                'link',
                d3
                    .forceLink(this.links)
                    .id((d: { id: string }) => d.id)
                    .distance(50)
                    .strength(l => {
                        return l.value / 10;
                    })
            )
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .stop();

        for (var i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())); i < n; ++i) {
            // postMessage({ type: 'tick', progress: i / n });
            simulation.tick();
        }

        console.log('graph calc complete');
        // this.nodes = nodes;
        // this.links = links;
    }
}
