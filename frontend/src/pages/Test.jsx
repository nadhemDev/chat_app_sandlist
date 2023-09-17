import React from 'react'

const Test = () => {
    return (
        <div style={{ background: 'red', width: '100vw', height: '100vh', display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
            <div style={{ height: '15%', background: "green", borderRadius: "20px", width: "95%" }}></div>


            <div style={{ display: "flex", width: '100%', height: "100%", gap: "10px", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: '20%', background: 'green', height: '80%', borderRadius: "20px", }} ></div>

                <div style={{ width: '75%', background: 'green', height: '80%', borderRadius: "20px" }}></div>

            </div>
            <div style={{ width: "95%", height: "15%", background: "green", borderRadius: "20px" }}></div>

        </div>
    )
}

export default Test