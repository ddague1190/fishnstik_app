const TextBox = (props) => {
    return (
        <svg viewBox="0 0 0 100" width="100" height="100">
            <text style={{fontSize: props.fontSize}}ref={props.forwardRef} x="0" y="50">{props.fontSize}</text>
        </svg>
    )
}

export default TextBox;