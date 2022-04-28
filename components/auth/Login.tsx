import Auth from '../../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './AuthFields';

export default function Login({navigation, setIsLoggedIn}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogin() {
        if (auth.email && auth.password) {
            // Snart återkommer vi till AuthModel :)
            try {
                const result = await AuthModel.login(auth.email, auth.password);
                setIsLoggedIn(true);
            } catch (error) {
                alert("Fel användarnamn eller lösenord")
            }
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doLogin}
            title="Logga in"
            navigation={navigation}
        />
    );
};