import './button.style.component.scss'

const BUTTON_TYPES_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({text, buttonType, isLoading, ...otherProps})=> {
    return (
        <button disabled={isLoading} className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`} {...otherProps}>
            {
                !isLoading ? 
                (text)
                :
                (
                    <div className='button-spinner-overlay'>
                        <div className='button-spinner-container'></div>
                    </div>
                )
            }
        </button>
    )
}

export default Button;