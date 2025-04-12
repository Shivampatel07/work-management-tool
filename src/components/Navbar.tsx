import { PanelLeftOpen } from 'lucide-react'
import React from 'react'
import { motion } from 'motion/react' // Import motion from framer-motion

export default function Navbar({ hideShowSideBar }: { hideShowSideBar: () => void }) {
	const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

	const handleSidebarToggle = () => {
		setIsSidebarOpen((prev) => !prev); // Toggle the state
		hideShowSideBar(); // Call the parent function to toggle the sidebar
	};

	return (
		<div className='md:hidden sticky bg-secondary dark:bg-secondary border-b border-border-color1 py-2 px-2 w-full'>
			<motion.div
				animate={{ rotate: isSidebarOpen ? 180 : 0 }} // Rotate 180 degrees when open
				transition={{ duration: 0.3, ease: 'easeInOut' }} // Smooth transition
				className='w-6 h-6'
			>
				<PanelLeftOpen
					className='w-6 h-6 text-text3 dark:text-text3 cursor-pointer'
					onClick={handleSidebarToggle}
				/>
			</motion.div>
		</div>
	);
}