import PropTypes from "prop-types";

export const watcherPropTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    movies: PropTypes.arrayOf(PropTypes.string).isRequired,
    color: PropTypes.string.isRequired,
}