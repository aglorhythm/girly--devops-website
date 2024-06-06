export const setCardBox = {
    flexGrow: "1 0",
    width: [
        "calc(100% * (1/2) - 10px - 1px)", 
        "calc(100% * (1/2) - 10px - 1px)", 
        "calc(100% * (1/4) - 10px - 1px)", 
        "calc(100% * (1/4) - 10px - 1px)",
        "calc(100% * (1/5) - 10px - 1px)"
    ],
    vendorListWidth: [
        "calc(100% * (1/2) - 10px - 1px)", 
        "calc(100% * (1/2) - 10px - 1px)", 
        "calc(100% * (1/4) - 10px - 1px)", 
        "calc(100% * (1/4) - 10px - 1px)",],
    margin: "5px"
}



export const breakpoints = {
    xs: '360px', 
    sm: '768px', 
    md: '1024px', 
    lg: '1280px', 
    xl: '1500px', 
    xxl: '2000'
}

export const formatNumber = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(2) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(2) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(2) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};