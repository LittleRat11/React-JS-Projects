import World_map from '../images/world-map.jpg';
export default function Cards({card, handleChoice, flipped, disabled}) {
    const handleClick = () => {
        if(!disabled) {
            handleChoice(card);
       }
    };

    return (

        <div className="card" key={card.id}>
                <div className={flipped ? "flipped" : ""}>
                        <img src={card.src} alt="card front" className="front" />
                        <img src={World_map}
                            alt="card back"
                            className="back"
                            onClick={() => handleClick()}/>
                </div>
        </div>
)


}