

export async function* ProsConsStreamGeneratorUseCase(prompt: string, signal: AbortSignal) {
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/pros-cons-stream`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt}),
            signal
            // aboirt signal
        });
        
        if(!res.ok) throw new Error(`Error en la petición`);

        const reader = res.body?.getReader();
        if(!reader){
            console.log("No se pudo generar el reader");
            return null;
        }

        const decoder = new TextDecoder();
        let text = '';

        while(true){
            const {done, value} = await reader.read();
            if(done){
                break;
            }
            const decodedChunk = decoder.decode(value, { stream: true });
            text += decodedChunk;
            yield text;
        }
        
    } catch (error) {
        console.log(error);
        return null;
    }
}