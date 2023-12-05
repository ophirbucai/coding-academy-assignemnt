import styles from './SelectApp.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";
import { apps } from "../../constants/apps.js";


export function SelectApp({ selectApp, selectedAppIndex }) {
    return (
        <div className={styles.select_app}>
            <button className={styles.select_app_button} onClick={() => selectApp(selectedAppIndex - 1)}><LucideArrowLeft width={13} height={13} /></button>
            <select className={styles.select_app_select} onChange={(e) => selectApp(e.target.value)} value={selectedAppIndex}>
                {apps.map((option, index) => (
                    <option value={index} key={`option_${index}`}>{option.label}</option>
                ))}
            </select>
            <button className={styles.select_app_button} onClick={() => selectApp(selectedAppIndex + 1)}><LucideArrowRight width={13} height={13} /></button>
        </div>
    )
}

SelectApp.propTypes = {
    selectApp: PropTypes.func.isRequired,
    selectedAppIndex: PropTypes.number.isRequired,
};
