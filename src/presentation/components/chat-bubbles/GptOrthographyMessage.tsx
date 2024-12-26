
interface Props {
    userScore: number,
    errors: string[],
    message: string
}

export const GptOrthographyMessage = ({userScore, errors, message}: Props) => {
    return(
        <div className="message">
            <div className="message-left">
                G
            </div>
            <div className="message-right">
                <h3>Puntuaje: {userScore}</h3>
                <p>{message}</p>
                {
                    errors.length !== 0 && (
                        <>
                            <h4>Errores encontrados</h4>
                            <ul>
                                {
                                    errors.map( (error, i) => (
                                        <li key={i}>{error}</li>
                                    ))
                                }
                            </ul>
                        </>)
                }
            </div>
        </div>
    )
}