import { Component, AfterViewInit, ViewChild, ElementRef, DoCheck, KeyValueDiffers, OnInit, HostListener } from '@angular/core';
import * as D3 from 'd3';

declare let d3: any;

@Component({
    selector: 'enl-world-cloud',
    templateUrl: './world-cloud.component.html',
    styleUrls: ['./world-cloud.component.css']
})
export class WorldCloudComponent implements OnInit, AfterViewInit {
    @ViewChild('svgContainer') svgContainer: ElementRef;
    @ViewChild('svgElement') svgElement: ElementRef;

    private _svg; // SVG in which we will print our chart
    private _margin: {
        // Space between the svg borders and the actual chart graphic
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    private _width: number; // Component width
    private _height: number; // Component height
    private _minCount: number; // Minimum word count
    private _maxCount: number; // Maximum word count
    private _fontScale; // D3 scale for font size
    private _fillScale; // D3 scale for text color

    private words = [
        'Hello',
        'world',
        'normally',
        'you',
        'want',
        'more',
        'words',
        'than',
        'this',
        'Hello',
        'world',
        'normally',
        'you',
        'want',
        'more',
        'words',
        'than',
        'this',
        'Hello',
        'world',
        'normally',
        'you',
        'want',
        'more',
        'words',
        'than',
        'this'
    ].map(function(d) {
        return { word: d, size: 18 + Math.random() * 18 };
    });

    constructor() {
        // this._svg = this.svgElement.nativeElement;
        this._margin = {
            top: 0,
            right: 10,
            bottom: 10,
            left: 0
        };
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this._rebuild();
    }

    getWidth(): number {
        return this.svgContainer.nativeElement.offsetWidth - this._margin.left - this._margin.right;
    }

    getHeight(): number {
        const height = this.svgContainer.nativeElement.offsetHeight - this._margin.left - this._margin.right;
        console.log(height);
        return height;
    }

    ngAfterViewInit() {
        this._rebuild();
    }

    ngOnInit() {}

    private _rebuild() {
        this._setup();
        this._buildSVG();
        this._populate();
    }

    private _setup() {
        this._width = this.getWidth();
        this._height = this.getHeight();

        this._minCount = 18;
        this._maxCount = 36;

        const minFontSize = 18;
        const maxFontSize = 36;
        this._fontScale = D3.scaleLinear()
            .domain([this._minCount, this._maxCount])
            .range([minFontSize, maxFontSize]);
        this._fillScale = D3.scaleOrdinal(D3.schemeCategory10);
    }

    private _buildSVG() {
        const host = D3.select(this.svgContainer.nativeElement).html('');
        this._svg = host
            .append('svg')
            .attr('width', this._width + this._margin.left + this._margin.right)
            .attr('height', this._height + this._margin.top + this._margin.bottom - 4)
            .append('g')
            .attr('transform', 'translate(' + this._width / 2 + ',' + this._height / 2 + ')');
    }

    private _populate() {
        const fontFace = 'Impact';
        const fontWeight = 'normal';
        const spiralType = 'archimedean';

        d3.layout
            .cloud()
            .size([this._width, this._height])
            .words(this.words)
            .rotate(() => 0)
            .font(fontFace)
            .fontWeight(fontWeight)
            .fontSize(d => this._fontScale(d.size))
            .spiral(spiralType)
            .on('end', () => {
                this._drawWordCloud(this.words);
            })
            .start();
    }

    private _drawWordCloud(words) {
        this._svg
            .selectAll('text')
            .data(words)
            .enter()
            .append('text')
            .style('font-size', d => d.size + 'px')
            .style('fill', (d, i) => {
                return this._fillScale(i);
            })
            .attr('text-anchor', 'middle')
            .attr('transform', d => {
                return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
            })
            .attr('class', 'world-cloud')
            .text(d => {
                return d.word;
            });
    }
}
