import Auth from '../../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './AuthFields';
import { showMessage } from "react-native-flash-message";

export default function Login({navigation, setIsLoggedIn}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogin() {
        if (auth.email && auth.password) {
            // Snart återkommer vi till AuthModel :)
                const result = await AuthModel.login(auth.email, auth.password);
                if (result.type === "success") {
                    setIsLoggedIn(true);
                }
                showMessage({
                    message: result.title,
                    description: result.message,
                    type: result.type,
                });
        } else {
            showMessage({
                message: "Saknas",
                description: "E-post eller lösenord saknas",
                type: "warning",
            });
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