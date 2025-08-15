import React from 'react';

function ObjectDisplay({object}) {
    return (
        <pre
            style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
            }}
        >
            {/* Display Data */}
            {JSON.stringify(object, null, 2)}
        </pre>
    );
}

export default ObjectDisplay;