/**
 * XZImageProxy is a framework-agnostic web component to show image helper
 * for layout. More details on https://www.github.com/dknight/xz-image-proxy
 *
 * @author Dmitri Smirnov <https://www.whoop.ee/>
 * @license MIT 2023
 * @version {{VERSION}}
 * @extends HTMLElement
 *
 * @example
 * <xz-image-proxy width="100%" height="50%"></xz-image-proxy>
 */

interface IXZImageProxy {
  width: string;
  height: string;
  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
}

class XZImageProxy extends HTMLElement implements IXZImageProxy {
  /**
   * Tag name
   */
  static TAG_NAME: string = 'xz-image-proxy';

  /**
   * Observed attributes for web-component.
   */
  static observedAttributes: string[] = ['width', 'height'];

  constructor(
    private root: ShadowRoot,
    private styleElem: HTMLStyleElement,
    private span: HTMLSpanElement,
    private resizeObserver: ResizeObserver,
    public width: string = '100%',
    public height: string = '100%'
  ) {
    super();
    this.span = document.createElement('span');
    this.styleElem = document.createElement('style');

    this.styleElem.textContent = `{{CSS}}`;
    this.root = this.attachShadow({mode: 'open'});
    this.root.append(this.styleElem, this.span);
  }

  /**
   * Parses the width or height, if it hasn't any units then assumed that
   * these are pixels.
   */
  private parseSize = (size: string | number): string => {
    let str = String(size);
    if (str.match(/^-?[0-9]+$/)) {
      str += 'px';
    }
    return str;
  };

  /**
   * Draws size and a11y for proxy.
   */
  private draw = (): void => {
    const [w, h] = [Number.parseInt(this.width), Number.parseInt(this.height)];
    this.span.textContent = `${w}×${h}`;
    this.setAttribute('aria-label', `Image proxy ${w}×${h}`);
  };

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) {
      return;
    }
    const v = this.parseSize(newValue);
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
    this.draw();
  }

  connectedCallback() {
    this.setAttribute('role', 'img');
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

customElements.define(XZImageProxy.TAG_NAME, XZImageProxy);

export default XZImageProxy;
