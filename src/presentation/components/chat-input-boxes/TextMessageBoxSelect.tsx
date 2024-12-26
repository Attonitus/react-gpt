import { useState } from 'react';
import './textmessage.css';

interface Option {
    id: string,
    text: string
}


interface Props{
    handleSendMessage: (text: string, lang: string) => void;
    placeholder : string,
    disableCorections? :boolean,
    options: Option[]
}


export const TextMessageBoxSelect = ({handleSendMessage, placeholder, disableCorections = false, options}: Props) => {

    const [message, setMessage] = useState('');
    const [selectedOption, setSelectedOption] = useState<string>('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(message.trim().length === 0) return;
        handleSendMessage(message, selectedOption);
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

                <select name="select" value={selectedOption}
                onChange={e => setSelectedOption(e.target.value)}
                className='select'>
                    <option value="">Seleccione: </option>
                    {
                        options.map( ({id, text}) => (
                            <option key={id} value={id}>{text}</option>
                        ))
                    }
                </select>
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


