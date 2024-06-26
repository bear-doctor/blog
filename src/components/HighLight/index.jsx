import React from 'react'

function Highlight({children, color="#fbb656"}) {
    return (
        <span style={{
            backgroundColor: color,
            borderRadius: '2px',
            color: '#fff',
            padding: '0.2rem',
        }}>
        {children}
        </span>
    )
}

export default Highlight
    