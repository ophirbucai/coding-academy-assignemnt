import clsx from "clsx";
import React from 'react';
import PropTypes from 'prop-types';
import styles from './AnimalList.module.css';
import { LucideSearch, RefreshCcw } from "lucide-react";

const titles = ["Name", "Count", "Link"];
export const AnimalList = ({ status, error, animalInfos, refetch }) => {
    return (
        <section>
            <h2>Animal List</h2>
            <div style={{ height: 20 }}>
                {JSON.stringify({ props: { status, error, animalInfos } })}
            </div>
            <table className={styles.animal_list}>
                <thead>
                <tr>
                    {titles.map((title, index) => (
                        <th width="100px" key={`title_${index}`}>{title}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {!error && status === "loading" && (
                    <tr>
                        {Array(titles.length - 1).fill(null).map((_, index) => (
                            <td key={`loading_${index}`}>
                                <div className={styles.placeholder} style={{ "--width": "95%", "--delay": `${index * 150}ms` }}/>
                                <div className={styles.placeholder} style={{ "--width": "65%", "--delay": `${index * 150}ms` }}/>
                            </td>
                        ))}
                        <td>
                            <div className={styles.placeholder_circle} style={{ '--delay': `${150 * (titles.length)}ms` }}/>
                            <div className={styles.placeholder_circle} style={{ '--delay': `${150 * (titles.length + 1)}ms`, marginLeft: 5 }}/>
                        </td>
                    </tr>
                )}
                {error && (
                    <tr>
                        <td align="center" colSpan={titles.length}>
                            <strong className={styles.error_message}>{error}</strong>
                            <button onClick={refetch} className={styles.retry_button}>
                                <RefreshCcw className={clsx(status === "loading" && styles.spin)}/>Retry
                            </button>
                        </td>
                    </tr>

                )}

                {status === "success" && animalInfos?.map((animal, index) => (
                    <tr key={`animal_${index}`}>
                        <td>{animal.name}</td>
                        <td>{animal.count}</td>
                        <td>
                            <a href={`https://www.google.com/search?q=${animal.name}`} target="_blank" className={styles.search_link}>
                                Google It!<LucideSearch/>
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
}

AnimalList.propTypes = {
    animalInfos: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
    })),
    status: PropTypes.oneOf(["loading", "error", "success"]).isRequired,
    error: PropTypes.string,
};
