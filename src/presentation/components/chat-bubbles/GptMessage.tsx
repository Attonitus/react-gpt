
interface Props {
    text: string
}

export const GptMessage = ({text}: Props) => {
    return(
        <div className="message">
            <div className="message-left">
                G
            </div>
            <div className="message-right">
                {text}
            </div>
        </div>
    )
}