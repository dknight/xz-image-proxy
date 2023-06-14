"use strict";
/**
 * XZImageProxy is a framework-agnostic web component to show image helper
 * for layout. More details on https://www.github.com/dknight/xz-image-proxy
 *
 * @author Dmitri Smirnov <https://www.whoop.ee/>
 * @license MIT 2023
 * @version 2.0.1
 * @extends HTMLElement
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
    /**
     * Parses the width or height, if it hasn't any units then assumed that
     * these are pixels.
     */
    this.parseSize = (size) => {
      let str = String(size);
      if (str.match(/^-?[0-9]+$/)) {
        str += "px";
      }
      return str;
    };
    /**
     * Draws size and a11y for proxy.
     */
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
  disconnectedCallback() {
    this.resizeObserver.disconnect();
  }
}
/**
 * Tag name
 */
XZImageProxy.TAG_NAME = "xz-image-proxy";
/**
 * Observed attributes for web-component.
 */
XZImageProxy.observedAttributes = ["width", "height"];
customElements.define(XZImageProxy.TAG_NAME, XZImageProxy);
export default XZImageProxy;
