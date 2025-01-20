import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { postLogin } from "./requestHandler";

export default async function LoginFunction(email: string, password: string, provider: string) {
    const userData = {
        email: email,
        password: password,
        provider: provider
    }
    try {
        const response = await postLogin(userData);
        console.log("User logged in successfully:", response);
        await SecureStore.setItemAsync('JWT_TOKEN', response);
        router.replace("/(home)/(routes)");
    } catch (error) {
        console.log("Error logging in user:", error);
    }
}