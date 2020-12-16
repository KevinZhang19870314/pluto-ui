import { Injectable } from '@angular/core';
import { NpSharedModule } from '../shared.module';

@Injectable({
  providedIn: NpSharedModule
})
export class LoadingService {
  prevTime: number;
  afterTime: number;
  constructor() { }

  // 生成加载条
  renderDOM(contain, times: number = 0) {
    // 遮罩层
    // 加载条
    let oDiv = document.createElement('div');
    oDiv.id = 'loading-container';
    oDiv.className = 'loading-container';
    oDiv.innerHTML = `
      <div class="loading-mark"></div>
      <div class="loading">
        <div class="sk-circle">
          <div class="sk-circle1 sk-child"></div>
          <div class="sk-circle2 sk-child"></div>
          <div class="sk-circle3 sk-child"></div>
          <div class="sk-circle4 sk-child"></div>
          <div class="sk-circle5 sk-child"></div>
          <div class="sk-circle6 sk-child"></div>
          <div class="sk-circle7 sk-child"></div>
          <div class="sk-circle8 sk-child"></div>
          <div class="sk-circle9 sk-child"></div>
          <div class="sk-circle10 sk-child"></div>
          <div class="sk-circle11 sk-child"></div>
          <div class="sk-circle12 sk-child"></div>
        </div>
        <div class="loading-text">${contain}</div>
      </div>
      `;
    const parentNode = document.body;
    parentNode.appendChild(oDiv);
    // 超时自动取消 默认10s
    if (times > 10000) {
      setTimeout(() => {
        if (oDiv) {
          parentNode.removeChild(oDiv);
        }
      }, times);
    }
  }

  deleteDOM() {
    const parentNode = document.body;
    const oDiv = document.getElementById('loading-container');
    if (oDiv) {
      parentNode.removeChild(oDiv);
    }
  }

  begin() {
    if (document.getElementById('loading-container')) {
      return;
    }
    this.renderDOM('处理中');
    this.prevTime = Date.now();
  }

  end() {
    this.afterTime = Date.now();
    let times = this.afterTime - this.prevTime;
    if (times < 500) {
      setTimeout(() => { this.deleteDOM(); }, 500 - times);
    } else {
      this.deleteDOM();
    }
  }
}
