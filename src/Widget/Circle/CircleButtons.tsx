import React from "react";
import styles from './CircleButtons.module.scss';

interface CSSPropertiesWithVars extends React.CSSProperties {
    '--i'?: number;
}

export default function CircleButtons() {

    return (
        <div className={styles.circle}>
            {[...Array(6)].map((_, i) => {
                const style: CSSPropertiesWithVars = { '--i': i };

                return (<button key={i} className={styles.circleBtn} style={style}>
                    {i + 1}
                </button>)
            })}
        </div>
    );
}