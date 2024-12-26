import { OrthographyResponse } from "../../interfaces/orthography.response";


export const orthographyUseCase = async(prompt: string) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/orthograpy-check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt})
        });

        if(!res.ok) throw new Error('No se pudo realizar la petición');

        const data : OrthographyResponse = await res.json();

        return {
            ok: true,
            ...data,
        }
    } catch (error) {
        return {
            ok: false,
            userScore: 0,
            errors: [],
            message: "No se pudo realizar la peticion"
        }
    }
}