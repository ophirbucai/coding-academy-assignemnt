import styles from './WatcherModal.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import { watcherPropTypes } from "../watcher.propTypes.js";
import { LucideCheckCircle, LucideEdit2 } from "lucide-react";

export function WatcherModal({ name, updateWatcher, id, color, movies, onClose }) {
    const [isEditing, setIsEditing] = React.useState(false);
    const [fieldName, setFieldName] = React.useState(name);
    async function updateName() {
        const success = await updateWatcher(id, { name: fieldName });
        if (success) {
            setIsEditing(false);
        } else {
            alert("Something went wrong");
        }
    }

    function cancelUpdateName() {
        setFieldName(name);
        setIsEditing(false);
    }

    return (
        <div className={styles.watcher_modal} style={{ '--background': color }}>
            <div className={styles.watcher_modal_content}>
                <header className={styles.watcher_modal_content_header}>
                    <h2>
                        {isEditing ? (
                            <WatcherModalNameInput name={fieldName} onChange={e => setFieldName(e.target.value)} onSave={updateName} onCancel={cancelUpdateName} />
                        ) : (
                            <button
                                className={styles.watched_modal_name_editable}
                                onClick={() => setIsEditing(true)}
                            >
                                {name} <LucideEdit2 size={15} />
                            </button>
                        )}
                    </h2>
                </header>
                <section className={styles.watcher_modal_content_body}>
                    <h3>Movies:</h3>
                    <ul>
                        {movies.map(movie => (
                            <li key={movie}>{movie}</li>
                        ))}
                    </ul>
                </section>
                <footer className={styles.watcher_modal_content_footer}>
                    <button styles={styles.contained_button} onClick={onClose}>Close</button>
                </footer>
            </div>
            <button className={styles.watcher_modal_overlay} onClick={onClose}></button>
        </div>
    );
};

function WatcherModalNameInput({ name, onChange, onCancel, onSave }) {
    return (
        <form className={styles.watcher_modal_name_input} onSubmit={(e) => {
            e.preventDefault();
            onSave();
        }}>
            <input autoFocus className={styles.stripped_input} type="text" value={name} onChange={onChange} onBlur={onCancel}/>
            <button type="submit" className={styles.watcher_modal_name_input_save}>
                <LucideCheckCircle color="lightgreen" size={18}/>
            </button>
        </form>
    );
}

WatcherModal.propTypes = {
    ...watcherPropTypes,
    updateWatcher: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};
