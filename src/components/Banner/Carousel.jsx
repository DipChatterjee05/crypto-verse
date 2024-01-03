import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../../provider/ContextProvider";
import { TrendingCoins } from "../../config/api";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../CoinsTable";

const Carousel = () => {
    const [trending, setTrending] = useState([]);
    const { currency, symbol } = CryptoState();

    const useStyles = makeStyles(() => ({
        carousel: {
            height: "50%",
            display: "flex",
            alignItems: "center",
        },
        carouselItem: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            textTransform: "uppercase",
            color: "white",
        },
    }));

    const classes = useStyles();

    const fetchTrendingCoins = async () => {
        try {
            const { data } = await axios.get(TrendingCoins(currency));
            setTrending(data);
        } catch (error) {
            console.log("error:", error);
        }
    };

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
        let profit = coin.price_change_percentage_24h >= 0;
        return (
            <Link to={`/coins/${coin.id}`} className={classes.carouselItem}>
                <img src={coin?.image} alt={coin.name} height="80" style={{ marginBottom: 10 }} />
                <span>{coin?.symbol}&nbsp;<span style={{ color: profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight: 500 }}>{profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%</span></span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>{symbol} {numberWithCommas(coin?.current_price.toFixed(2))}</span>
            </Link>
        );
    });

    return (
        <div className={classes.carousel}>
            <AliceCarousel mouseTracking infinite autoPlayInterval={1000} animationDuration={1500} disableDotsControls disableButtonsControls responsive={responsive} autoPlay items={items} />
        </div>
    );
};

export default Carousel;
