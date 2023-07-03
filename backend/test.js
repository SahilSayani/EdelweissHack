const math = require("mathjs");

function norm_cdf(x) {
    return 0.5 * (1 + math.erf(x / Math.sqrt(2)));
}

function call_price(S, K, r, t, d1, d2) {
    const C = norm_cdf(d1) * S - norm_cdf(d2) * K * Math.exp(-r * t);
    return C;
}

function put_price(S, K, r, t, d1, d2) {
    C = norm_cdf(-d2) * K * exp(-r * t) - norm_cdf(-d1) * S;
    return C;
}

export function implied_volatility(S, K, r, t, C0, type) {
    let r = 0.05;
    let epsilon = 1.0;
    let abstol = 1e-4;
    let max_itr = 1000;
    let vol = 0.12;
    let function_value = 0;

    for (let i = 0; i < max_itr; i++) {
        if (epsilon <= abstol) {
            break;
        }
        const d1 =
            (1 / (vol * Math.sqrt(t))) *
            (Math.log(S / K) + (r + vol ** 2 / 2) * t);
        const d2 = d1 - vol * Math.sqrt(t);
        if (type === "PE") {
            function_value = put_price(vol, S, K, r, t, d1, d2) - C0;
        } else {
            function_value = call_price(vol, S, K, r, t, d1, d2) - C0;
        }
        const vega = S * norm_cdf(d1) * Math.sqrt(t);
        if (vega === 0) {
            break;
        }
        vol = -function_value / vega + vol;
        epsilon = Math.abs(function_value);
    }
    return vol * 100;
}

const StockPrice = 19322.55;
const StrikePice = 19500.0;
const timeToMaturity = 3.0 / 365;
const LTP = 17.0;

const impliedVolatility = implied_volatility(
    StockPrice,
    StrikePice,
    timeToMaturity,
    LTP
);
console.log("Implied volatility = ", impliedVolatility);
