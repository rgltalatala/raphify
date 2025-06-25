import styles from './Box.module.scss';

interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

const Box: React.FC<BoxProps> = (props) => {
    const { children, className } = props;

    return (
        <div className={`${styles.box} ${className}`}>
            {children}
        </div>
    )
}

export default Box;