import {
  Component, OnInit, Injectable, Inject, HostListener, Input,
  Output, EventEmitter, ContentChildren, QueryList, ElementRef, Renderer2
} from '@angular/core';

import { DOCUMENT } from '@angular/common';
/** @dynamic */
@Component({
  selector: 'app-multi-range-slider',
  templateUrl: './multi-range-slider.component.html',
  styleUrls: ['./multi-range-slider.component.css']
})
export class MultiRangeSliderComponent implements OnInit {

  constructor(private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: HTMLDocument) {
    this.mouseup = this.unboundMouseup.bind(this);
    this.dragging = this.unboundDragging.bind(this);
  }
  selectedIndex: any;
  @Input() variants: any;
  @Input() prop: any;
  @Input() colorList: any = [];

  curX = 0;
  curL = 0;
  curR = 0;

  percTotoal = 100;
  startLeftPosition = 0;
  startRightPosition = 0;
  mousePositionX = 0;
  mousemoveEvent: any;
  mouseupEvent: any;

  mouseup: (e: any) => void;

  dragging: (event: any) => void;

  ngOnInit() {
  }

  mousedown(e: any, index) {
    if (e.button === 0) {
      this.selectedIndex = index;
      this.startLeftPosition = this.getPerc(this.selectedIndex);
      this.startRightPosition = this.getPerc(this.selectedIndex + 1);
      this.mousePositionX = e.pageX;

      // if listeners exist, first Remove listeners
      if (this.mousemoveEvent) {
        this.mousemoveEvent();
      }

      if (this.mouseupEvent) {
        this.mouseupEvent();
      }

      this.mousemoveEvent = this.renderer.listen('document', 'mousemove', this.dragging);
      this.mouseupEvent = this.renderer.listen('document', 'mouseup', this.mouseup);
    }
  }

  unboundMouseup(event: any) {
    // Remove listeners
    this.mousemoveEvent();
    this.mouseupEvent();
  }

  unboundDragging(e: any) {
    const sliderElWidth = document.getElementsByClassName('slider-control')[0].clientWidth;
    const draggedPosition = (e.pageX - this.mousePositionX) / sliderElWidth * this.percTotoal;
    // console.log('unboundDragging ::', sliderElWidth, '---', draggedPosition);
    if (draggedPosition < -this.startLeftPosition || draggedPosition > this.startRightPosition) {
      return;
    }

    this.setPerc(Math.round(this.startLeftPosition + draggedPosition));
    this.setPerc(Math.round(this.startRightPosition - draggedPosition), this.selectedIndex + 1);
  }

  getPerc(i?) {
    const _i = (i === 0 || i) ? i : this.selectedIndex;
    if (this.prop) {
      return Number(this.variants[_i][this.prop]);
    } else {
      return Number(this.variants[_i]);
    }
  }

  setPerc(perc, i?) {
    const _i = (i === 0 || i) ? i : this.selectedIndex;
    if (this.prop) {
      return this.variants[_i][this.prop] = perc;
    } else {
      return this.variants[_i] = perc;
    }
  }

  // Need to re-factor
  getLeftOffset(index?) {
    const _this = this;
    this.percTotoal = this.variants.reduce(function (sum, item, i) {
      return sum + _this.getPerc(i);
    }, 0);
    let x = 0, pRunningTotal = 0;

    // console.log('updatePercWidth total ::', this.percTotoal, this.variants, this.variants.length, this.variants.length - 1);

    for (let i = 0, l = this.variants.length - 1; i < l; i++) {
      // console.log('updatePercWidth loop ::', i);
      pRunningTotal += this.getPerc(i);
      x = pRunningTotal / this.percTotoal * 100;
      // console.log(document.getElementsByClassName('slider-handle')[i], i);
      if (document.getElementsByClassName('slider-handle')[i]) {
        document.getElementsByClassName('slider-handle')[i]['style']['left'] = x + '%';
      }
    }
  }

}
