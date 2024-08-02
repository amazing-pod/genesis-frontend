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
		setPosts((prevPosts) => [newPost, ...prevPosts]);
	};

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_GENESIS_API_PROD_URL}/threads/posts`
				);
				const sortedPosts = response.data;
				if (filter === "Newest") {
					sortedPosts.sort(
						(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
					);
				} else if (filter === "Oldest") {
					sortedPosts.sort(
						(a, b) => new Date(a.createdAt) - new Date(b.createdAt)
					);
				} else if (filter === "Most Liked") {
					sortedPosts.sort((a, b) => b.likedBy.length - a.likedBy.length);
				}
				console.log("Sorted posts:", sortedPosts);
				setPosts(sortedPosts);
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};

		fetchPosts();
	}, [filter]);

	const toggleCreatePost = () => {
		setShowCreatePost(!showCreatePost);
	};

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const handleCancelCreatePost = () => {
		setShowCreatePost(false);
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
				{showCreatePost && (
					<CreatePost
						onCreatePost={handleCreatePost}
						onCancel={handleCancelCreatePost}
					/>
				)}
				<div className="posts-container">
					{posts.map((post) => (
						<ForumPost key={post.id} post={post} />
					))}
				</div>
			</div>
		</>
	);
};

export default Community;
