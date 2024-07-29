import { createContext, useState, useContext } from "react";

const DropdownContext = createContext();

export const useDropdown = () => {
	return useContext(DropdownContext);
};

export const DropdownProvider = ({ children }) => {
	const [option, setOption] = useState("");

	return (
		<DropdownContext.Provider value={{ option, setOption }}>
			{children}
		</DropdownContext.Provider>
	);
};
