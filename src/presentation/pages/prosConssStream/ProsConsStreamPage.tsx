import { useRef, useState } from "react"
import { GptMessage } from "../../components/chat-bubbles/GptMessage";
import { GptMessageMarkdown } from "../../components/chat-bubbles/GptMessageMarkdown";
import { UserMessage } from "../../components/chat-bubbles/UserMessage";
import { TypingLoader } from "../../components/loaders/TypingLoader";
import { TextMessageBox } from "../../components/chat-input-boxes/TextMessageBox";
import { ProsConsStreamGeneratorUseCase, ProsConsStreamUseCase } from "../../../core/use-cases";

interface Message{
    text: string,
    isGPT: boolean
}

export const ProsConsStreamPage = () => {
    const abortController = useRef(new AbortController());
    const isRunning = useRef(false);

    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const handleMessage = async(text: string) => {
        if(isRunning.current){
            abortController.current.abort();
            abortController.current = new AbortController();
        }

        setLoading(true);
        isRunning.current = true;
        setMessages((prev) => [...prev, {text, isGPT: false} ]);

        const stream = ProsConsStreamGeneratorUseCase(text, abortController.current.signal);
        setLoading(false);

        setMessages( (messages) => [...messages, {text: '', isGPT: true}]);

        for await (const text of stream) {
            setMessages( (messages) => {
                const newMessages = [...messages];
                newMessages[newMessages.length -1].text = text;
                return newMessages;
            });
        }

        isRunning.current = false;
        // USE CASE
        // const reader = await ProsConsStreamUseCase(text);
        // setLoading(false);

        // if(!reader) return alert('No se pudo generar el reader')
        // // Generar ultimo mensaje

        // const decoder = new TextDecoder();
        // let message = '';

        // setMessages((messages) => [...messages, {text: message, isGPT: true} ]);

        // while(true){
        //     const {done, value} = await reader.read();
        //     if(done){
        //         break;
        //     }
        //     const decodedChunk = decoder.decode(value, { stream: true });
        //     message += decodedChunk;

        //     setMessages( (messages) => {
        //         const newMessages = [...messages];
        //         newMessages[newMessages.length -1].text = message;
        //         return newMessages;
        //     });
        // }


        // isGTP true
    }

    return(
        <div className="chat-container">
            <div className="chat-messages">
                <GptMessage text="¿Qué deseas comparar?" />
                {
                    messages.map( (message, index) => (
                        message.isGPT
                        ? (<GptMessageMarkdown key={index} text={message.text} />)
                        : (<UserMessage key={index} text={message.text} />)
                    ))
                }

                {
                    loading && <TypingLoader className="transition" />
                }
            </div>

            <div className="chat-input">
                <TextMessageBox
                disableCorections
                placeholder="Insert name here" 
                handleSendMessage={handleMessage} />
            </div>
        </div>
    )
}