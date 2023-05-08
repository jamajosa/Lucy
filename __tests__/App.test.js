global.__DEV__ = true;
jest.autoMockOff();
import { render } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<App />);
    const app = getByTestId('app');
    expect(app).toBeDefined();
  });
});