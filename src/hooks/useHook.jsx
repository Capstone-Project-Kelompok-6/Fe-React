import { useState } from "react";
import { useDebounce } from "use-debounce";

const useHook = () => {
	const [actionDropdown, setActionDropdown] = useState(false);
	const [modalCreateTrigger, setModalCreateTrigger] = useState(false);
	const [modalEditTrigger, setModalEditTrigger] = useState(false);
	const [searchTrigger, setSearchTrigger] = useState(false);
	const [keyword, setKeyword] = useState("");
	const [activeLink, setActiveLink] = useState([]);
	const [activeFilter, setActiveFilter] = useState(0);
	const [debouncedKeyword] = useDebounce(keyword, 1300);

	return {
		modalCreateTrigger,
		setModalCreateTrigger,
		modalEditTrigger,
		setModalEditTrigger,
		actionDropdown,
		setActionDropdown,
		debouncedKeyword,
		keyword,
		setKeyword,
		searchTrigger,
		setSearchTrigger,
		activeLink,
		setActiveLink,
		activeFilter,
		setActiveFilter,
	};
};

export default useHook;
