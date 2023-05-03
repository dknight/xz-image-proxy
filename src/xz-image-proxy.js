/**
 * XZImageProxy is a framework-agnostic web component to show image helper
 * for layout. More details on https://www.github.com/dknight/xz-image-proxy
 *
 * @author Dmitri Smirnov <https://www.whoop.ee/>
 * @license MIT 2023
 * @version {{VERSION}}
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
  static TAG_NAME = 'xz-image-proxy';

  /**
   * Observed attributes for web-component.
   */
  static observedAttributes = ['width', 'height'];

  #resizeObserver = null;
  #styleElem = document.createElement('style');
  #span = document.createElement('span');

  /**
   * @constructor
   */
  constructor() {
    super();
    this.width = '100%';
    this.height = '100%';
    this.root = this.attachShadow({mode: 'open'});
    this.root.append(this.#styleElem, this.#span);
    this.#styleElem.textContent = `{{CSS}}`;
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
      str += 'px';
    }
    return str;
  };

  /**
   * Draws size and a11y for proxy.
   */
  #draw = () => {
    const [w, h] = [Number.parseInt(this.width), Number.parseInt(this.height)];
    this.#span.textContent = `${w}×${h}`;
    this.setAttribute('aria-label', `Image proxy ${w}×${h}`);
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
      case 'width':
        this.style.setProperty('--w', v);
        this.width = v;
        break;
      case 'height':
        this.style.setProperty('--h', v);
        this.height = v;
        break;
    }
    this.#draw();
  }

  /**
   * @inheritDoc
   */
  connectedCallback() {
    this.setAttribute('role', 'img');
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

export default XZImageProxy;
