import { useEffect } from 'react';
import './Snackbar.css';

function Snackbar({ message, show, onClose }) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, 2500);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    return show ? (
        <div className="snackbar">
            {message}
        </div>
    ) : null;
}

export default Snackbar;
