import { render } from '@testing-library/react-native';
import DeliveriesList from '../components/DeliveriesList';

const route = [
    { params: true},
    
];
test('header should exist containing text Inleveranser', async () => {
    const { getByText } = render(<DeliveriesList route={route}/>);
    const header = await getByText('Inleveranser');

    expect(header).toBeDefined();
});

test('button should exist containing text "Skapa ny inleverans" ', async () => {
    const { getByText } = render(<DeliveriesList route={route}/>);
    const button = getByText('Skapa ny inleverans')
    expect(button).toBeDefined();
});
