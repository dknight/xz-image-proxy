"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var xz_image_proxy_exports = {};
__export(xz_image_proxy_exports, {
  default: () => xz_image_proxy_default
});
module.exports = __toCommonJS(xz_image_proxy_exports);
/**
 * XZImageProxy is a framework-agnostic web component to show image helper
 * for layout. More details on https://www.github.com/dknight/xz-image-proxy
 *
 * @author Dmitri Smirnov <https://www.whoop.ee/>
 * @license MIT 2023
 * @version 1.0.0
 * @extends HTMLElement
 *
 * @property {string} [width="100%"] Width of the image.
 * @property {string} [height="100%"] Height of the image
 *
 * @example
 * <xz-image-proxy width="100%" height="50%"></xz-image-proxy>
 */
class XZImageProxy extends HTMLElement {
  constructor(root, styleElem, span, resizeObserver, width = "100%", height = "100%") {
    super();
    this.root = root;
    this.styleElem = styleElem;
    this.span = span;
    this.resizeObserver = resizeObserver;
    this.width = width;
    this.height = height;
    this.parseSize = (size) => {
      let str = String(size);
      if (str.match(/^-?[0-9]+$/)) {
        str += "px";
      }
      return str;
    };
    this.draw = () => {
      const [w, h] = [Number.parseInt(this.width), Number.parseInt(this.height)];
      this.span.textContent = `${w}\xD7${h}`;
      this.setAttribute("aria-label", `Image proxy ${w}\xD7${h}`);
    };
    this.span = document.createElement("span");
    this.styleElem = document.createElement("style");
    this.styleElem.textContent = `:host{--w: 100%;--h: 100%;width:var(--w);height:var(--h);background:#d3d3d3;font: 1.5em sans-serif;color:#666;display:inline-flex;align-items:center;justify-content:center}`;
    this.root = this.attachShadow({ mode: "open" });
    this.root.append(this.styleElem, this.span);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
    const v = this.parseSize(newValue);
    switch (name) {
      case "width":
        this.style.setProperty("--w", v);
        this.width = v;
        break;
      case "height":
        this.style.setProperty("--h", v);
        this.height = v;
        break;
    }
    this.draw();
  }
  connectedCallback() {
    this.setAttribute("role", "img");
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          this.width = `${entry.contentRect.width}px`;
          this.height = `${entry.contentRect.height}px`;
          this.draw();
        }
      }
    });
    this.resizeObserver.observe(this);
  }
  /**
   * @inheritDoc
   */
  disconnectedCallback() {
    this.resizeObserver.disconnect();
  }
}
XZImageProxy.TAG_NAME = "xz-image-proxy";
XZImageProxy.observedAttributes = ["width", "height"];
customElements.define(XZImageProxy.TAG_NAME, XZImageProxy);
var xz_image_proxy_default = XZImageProxy;
