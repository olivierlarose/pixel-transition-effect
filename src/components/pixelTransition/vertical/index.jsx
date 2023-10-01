import React, { useState, useEffect } from 'react'
import styles from './style.module.scss';
import { motion } from 'framer-motion';

const anim = {
    initial: {
        opacity: 0
    },
    open: (delay) => ({
        opacity: 1,
        transition: {duration: 0, delay: 0.02 * delay[1]}
    }),
    closed: (delay) => ({
        opacity: 0,
        transition: {duration: 0, delay: 0.02 * delay[0]}
    })
}

export default function index({menuIsActive}) {

    /**
     * Shuffles array in place (Fisher–Yates shuffle).
     * @param {Array} a items An array containing the items.
     */
    const shuffle = (a) => {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    const getBlocks = (indexOfColum) => {
        const { innerWidth, innerHeight } = window;
        const blockSize = innerHeight * 0.1;
        const nbOfBlocks = Math.ceil(innerWidth / blockSize);
        const shuffledIndexes = shuffle([...Array(nbOfBlocks)].map( (_, i) => i))
        return shuffledIndexes.map( (randomIndex, index) => {
            return (
                <motion.div 
                    key={index} 
                    className={styles.block}
                    variants={anim}
                    initial="initial"
                    animate={menuIsActive ? "open" : "closed"}
                    custom={[indexOfColum + randomIndex, (10 - indexOfColum + randomIndex)]}
                />
            )
        })
    }

    return (
        <div style={{flexDirection:"column"}} className={styles.pixelBackground}>
            {
                [...Array(10)].map( (_, index) => {
                    return <div key={index} className={styles.row}>
                        {
                            getBlocks(index)
                        }
                    </div>
                })
            }
        </div>
    )
}
