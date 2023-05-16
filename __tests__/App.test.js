import 'react-native';
import renderer from 'react-test-renderer';
import App from '../App';

test('renders correctly', () => {
  const tree = renderer
    .create(<App/>)
    .toJSON();
    expect(3).toContain(tree);
  expect(tree).toMatchSnapshot();
});