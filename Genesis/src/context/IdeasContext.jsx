import { createContext, useState, useContext } from "react";

const IdeasContext = createContext();

export const useIdeas = () => {
	return useContext(IdeasContext);
};

export const IdeasProvider = ({ children }) => {
	const [ideas, setIdeas] = useState([]);

	return (
		<IdeasContext.Provider value={{ ideas, setIdeas }}>
			{children}
		</IdeasContext.Provider>
	);
};
