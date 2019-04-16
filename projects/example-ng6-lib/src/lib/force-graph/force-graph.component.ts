import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'enl-force-graph',
    templateUrl: './force-graph.component.html',
    styleUrls: ['./force-graph.component.css']
})
export class ForceGraphComponent implements OnInit {
    @Input() width = 1000;
    @Input() height = 1000;

    Math: Math = Math;
    nodes: any[] = d3.range(1000).map(i => {
        return {
            id: i,
            r: 5,
            fill: '#1f77b4'
        };
    });

    links: any[] = d3.range(this.nodes.length - 1).map(i => {
        return {
            source: Math.floor(Math.sqrt(i)),
            target: i + 1,
            value: Math.random() * 10
        };
    });

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
                    .distance(10)
                    .strength(l => {
                        // return l.value / 10;
                        return 1.0;
                    })
            )
            .force('charge', d3.forceManyBody().distanceMax(250))
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
