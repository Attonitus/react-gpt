import { TranslateResponse } from "../../interfaces/translate.response";



export const translateUseCase = async(prompt: string, lang: string) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/translate`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({prompt, lang})
        });

        const {content}: TranslateResponse = await res.json();
        return {
            ok: true,
            errors: [],
            message: content
        }

    } catch (error) {
        return {
            ok: false,
            errors: [],
            message: "No se pudo realizar la peticion"
        }
    }
}