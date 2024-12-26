import { useState } from "react"
import { GptMessage } from "../../components/chat-bubbles/GptMessage"
import { UserMessage } from "../../components/chat-bubbles/UserMessage"
import { TextMessageBox } from "../../components/chat-input-boxes/TextMessageBox"
import { TypingLoader } from "../../components/loaders/TypingLoader"
import { TextMessageBoxFile } from "../../components/chat-input-boxes/TextMessageBoxFile"
import { TextMessageBoxSelect } from "../../components/chat-input-boxes/TextMessageBoxSelect"
import { orthographyUseCase } from "../../../core/use-cases"
import { GptOrthographyMessage } from "../../components/chat-bubbles/GptOrthographyMessage"


interface Message{
    text: string,
    isGPT: boolean,
    info? : {
        userScore: number,
        errors: string[],
        message: string
    }
}


export const OrthographyPage = () => {

    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const handleMessage = async(text: string) => {
        setLoading(true);
        setMessages((prev) => [...prev, {text, isGPT: false} ]);

        // USE CASE
        const {errors, message, ok, userScore} = await orthographyUseCase(text);

        if(!ok){
            setMessages((prev) => [...prev, {text: message, isGPT: true} ]);
        } else {
            setMessages((prev) => [...prev, {text: message , isGPT: true,
                info: {
                    errors,
                    message,
                    userScore
                }
            }]);
        }

        setLoading(false);
    }

    return(
        <div className="chat-container">
            <div className="chat-messages">
                <GptMessage text="¡Coloca el texto que desees que revise!" />
                {
                    messages.map( (message, index) => (
                        message.isGPT
                        ? (<GptOrthographyMessage 
                            errors={message.info!.errors}
                            message={message.info!.message}
                            userScore={message.info!.userScore}
                            key={index} />)
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
                {/* <TextMessageBoxFile
                disableCorections
                placeholder="Insert name here" 
                handleSendMessage={handleMessage} /> */}
                {/* <TextMessageBoxSelect
                options={[ {id: "1", text: "hola"},  {id: "2", text: "like him"}]}
                disableCorections
                placeholder="Insert name here" 
                handleSendMessage={handleMessage} /> */}
            </div>
        </div>
    )
}