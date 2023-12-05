import styles from './WatcherCard.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import { LucideCross, LucideRotateCw, LucideUser2 } from "lucide-react";

export function WatcherCardEmpty({ onSelect }) {
    return (
        <div className={styles.watcher_card} style={{ position: "relative", cursor: "pointer" }} onClick={onSelect}>
            <div className={styles.watcher_card_avatar}>
                <LucideUser2 size={64} strokeWidth={1} />
            </div>
            <div style={{ position: "absolute", top: "75px", right: "30px" }}><LucideCross size={30} strokeWidth={3} /></div>
            <div className={styles.watcher_card_add_new}>
                Add a new watcher
            </div>
        </div>
    );
};

WatcherCardEmpty.propTypes = {
    onSelect: PropTypes.func.isRequired,
};
