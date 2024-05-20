// utils/weightGainCalculation.js

const calculateWeightGain = (previousWeight, previousMonth, currentWeight) => {
    let KBM = 0;
    const bulan = previousMonth + 1;

    switch(bulan) {
        case 0:
            KBM = 0;
            break;
        case 1:
            KBM = 800;
            break;
        case 2:
            KBM = 900;
            break;
        case 3:
            KBM = 800;
            break;
        case 4:
            KBM = 600;
            break;
        case 5:
            KBM = 500;
            break;
        case 6:
            KBM = 400;
            break;
        case 7:
            KBM = 300;
            break;
        case 8:
            KBM = 300;
            break;
        case 9:
            KBM = 300;
            break;
        case 10:
            KBM = 300;
            break;
        default:
            KBM = 200;
            break;
    }

    const KBMCount = (previousWeight * 1000 + KBM) / 1000;
    return currentWeight >= KBMCount ? "Naik" : "Tidak Naik";
}

export default calculateWeightGain;
