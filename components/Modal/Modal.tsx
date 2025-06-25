import * as Dialog from "@radix-ui/react-dialog"
import { IoMdClose } from "react-icons/io";

import styles from './Modal.module.scss';

interface ModalProps {
    isOpen: boolean;
    onChange: (open: boolean) => void;
    title: string;
    description: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = (props) => {
    const {
        isOpen,
        onChange,
        title,
        description,
        children,
    } = props;

    return ( 
        <Dialog.Root
            open={isOpen}
            defaultOpen={isOpen}
            onOpenChange={onChange}
        >
            <Dialog.Portal>
                <Dialog.Overlay className={styles.modalOverlay}>
                    <Dialog.Content className={styles.modalContent}>
                        <Dialog.Title className={styles.modalTitle}>
                            {title}
                        </Dialog.Title>
                        <Dialog.Description className={styles.modalDescription}>
                            {description}
                        </Dialog.Description>
                        <div>
                            {children}
                        </div>
                        <Dialog.Close asChild>
                            <button className={styles.modalCloseButton} aria-label="Close">
                                <IoMdClose/>
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
     );
}
 
export default Modal;