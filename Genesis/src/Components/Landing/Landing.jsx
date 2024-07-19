import "./Landing.css";
import community_image from "../../assets/png/landing_community.png";
import project_collaboration_image from "../../assets/svg/landing_project_collaboration.svg";
import project_ideation_image from "../../assets/png/landing_project_ideation.png";
import project_management_image from "../../assets/svg/landing_project_management.svg";
import { Link } from "react-router-dom";
import { SignIn, SignInButton, SignUp, SignUpButton } from "@clerk/clerk-react";

const Landing = () => {
	return (
		<>
			{/* Landing Navbar */}
			<header className="navbar">
				<h6 className="genesis-text">Genesis</h6>
				<div className="button-container">
					<Link to="/login" className="landing-login-button">
						Login
					</Link>
					<Link to="/register" className="landing-register-button">
						Register
					</Link>
					{/* Clerk Buttons */}
					{/* <SignInButton className="landing-login-button" />
					<SignUpButton className="landing-register-button" /> */}
				</div>
			</header>

			<div className="page-container">
				{/* Header */}
				<div className="landing-item-container">
					<div className="landing-info">
						<h2>
							Transform Ideas into <span>Reality</span>
						</h2>
						<p>
							At <b>Genesis</b>, we help you turn your ideas into successful
							projects. Whether you're brainstorming a new concept or managing
							an ongoing project, our platform provides the tools you need to
							bring your vision to life.
						</p>
					</div>
					<img
						className="project-collaboration-image"
						src={project_collaboration_image}
						alt="Project Collaboration Image"
					/>
				</div>

				<h3>What we offer</h3>

				{/* Core Features */}
				<div className="landing-item-container">
					<div className="landing-info">
						<h2>
							We’ll take <span>you</span> to the finish line
						</h2>
						<p>
							Whether you’re looking to come up with a fresh and new innovative
							project idea or are in the middle of project development, we’re
							here to help <b>you</b> stay on track towards project completion.
						</p>
					</div>
					<img
						className="project-management-image"
						src={project_management_image}
						alt="Project Management Image"
					/>
				</div>

				<div className="landing-item-container">
					<div className="landing-info">
						<h2>
							Unleash your project <span>potential</span>
						</h2>
						<p>
							Unleash the power of AI to brainstorm new project features and
							ideas. Our AI tools provide innovative suggestions, helping you
							enhance your projects with cutting-edge concepts and solutions.
							Stay ahead of the curve with AI-driven creativity.
						</p>
					</div>
					<img
						className="project-ideation-image"
						src={project_ideation_image}
						alt="Project Ideation Image"
					/>
				</div>

				<div className="landing-item-container">
					<div className="landing-info">
						<h2>
							Find your <span>community</span>
						</h2>
						<p>
							Connect with like-minded developers and project managers on our
							community forum. Share your projects, get feedback on your ideas,
							and collaborate with others to bring your vision to life. Project
							managers can also use this space to share quick updates and
							feature ideas within their teams, fostering a collaborative and
							innovative environment.
						</p>
					</div>
					<img
						className="community-image"
						src={community_image}
						alt="Community Image"
					/>
				</div>

				{/* Ask user to sign up */}
				<div className="landing-end">
					<h2>What are you waiting for?</h2>
					<p className="landing-register">Register now and get started today</p>
					<Link to="/register" className="landing-register-button">
						Register
					</Link>
				</div>
			</div>
		</>
	);
};

export default Landing;
