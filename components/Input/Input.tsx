import { forwardRef } from "react";

import styles from './Input.module.scss'

interface InputProps 
    extends React.InputHTMLAttributes<HTMLInputElement> {} 

const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    type,
    disabled,
    ...props
}, ref) => {
    return (
        <input 
            type={type} 
            className={`${className} ${styles.input}`} 
            disabled={disabled}
            ref={ref}  
            {...props}
        />
    )
});

Input.displayName = "Input";

export default Input;