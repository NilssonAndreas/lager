import Auth from '../../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './AuthFields';

export default function Register({navigation}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doRegister() {
        if (auth.email && auth.password) {
            // Snart återkommer vi till AuthModel :)
            try {
                const result = await AuthModel.register(auth.email, auth.password);
                alert("Du är nu registrerad")
                navigation.navigate("Login", { reload: false });
            
            } catch (error) {
                alert("Fel vid registrering")
            }
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doRegister}
            title="Registrera istället"
            navigation={navigation}
        />
    );
};