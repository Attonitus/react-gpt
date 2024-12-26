interface Props {
    text: string
}

export const UserMessage = ({text}: Props) => {
    return(
        <div className="message user">
            <div className="message-right user-text">
                {text}
            </div>
            <div className="message-left">
                U
            </div>
        </div>
    )
}