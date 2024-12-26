import Markdown from 'react-markdown';

interface Props {
    text: string
}

export const GptMessageMarkdown = ({text}: Props) => {
    return(
        <div className="message">
            <div className="message-left">
                G
            </div>
            <div className="message-right">
                <Markdown>{text}</Markdown>
            </div>
        </div>
    )
}