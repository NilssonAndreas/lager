import { render } from '@testing-library/react-native';
import AuthFields from '../components/auth/AuthFields';

test('Input fields should exist with name E-post & Lösenord', async () => {
    const { getByText } = render(<AuthFields />);
    const input1 = await getByText('E-post');
    const input2 = await getByText('Lösenord');

    expect(input1).toBeDefined();
    expect(input2).toBeDefined();
});