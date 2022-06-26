import React from 'react'
import style from './loading.module.scss'

interface props {
    overrideStyle?: React.CSSProperties
}

export default function Loading({ overrideStyle }: props) {
    return (
        <div className={style.loadingAnimationHolder} style={overrideStyle}>
            <div className={style.loadingAnimation} />
        </div>
    )
}
