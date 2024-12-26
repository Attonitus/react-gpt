import { useState } from 'react';
import './textmessage.css';

interface Props{
    handleSendMessage: (text: string) => void;
    placeholder : string,
    disableCorections? :boolean
}

export const TextMessageBox = ({handleSendMessage, placeholder, disableCorections = false}: Props) => {

    const [message, setMessage] = useState('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(message.trim().length === 0) return;
        handleSendMessage(message);
        setMessage('');
    }


    return(
        <form onSubmit={onSubmit} className="form">
            <div className="input-box">
                <input
                autoFocus
                name="message"
                value={message}
                className="input"
                onChange={(e) => setMessage(e.target.value)}
                placeholder={placeholder}
                autoComplete={disableCorections ? 'on' : 'off'} 
                autoCorrect={disableCorections ? 'on' : 'off'}
                spellCheck={disableCorections ? 'true' : 'false'}
                type="text" />
            </div>

            <div className="button-box">
                <button className="button-send">
                    <span>Enviar</span>
                    <i className="fa-regular fa-paper-plane"></i>
                </button>
            </div>

        </form>
    )
}