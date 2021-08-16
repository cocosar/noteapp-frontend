import React from "react"

const Footer = () => {
	const footerStyle = {
		color: "black",
		fontStyle: "italic",
		fontSize: 16,
	}

	return (
		<div style={footerStyle}>
			<br />
			<em>
				Note app, codeada de principio a fin por @cocosar y deployada en Heroku
			</em>
            <p>
                Stack: React, Redux, Nodejs, Express y MongoDB.
            </p>
		</div>
	)
}

export default Footer
