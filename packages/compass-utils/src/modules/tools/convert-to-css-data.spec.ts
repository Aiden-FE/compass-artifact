import convertToCSSData from './convert-to-css-data'

describe('Test convertToCSSData', () => {
  it('should "font-size: 14px;color: #212121"', () => {
    expect(convertToCSSData({
      'font-size': '14px',
      'color': '#212121'
    }))
      .toEqual("font-size: 14px;color: #212121")
  });
})
