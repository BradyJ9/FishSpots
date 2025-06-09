import { TimeAmPmPipe } from './time-am-pm.pipe';

describe('TimeAmPmPipe', () => {
  let pipe: TimeAmPmPipe;

  beforeEach(() => {
    pipe = new TimeAmPmPipe();
  });

  it('should convert 13:45 to 1:45 PM', () => {
    expect(pipe.transform('13:45')).toBe('1:45 PM');
  });

  it('should convert 00:15 to 12:15 AM', () => {
    expect(pipe.transform('00:15')).toBe('12:15 AM');
  });

  it('should convert 12:00 to 12:00 PM', () => {
    expect(pipe.transform('12:00')).toBe('12:00 PM');
  });

  it('should return empty string for empty input', () => {
    expect(pipe.transform('')).toBe('');
  });
});