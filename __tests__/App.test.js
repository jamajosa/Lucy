global.__DEV__ = true; 
import App from '../App';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  global.__DEV__ = true;
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});