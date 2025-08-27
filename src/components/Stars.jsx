import { useState } from "react"

const ratingContainerStyle = {
    display: "flex",
    columnGap: "10px",
    alignItems: "center"
}
const starsContainerStyle = {
    display: "flex",
    columnGap: "3px",
}

export default function Stars({maxRating = 5, color = '#fcc419', size = 20, rating, setRating}){
    const [hoverRating, setHoverRating] = useState(0)
    const textStyling = {
      lineHeight: "1",
      color,
      fontSize: `20px`
    };
    return <div style={ratingContainerStyle}>
        <div style={starsContainerStyle} className="stars">
            {
                Array.from({length:maxRating}, (_, i) => (
                    <Star key={i} 
                        index={i+1} 
                        rating={rating} 
                        setRating={setRating} 
                        hoverRating={hoverRating}
                        setHoverRating={setHoverRating}
                        color={color}
                        size={size}
                    />
                ))
            }
        </div>
        <p style={textStyling}> {(hoverRating || rating)} </p>
    </div>
}
function Star({index, rating, setRating, setHoverRating, hoverRating ,color = '#fcc419', size = 30}){
    const starStyle = {
        width: `${size}px`,
        height: `${size}px`,
        display: "block",
        cursor: "pointer"
    }
    const fullStar = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill={color}
        stroke={color}
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    );
    const emptyStar = (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke= {color}
        >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
        </svg>
    )
    function handleHover(){
        setHoverRating(index)
    }
    function handleMouseOut(){
        setHoverRating(0)
    }
    function handleClick(){
        setRating(index)
    }
    return (
            <span onClick={handleClick} onMouseOut={handleMouseOut}  onMouseOver={handleHover} style={starStyle} role="button">
                {
                    index <= (hoverRating || rating) ? fullStar : emptyStar
                }
            </span>
    )
}
/*

*/