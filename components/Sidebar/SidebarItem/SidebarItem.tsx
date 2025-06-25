import Link from "next/link";
import { IconType } from "react-icons";
import styles from './SidebarItem.module.scss';

interface SidebarItemProps {
    icon: IconType;
    label: string;
    active?: boolean;
    href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = (props) => {
    const { 
        icon: Icon, 
        label, 
        active, 
        href 
    } = props;

    return (
        <Link
            href={href}
            className={`${styles.sidebarItem} ${active ? styles.active : ''}`}
        >
            <Icon className={styles.sidebarItemIcon} size={26}/>
            <p className={styles.label}>{label}</p>
        </Link>
    )
}

export default SidebarItem;