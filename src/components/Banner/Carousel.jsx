import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../../provider/ContextProvider";
import { TrendingCoins } from "../../config/api";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";


const Carousel = () => {

    const [trending, setTrending] = useState([]);

    const useStyles = makeStyles(() => ({
        carousel: {
            height: "50%",
            display: "flex",
            alignItems: "center",
        },
    }));

    const classes = useStyles();

    const { currency } = CryptoState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);
    };

    console.log(trending);

    useEffect(() => {
        fetchTrendingCoins();
        // eslint-disable-next-line
    }, [currency]);

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    const items = trending.map((coin) => {
        return (
            <Link to={`/coins/${coin.id}`}>
                <img src={coin?.image} alt={coin.name} height="80" style={{ marginBottom: 10 }}/>
            </Link>
        );
    });

    return (
        <div className={classes.carousel}>
            <AliceCarousel mouseTracking infinite autoPlayInterval={1000} animationDuration={1500} disableDotsControls responsive={responsive} autoPlay items={items}/>
        </div>
    );
};

export default Carousel;
