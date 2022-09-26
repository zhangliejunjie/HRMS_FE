import React from 'react'
import { useState } from "react";
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};
const MyAnimateSelect = ({ content, options }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="menu"
        >
            <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsOpen(!isOpen)}
                className='menu__btn'
            >
                {content}
                <motion.div
                    variants={{
                        open: { rotate: 180 },
                        closed: { rotate: 0 }
                    }}
                    transition={{ duration: 0.2 }}
                    style={{ originY: 0.55 }}
                >
                    <svg width="15" height="15" viewBox="0 0 20 20">
                        <path d="M0 7 L 20 7 L 10 16" />
                    </svg>
                </motion.div>
            </motion.button>
            <motion.ul

                className='menu__ul'
                variants={{
                    open: {
                        clipPath: "inset(0% 0% 0% 0% round 10px)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.7,
                            delayChildren: 0.3,
                            staggerChildren: 0.05
                        }
                    },
                    closed: {
                        clipPath: "inset(10% 50% 90% 50% round 10px)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.3
                        }
                    }
                }}

                style={!isOpen ? { pointerEvents: 'none', display: 'none' } : { pointerEvents: 'auto', position: 'absolute' }}
            >
                {
                    options.map((option) => (
                        <motion.li key={option} className='menu__li' variants={itemVariants} style={{ color: '#45CE7C' }}>
                            {option}
                        </motion.li>
                    ))
                }

            </motion.ul>
        </motion.nav>
    )
}
MyAnimateSelect.propTypes = {
    content: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
}
export default MyAnimateSelect