import Auth from '../../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './AuthFields';
import { showMessage } from "react-native-flash-message";
export default function Register({navigation}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doRegister() {
        if (auth.email && auth.password) {
            // Snart återkommer vi till AuthModel :)
            const result = await AuthModel.register(auth.email, auth.password);
            if (result.type === "success") {
                showMessage({
                    message: result.title,
                    description: result.message,
                    type: result.type,
                });
                navigation.navigate("Login", { reload: false });
            } else {
                showMessage({
                    message: "API key saknas",
                    description: "No valid API key provided.",
                    type: "warning",
                });
            }
               
        }
    }
    
    showMessage({
        message: result.title,
        description: result.message,
        type: result.type,
    });
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