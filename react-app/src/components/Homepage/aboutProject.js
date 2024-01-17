import React from "react";
import Col from "react-bootstrap/Col";

function AboutTheProject() {
   return (
      <Col className="about-me-div">
         <h1>About the Project</h1>
         <p>
            The culmination of my intensive training at App Academy, "BitBabble"
            stands as a testament to the practical and technical skills I honed
            during my course. This project, inspired by the popular
            communication platform Slack, is more than just a clone; it's a
            robust, real-time messaging application that showcases my ability to
            translate complex concepts into functional, user-friendly software.
            <br></br>
            <br></br>
            At the heart of BitBabble lies its fully implemented web sockets
            technology, allowing for seamless, instant communication among
            users. This core feature not only demonstrates my proficiency in
            handling real-time data transmission but also underscores my
            commitment to creating interactive and responsive web applications.
            The user interface is designed to be intuitive and engaging,
            ensuring that the platform is accessible to users with varying
            levels of technical expertise.
            <br></br>
            <br></br>
            Throughout the development process, I employed agile methodologies,
            adapting to challenges and incorporating feedback to refine the
            application. This iterative approach was crucial in implementing
            features such as channels, messaging and workspaces all while
            maintaining a sleek and modern design. The back-end architecture,
            built using flask supports these features and ensures a smooth,
            uninterrupted user experience.
            <br></br>
            <br></br>
            My journey in creating BitBabble has been one of both challenge and
            immense growth. It stands as a showcase of my technical
            capabilities, particularly in JavaScript, React, and web socket
            technologies, and represents a significant milestone in my software
            development career. This project is not just a requirement for my
            capstone at App Academy; it's a symbol of my passion for coding and
            my readiness to contribute to the tech industry as a skilled and
            innovative developer.
         </p>
      </Col>
   );
}

export default AboutTheProject;
