import XZImageProxy from '../index.js';

describe('Should test', () => {
  let component;
  beforeEach(() => {
    component = document.createElement(XZImageProxy.TAG_NAME);
  });
  afterEach(() => {
    if (document.body.contains(component)) {
      document.body.removeChild(component);
    }
  });

  it('should instance of XZImageProxy', () => {
    expect(component).toBeInstanceOf(XZImageProxy);
  });

  it('should have valid tag name', () => {
    expect(component.nodeName.toLowerCase()).toBe(XZImageProxy.TAG_NAME);
  });

  it('should have default values for width and height', () => {
    expect(component.width).toBe('100%');
    expect(component.height).toBe('100%');
  });

  it('should set attributes and reflect it to properties', () => {
    component.setAttribute('width', '200');
    component.setAttribute('height', '200');
    document.body.appendChild(component);
    expect(component.width).toBe('200px');
    expect(component.height).toBe('200px');
    expect(component.getAttribute('width')).toBe('200');
    expect(component.getAttribute('height')).toBe('200');

    component.setAttribute('width', '133px');
    expect(component.width).toBe('133px');
    component.setAttribute('height', '66');
    expect(component.height).toBe('66px');
    component.setAttribute('height', '33%');
    expect(component.height).toBe('33%');
    component.setAttribute('height', '10rem');
    expect(component.height).toBe('10rem');
    // if coverage
    component.setAttribute('height', '10rem');
    expect(component.height).toBe('10rem');
  });
});
