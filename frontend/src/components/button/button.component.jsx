import React, {useRef, useState, useEffect} from 'react';
import './button.styles.scss';

export const Button = ({to, content}) => {

    const canvas = useRef();
    const [position, setPosition] = useState({x: '', y: ''})
    const [distance, setDistance] = useState({})
	// const canvas = document.querySelector('.button__canvas')
    

    
    
    useEffect(()=> {
        const ctx = canvas.current.getContext('2d')
        
    const offset = 32
    const background = '#eef'
    const foreground = '#7551e9'
    
    let points = []
    
        
    setDistance(distance=>({
        value: offset
    }))
    
    const size = () => {
    
        canvas.current.width = canvas.current.getBoundingClientRect().width
        canvas.current.height = canvas.current.getBoundingClientRect().height
            
        setPosition(position => ({
            x: canvas.current.width / 2,
            y: canvas.current.height / 2
        }))
            
        const pixelsWidth = canvas.current.width - offset * 2
        const pixelsHeight = canvas.current.height - offset * 2
            
        const leftTop = [ offset, offset ]
        const rightTop = [ canvas.current.width - offset, offset ]
        const rightBottom = [ canvas.current.width - offset, canvas.current.height - offset ]
        const leftBottom = [ offset, canvas.current.height - offset ]
            
            points = []
    
            Array(pixelsWidth).fill().forEach((_, index) => {
                points.push([
                    leftTop[0] + index,
                    leftTop[1]
                ])
            })
            
            Array(pixelsHeight).fill().forEach((_, index) => {
                points.push([
                    rightTop[0],
                    rightTop[1] + index
                ])
            })
            
            Array(pixelsWidth).fill().forEach((_, index) => {
                points.push([
                    rightBottom[0] - index,
                    rightBottom[1]
                ])
            })
            
            Array(pixelsHeight).fill().forEach((_, index) => {
                points.push([
                    leftBottom[0],
                    leftBottom[1] - index
                ])
            })
            
        }
    
        size()
        
        const reset = () => {
    
            ctx.fillStyle = background
            ctx.fillRect(0, 0, canvas.current.width, canvas.current.height)
    
        }
    
        const draw = () => {
    
            ctx.fillStyle = foreground
            ctx.beginPath()
            
            points.forEach((point, index) => {
                
                const [ vx, vy ] = attract(point)
                            
                if (index === 0) ctx.moveTo(vx, vy)
                else ctx.lineTo(vx, vy)
                            
            })
            
            ctx.closePath()
            ctx.fill()
    
        }
        
        const attract = (point) => {
                    
            const [ x, y ] = point
    
            const dx = x - position.x
            const dy = y - position.y
            
            const dist = Math.sqrt(dx * dx + dy * dy)
            const dist2 = Math.max(1, dist)
            
            const d = Math.min(dist2, Math.max(12, (dist2 / 4) - dist2))
            const D = dist2 * distance.value
            
            return [
                x + (d / D) * (position.x - x),
                y + (d / D) * (position.y - y)
            ]
    
        }
    
        const loop = () => {
            reset()
            draw()
            requestAnimationFrame(loop)
        }
    
        window.onresize = size
    
        canvas.current.onmousemove = (e) => {
    
            setPosition({
                x: e.clientX - e.target.getBoundingClientRect().left,
                y: e.clientY - e.target.getBoundingClientRect().top
            })
        
        }
        
        canvas.current.onmouseenter = () => {
            
            setDistance({
                value: 1
            })
            
        }
        
        canvas.current.onmouseleave = () => {
            
            setPosition({
                x: canvas.current.width / 2,
                y: canvas.current.height / 2
            })
            
            setDistance({
                value: offset
            })
            
        }
    
        loop()
    }, [canvas])

    return (
        <a 
            href={to} 
            onClick={console.log('hi')}
            className='waterbutton'
        >
            <canvas ref={canvas} class="waterbutton__canvas"></canvas>
            <span class="waterbutton__text">{content}</span>
        </a>
  )
};
