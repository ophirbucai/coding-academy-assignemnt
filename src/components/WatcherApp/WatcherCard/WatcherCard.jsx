import styles from './WatcherCard.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import { LucideEdit3, LucideTrash2, LucideUser2 } from "lucide-react";
import { watcherPropTypes } from "../watcher.propTypes.js";

export function WatcherCard({ color, name, onDelete, onSelect }) {
    return (
        <article className={styles.watcher_card}>
            <div className={styles.watcher_card_avatar} style={{ backgroundColor: color }}>
                <LucideUser2 size={64}/>
            </div>
            <h3>{name}</h3>
            <div className={styles.watcher_card_actions}>
                <button className={styles.contained_button} onClick={onDelete}>
                    <LucideTrash2 size={24}/>
                </button>
                <button className={styles.contained_button} onClick={onSelect}>
                    <LucideEdit3 size={24}/>
                </button>
            </div>
        </article>
    );
};

WatcherCard.propTypes = {
    onSelect: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    ...watcherPropTypes
};
