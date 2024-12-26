import { useRef, useState } from 'react';
import './textmessage.css';

interface Props{
    handleSendMessage: (text: string) => void;
    placeholder : string,
    disableCorections? :boolean,
    accept?: string
}

export const TextMessageBoxFile = ({handleSendMessage, placeholder, disableCorections = false, accept}: Props) => {

    const [message, setMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(message.trim().length === 0) return;
        handleSendMessage(message);
        setMessage('');
    }

    const onSubmitFile = () => {
        if(fileInputRef.current){
           fileInputRef.current.click();
        }
    }

    return(
        <form onSubmit={onSubmit} className="form">

            <div className="file-div">
                <button onClick={onSubmitFile} type='button' className='button-file'>
                    <i className='fa-solid fa-paperclip text-xl'></i>
                </button>
                <input ref={fileInputRef}
                onChange={ (e) => setSelectedFile(e.target.files?.item(0) ) }
                accept={accept} type="file" className='input-file'  />
            </div>

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
                <button
                disabled={ !selectedFile} 
                className="button-send">
                    {
                        !selectedFile
                        ? <span>Enviar</span>
                        : <span>{selectedFile.name.substring(0,10) + "..."}</span>
                    }
                    <i className="fa-regular fa-paper-plane"></i>
                </button>
            </div>

        </form>
    )
}