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
 * @version 0.0.0
 * @extends HTMLElement
 *
 * @property {string} [width="100%"] Width of the image.
 * @property {string} [height="100%"] Height of the image
 *
 * @example
 * <xz-image-proxy width="100%" height="50%"></xz-image-proxy>
 */
class XZImageProxy extends HTMLElement {
  /**
   * Tag name
   * @type {string}
   */
  static TAG_NAME = "xz-image-proxy";
  /**
   * Observed attributes for web-component.
   */
  static observedAttributes = ["width", "height"];
  #resizeObserver = null;
  #styleElem = document.createElement("style");
  #span = document.createElement("span");
  /**
   * @constructor
   */
  constructor() {
    super();
    this.width = "100%";
    this.height = "100%";
    this.root = this.attachShadow({ mode: "open" });
    this.root.append(this.#styleElem, this.#span);
    this.#styleElem.textContent = `:host{--w: 100%;--h: 100%;width:var(--w);height:var(--h);background:#d3d3d3;font: 1.5em sans-serif;color:#666;display:inline-flex;align-items:center;justify-content:center}`;
  }
  /**
   * Parses the width or height, if it hasn't any units then assumed that
   * these are pixels.
   * @param {number|string} size
   * @return {string}
   */
  #parseSize = (size) => {
    let str = String(size);
    if (str.match(/^-?[0-9]+$/)) {
      str += "px";
    }
    return str;
  };
  /**
   * Draws size and a11y for proxy.
   */
  #draw = () => {
    const [w, h] = [Number.parseInt(this.width), Number.parseInt(this.height)];
    this.#span.textContent = `${w}\xD7${h}`;
    this.setAttribute("aria-label", `Image proxy ${w}\xD7${h}`);
  };
  /**
  * @inheritDoc
  */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
    const v = this.#parseSize(newValue);
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
    this.#draw();
  }
  /**
   * @inheritDoc
   */
  connectedCallback() {
    this.setAttribute("role", "img");
    this.#resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          this.width = entry.contentRect.width;
          this.height = entry.contentRect.height;
          this.#draw();
        }
      }
    });
    this.#resizeObserver.observe(this);
  }
  /**
   * @inheritDoc
   */
  disconnectedCallback() {
    this.#resizeObserver.disconnect();
  }
}
customElements.define(XZImageProxy.TAG_NAME, XZImageProxy);
var xz_image_proxy_default = XZImageProxy;
