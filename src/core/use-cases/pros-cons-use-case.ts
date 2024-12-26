

export const ProsConsUseCase = async(prompt: string) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/pros-cons`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt})
        });
        
        if(!res.ok) throw new Error(`Error en la petición`);

        const json = await res.json();

        return {
            ok: true,
            message: json
        }
    } catch (error) {
        return {
            ok: false,
            message: `Error en la peticion: ${error}`
        }
    }
}