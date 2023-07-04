import { exp, erf } from "mathjs";
import getDayDifference from "./ttm.ts";

function norm_cdf(x: number) {
  return 0.5 * (1 + erf(x / Math.sqrt(2)));
}

function call_price(
  S: number,
  K: number,
  r: number,
  t: number,
  d1: any,
  d2: number
) {
  const C = norm_cdf(d1) * S - norm_cdf(d2) * K * Math.exp(-r * t);
  return C;
}

function put_price(
  S: number,
  K: number,
  r: number,
  t: number,
  d1: number,
  d2: number
) {
  const C = norm_cdf(-d2) * K * exp(-r * t) - norm_cdf(-d1) * S;
  return C;
}

export function implied_volatility(
  S: number,
  K: number,
  t: number,
  C0: number,
  type: string | undefined
) {
  console.log(S, K, t, C0, type, "implied_volatility");
  t/=365;
  S/=100;
  C0/=100;
  console.log(S, K, t, C0, type, "implied_volatility");

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
      (1 / (vol * Math.sqrt(t))) * (Math.log(S / K) + (r + vol ** 2 / 2) * t);
    const d2 = d1 - vol * Math.sqrt(t);
    if (type === "PE") {
      function_value = put_price(S, K, r, t, d1, d2) - C0;
    } else {
      function_value = call_price(S, K, r, t, d1, d2) - C0;
    }
    const vega = S * norm_cdf(d1) * Math.sqrt(t);
    if (vega === 0) {
      break;
    }
    vol = -function_value / vega + vol;
    epsilon = Math.abs(function_value);
  }
  console.log(vol);
  return vol * 100;
}

// const StockPrice = 19322.55;
// const StrikePice = 19500.0;
// const timeToMaturity = getDayDifference("12AUG23") / 365;
// const LTP = 17.0;

// const impliedVolatility = implied_volatility(S, K, t, C0, type);
// console.log("Implied volatility = ", impliedVolatility);
