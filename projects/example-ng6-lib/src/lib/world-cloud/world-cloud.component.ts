import { Component, Input, ElementRef, DoCheck, KeyValueDiffers, OnInit } from '@angular/core';
import * as D3 from 'd3';

declare let d3: any;

@Component({
    selector: 'enl-world-cloud',
    templateUrl: './world-cloud.component.html',
    styleUrls: ['./world-cloud.component.css']
})
export class WorldCloudComponent implements OnInit {
    private _host; // D3 object referencing host DOM object
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
    private _htmlElement: HTMLElement; // Host HTMLElement
    private _minCount: number; // Minimum word count
    private _maxCount: number; // Maximum word count
    private _fontScale; // D3 scale for font size
    private _fillScale; // D3 scale for text color

    private words = ['Hello', 'world', 'normally', 'you', 'want', 'more', 'words', 'than', 'this'].map(function(d) {
        return { word: d, size: 18 + Math.random() * 18 };
    });

    constructor(private _element: ElementRef, private _keyValueDiffers: KeyValueDiffers) {
        this._htmlElement = this._element.nativeElement;
        this._host = D3.select(this._element.nativeElement);
    }

    ngOnInit() {
        this._setup();
        this._buildSVG();
        this._populate();
    }

    private _setup() {
        this._margin = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        };
        this._width =
            (this._htmlElement.parentElement.clientWidth == 0 ? 500 : this._htmlElement.parentElement.clientWidth) -
            this._margin.left -
            this._margin.right;
        if (this._width < 100) {
            this._width = 100;
        }
        this._height = this._width * 0.75 - this._margin.top - this._margin.bottom;

        this._minCount = 18;
        this._maxCount = 36;

        let minFontSize: number = 18;
        let maxFontSize: number = 36;
        this._fontScale = D3.scaleLinear()
            .domain([this._minCount, this._maxCount])
            .range([minFontSize, maxFontSize]);
        this._fillScale = D3.scaleOrdinal(D3.schemeCategory10);
    }

    private _buildSVG() {
        this._host.html('');
        this._svg = this._host
            .append('svg')
            .attr('width', this._width + this._margin.left + this._margin.right)
            .attr('height', this._height + this._margin.top + this._margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + ~~(this._width / 2) + ',' + ~~(this._height / 2) + ')');
    }

    private _populate() {
        let fontFace: string = 'Impact';
        let fontWeight: string = 'normal';
        let spiralType: string = 'archimedean';

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
