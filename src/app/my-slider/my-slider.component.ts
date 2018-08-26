import {Component, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {interval} from 'rxjs';

@Component({
  selector: 'app-my-slider',
  templateUrl: './my-slider.component.html',
  styleUrls: ['./my-slider.component.scss']
})
export class MySliderComponent implements OnInit, OnDestroy {

  selectedIndex: number;
  tick;
  timer$;
  isAlive = true;
  sub;

  sliderArray = [
    {img: 'http://bloquo.cc/img/works/1.jpg', alt: '', text: '365 Days Of weddings a year'},
    {img: 'http://bloquo.cc/img/works/2.jpg', alt: '', text: '365 Days Of weddings a year'},
    {img: 'http://bloquo.cc/img/works/3.jpg', alt: '', text: '365 Days Of weddings a year'},
    {img: 'http://bloquo.cc/img/works/4.jpg', alt: '', text: '365 Days Of weddings a year'},
    {img: 'http://bloquo.cc/img/works/5.jpg', alt: '', text: '365 Days Of weddings a year'}
  ];

  constructor(
    private sanitization: DomSanitizer
  ) {
    this.selectedIndex = 0;
  }

  ngOnInit() {
    this.sub = interval(5000).subscribe(tic => {
      if (this.isAlive) {
        this.downSelected('next');
      }
    });
  }

  sanImg(v) {
    return this.sanitization.bypassSecurityTrustStyle(`url(${v})`);
  }

  downSelected(direction) {
    (direction === 'next') ? this.selectedIndex = this.selectedIndex + 1 : this.selectedIndex = this.selectedIndex - 1;

    if (this.selectedIndex >= this.sliderArray.length) {
      this.selectedIndex = 0;
    }
    if (this.selectedIndex < 0) {
      this.selectedIndex = this.sliderArray.length - 1;
    }
    console.log(this.selectedIndex);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  swipeleft() {
    this.downSelected('prev');
  }

  swiperight() {
    this.downSelected('next');
  }
}
