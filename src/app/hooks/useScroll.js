import { useEffect, useState } from "react";

export const useScroll = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			if (scrollTop > 10) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

    const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

    const handleSmoothScroll = (e, targetId) => {
		e.preventDefault();
		setIsMenuOpen(false);
		const targetElement = document.querySelector(targetId);
		if (targetElement) {
			window.scrollTo({
				top: targetElement.offsetTop - 50,
				behavior: "smooth",
			});
		}
	};

    return {
        handleSmoothScroll,
        toggleMenu,
        setIsMenuOpen,
        isScrolled,
        isMenuOpen
    }
};
