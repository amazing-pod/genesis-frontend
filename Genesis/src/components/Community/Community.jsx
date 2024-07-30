import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Community.css";
import Header from "../Shared/Header/Header";
import dropdown_icon from "../../assets/png/dropdown_icon.png";
import CreatePost from "./ForumPost/CreatePost";
import ForumPost from "./ForumPost/ForumPost";

const MiniNavbar = ({
	filter,
	setFilter,
	toggleCreatePost,
	dropdownOpen,
	toggleDropdown,
}) => {
	const handleDropdownItemClick = (filterName) => {
		setFilter(filterName);
		toggleDropdown();
	};

	const handleOutsideClick = (event) => {
		if (!event.target.closest(".dropdown") && dropdownOpen) {
			toggleDropdown();
		}
	};

	useEffect(() => {
		window.addEventListener("click", handleOutsideClick);
		return () => {
			window.removeEventListener("click", handleOutsideClick);
		};
	}, [dropdownOpen]);

	return (
		<div className="mini-navbar">
			<div className="dropdown">
				<div className="dropdown-view">
					<button onClick={toggleDropdown} className="community-dropbtn">
						{filter}
						<img
							className="dropdown-icon"
							src={dropdown_icon}
							alt="dropdown icon"
						/>
					</button>
				</div>
				<div
					className={`community-dropdown-content ${dropdownOpen ? "show" : ""}`}
				>
					<p onClick={() => handleDropdownItemClick("Newest")}>Newest</p>
					<p onClick={() => handleDropdownItemClick("Oldest")}>Oldest</p>
					<p onClick={() => handleDropdownItemClick("Most Liked")}>
						Most Liked
					</p>
				</div>
			</div>
			<p className="new-post" onClick={toggleCreatePost}>
				New Post +
			</p>
		</div>
	);
};

const Community = () => {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState("Newest");
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [showCreatePost, setShowCreatePost] = useState(false);

	const handleCreatePost = (newPost) => {
		setPosts((posts) => [newPost, ...posts]);
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await axios.get(
				`${import.meta.env.VITE_GENESIS_API_PROD_URL}/threads/posts`
			);
			console.log(response.data);
			setPosts(response.data);
		};
		fetchPosts();
		sortPosts(filter);
	}, [filter]);

	const sortPosts = (filter) => {
		let sorted = [...posts];
		if (filter === "Oldest") {
			sorted.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
		} else if (filter === "Newest") {
			sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
		} else if (filter === "Most Liked") {
			sorted.sort((a, b) => b.likeCount - a.likeCount);
		}
		setPosts(sorted);
	};

	const toggleCreatePost = () => {
		setShowCreatePost(!showCreatePost);
	};

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	return (
		<>
			<Header />
			<div className="community-page-container">
				<MiniNavbar
					filter={filter}
					setFilter={setFilter}
					toggleCreatePost={toggleCreatePost}
					dropdownOpen={dropdownOpen}
					toggleDropdown={toggleDropdown}
				/>
				<h2>Community Discussion</h2>
				<hr />
				{showCreatePost && <CreatePost onCreatePost={handleCreatePost} />}
				<div className="posts-container">
					{posts.map((post, index) => (
						<ForumPost key={index} post={post} />
					))}
				</div>
			</div>
		</>
	);
};

export default Community;
