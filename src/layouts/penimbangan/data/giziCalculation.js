const giziCalculation = (usia, bb, jenis_kelamin) => {
    const zScore = (bb, median, plusOneSd, minOneSd) => {
        if (bb - median < 0) {
            return (bb - median) / (median - minOneSd);
        } else {
            return (bb - median) / (plusOneSd - median);
        }
    };

    const data = {
        'Laki-Laki': {
            0: { median: 3.3, plusOneSd: 3.9, minOneSd: 2.9 },
            1: { median: 4.5, plusOneSd: 5.1, minOneSd: 3.9 },
            2: { median: 5.6, plusOneSd: 6.3, minOneSd: 4.9 },
            3: { median: 6.4, plusOneSd: 7.2, minOneSd: 5.7 },
            4: { median: 7.0, plusOneSd: 7.8, minOneSd: 6.2 },
            5: {
                median: 7.5,
                plusOneSd: 8.4,
                minOneSd: 6.7,
              },
              6: {
                median: 7.9,
                plusOneSd: 8.8,
                minOneSd: 7.1,
              },
              7: {
                median: 8.3,
                plusOneSd: 9.2,
                minOneSd: 7.5,
              },
              8: {
                median: 8.6,
                plusOneSd: 9.6,
                minOneSd: 7.8,
              },
              9: {
                median: 8.9,
                plusOneSd: 9.9,
                minOneSd: 8.2,
              },
              10: {
                median: 9.2,
                plusOneSd: 10.2,
                minOneSd: 8.6,
              },
              11: {
                median: 9.4,
                plusOneSd: 10.5,
                minOneSd: 8.8,
              },
              12: {
                median: 9.6,
                plusOneSd: 10.8,
                minOneSd: 9.0,
              },
              13: {
                median: 9.9,
                plusOneSd: 11.0,
                minOneSd: 9.2,
              },
              14: {
                median: 10.1,
                plusOneSd: 11.3,
                minOneSd: 9.4,
              },
              15: {
                median: 10.3,
                plusOneSd: 11.5,
                minOneSd: 9.6,
              },
              16: {
                median: 10.5,
                plusOneSd: 11.7,
                minOneSd: 9.8,
              },
              17: {
                median: 10.7,
                plusOneSd: 12.0,
                minOneSd: 10.0,
              },
              18: {
                median: 10.9,
                plusOneSd: 12.2,
                minOneSd: 10.2,
              },
              19: {
                median: 11.1,
                plusOneSd: 12.4,
                minOneSd: 9.8,
              },
              20: {
                median: 11.3,
                plusOneSd: 12.7,
                minOneSd: 10.0,
              },
              21: {
                median: 11.5,
                plusOneSd: 12.9,
                minOneSd: 10.2,
              },
              22: {
                median: 11.7,
                plusOneSd: 13.1,
                minOneSd: 10.4,
              },
              23: {
                median: 11.9,
                plusOneSd: 13.3,
                minOneSd: 10.6,
              },
                24: {
                    median: 12.2,
                    plusOneSd: 13.6,
                    minOneSd: 10.8,
                },
                25: {
                    median: 12.4,
                    plusOneSd: 13.9,
                    minOneSd: 11.0,
                },
                26: {
                    median: 12.5,
                    plusOneSd: 14.1,
                    minOneSd: 11.2,
                },
                27: {
                    median: 12.7,
                    plusOneSd: 14.3,
                    minOneSd: 11.3,
                },
                28: {
                    median: 12.9,
                    plusOneSd: 14.5,
                    minOneSd: 11.5,
                },
                29: {
                    median: 13.1,
                    plusOneSd: 14.8,
                    minOneSd: 11.7,
                },
                30: {
                    median: 13.3,
                    plusOneSd: 15.0,
                    minOneSd: 11.8,
                },
                31: {
                    median: 13.5,
                    plusOneSd: 15.2,
                    minOneSd: 12.0,
                },
                32: {
                    median: 13.7,
                    plusOneSd: 15.4,
                    minOneSd: 12.1,
                },
                33: {
                    median: 13.8,
                    plusOneSd: 15.6,
                    minOneSd: 12.3,
                },
                34: {
                    median: 14.0,
                    plusOneSd: 15.8,
                    minOneSd: 12.4,
                },
                35: {
                    median: 14.2,
                    plusOneSd: 16.0,
                    minOneSd: 12.6,
                },
                36: {
                    median: 14.3,
                    plusOneSd: 16.2,
                    minOneSd: 12.7,
                },
                37: {
                    median: 14.5,
                    plusOneSd: 16.4,
                    minOneSd: 12.9,
                },
                38: {
                    median: 14.7,
                    plusOneSd: 16.6,
                    minOneSd: 13.0,
                },
                39: {
                    median: 14.8,
                    plusOneSd: 16.8,
                    minOneSd: 13.1,
                },
                40: {
                    median: 15.0,
                    plusOneSd: 17.0,
                    minOneSd: 13.3,
                },
                41: {
                    median: 15.2,
                    plusOneSd: 17.2,
                    minOneSd: 13.4,
                },
                42: {
                    median: 15.3,
                    plusOneSd: 17.4,
                    minOneSd: 13.6,
                },
                43: {
                    median: 15.5,
                    plusOneSd: 17.6,
                    minOneSd: 13.7,
                },
                44: {
                    median: 15.7,
                    plusOneSd: 17.8,
                    minOneSd: 13.8,
                },
                45: {
                    median: 15.8,
                    plusOneSd: 18.0,
                    minOneSd: 14.0,
                },
                46: {
                    median: 16.0,
                    plusOneSd: 18.2,
                    minOneSd: 14.1,
                },
                47: {
                    median: 16.2,
                    plusOneSd: 18.4,
                    minOneSd: 14.3,
                },
                48: {
                    median: 16.3,
                    plusOneSd: 18.6,
                    minOneSd: 14.4,
                },
                49: {
                    median: 16.5,
                    plusOneSd: 18.8,
                    minOneSd: 14.5,
                },
                50: {
                    median: 16.7,
                    plusOneSd: 19.0,
                    minOneSd: 14.7,
                },
                51: {
                    median: 16.8,
                    plusOneSd: 19.2,
                    minOneSd: 14.8,
                },
                52: {
                    median: 17.0,
                    plusOneSd: 19.4,
                    minOneSd: 15.0,
                },
                53: {
                    median: 17.2,
                    plusOneSd: 19.6,
                    minOneSd: 15.1,
                },
                54: {
                    median: 17.3,
                    plusOneSd: 19.8,
                    minOneSd: 15.3,
                },
                55: {
                    median: 17.5,
                    plusOneSd: 20.0,
                    minOneSd: 15.4,
                },
                56: {
                    median: 17.7,
                    plusOneSd: 20.2,
                    minOneSd: 15.6,
                },
                57: {
                    median: 17.8,
                    plusOneSd: 20.4,
                    minOneSd: 15.7,
                },
                58: {
                    median: 18.0,
                    plusOneSd: 20.6,
                    minOneSd: 15.9,
                },
                59: {
                    median: 18.2,
                    plusOneSd: 20.8,
                    minOneSd: 16.0,
                },
                60: {
                    median: 18.3,
                    plusOneSd: 21.0,
                    minOneSd: 16.2,
                },
        },
        'Perempuan': {
            0: { median: 3.2, plusOneSd: 3.7, minOneSd: 2.8 },
            1: { median: 4.2, plusOneSd: 4.8, minOneSd: 3.6 },
            2: { median: 5.1, plusOneSd: 5.8, minOneSd: 4.5 },
            3: { median: 5.8, plusOneSd: 6.6, minOneSd: 5.2 },
            4: { median: 6.4, plusOneSd: 7.3, minOneSd: 5.7 },
            5: {
                median: 6.9,
                plusOneSd: 7.8,
                minOneSd: 6.1,
              },
              6: {
                median: 7.3,
                plusOneSd: 8.2,
                minOneSd: 6.5,
              },
              7: {
                median: 7.6,
                plusOneSd: 8.6,
                minOneSd: 6.8,
              },
              8: {
                median: 7.9,
                plusOneSd: 9.0,
                minOneSd: 7.0,
              },
              9: {
                median: 8.2,
                plusOneSd: 9.3,
                minOneSd: 7.3,
              },
              10: {
                median: 8.5,
                plusOneSd: 9.6,
                minOneSd: 7.5,
              },
              11: {
                median: 8.7,
                plusOneSd: 9.9,
                minOneSd: 7.7,
              },
              12: {
                median: 8.9,
                plusOneSd: 10.1,
                minOneSd: 7.9,
              },
              13: {
                median: 9.2,
                plusOneSd: 10.4,
                minOneSd: 8.1,
              },
              14: {
                median: 9.4,
                plusOneSd: 10.6,
                minOneSd: 8.3,
              },
              15: {
                median: 9.6,
                plusOneSd: 10.9,
                minOneSd: 8.5,
              },
              16: {
                median: 9.8,
                plusOneSd: 11.1,
                minOneSd: 8.7,
              },
              17: {
                median: 10.0,
                plusOneSd: 11.4,
                minOneSd: 8.9,
              },
              18: {
                median: 10.2,
                plusOneSd: 11.6,
                minOneSd: 9.1,
              },
                19: {
                    median: 10.4,
                    plusOneSd: 11.8,
                    minOneSd: 9.2,
                },
                20: {
                    median: 10.6,
                    plusOneSd: 12.1,
                    minOneSd: 9.4,
                },
                21: {
                    median: 10.9,
                    plusOneSd: 12.3,
                    minOneSd: 9.6,
                },
                22: {
                    median: 11.1,
                    plusOneSd: 12.5,
                    minOneSd: 9.8,
                },
                23: {
                    median: 11.3,
                    plusOneSd: 12.8,
                    minOneSd: 10.0,
                },
                24: {
                    median: 11.5,
                    plusOneSd: 13.0,
                    minOneSd: 10.2,
                },
                25: {
                    median: 11.7,
                    plusOneSd: 13.3,
                    minOneSd: 10.3,
                },
                26: {
                    median: 11.9,
                    plusOneSd: 13.5,
                    minOneSd: 10.5,
                },
                27: {
                    median: 12.1,
                    plusOneSd: 13.7,
                    minOneSd: 10.7,
                },
                28: {
                    median: 12.3,
                    plusOneSd: 14.0,
                    minOneSd: 10.9,
                },
                29: {
                    median: 12.5,
                    plusOneSd: 14.2,
                    minOneSd: 11.1,
                },
                30: {
                    median: 12.7,
                    plusOneSd: 14.4,
                    minOneSd: 11.2,
                },
                31: {
                    median: 12.9,
                    plusOneSd: 14.7,
                    minOneSd: 11.4,
                },
                32: {
                    median: 13.1,
                    plusOneSd: 14.9,
                    minOneSd: 11.6,
                },
                33: {
                    median: 13.3,
                    plusOneSd: 15.1,
                    minOneSd: 11.7,
                },
                34: {
                    median: 13.5,
                    plusOneSd: 15.4,
                    minOneSd: 11.9,
                },
                35: {
                    median: 13.7,
                    plusOneSd: 15.6,
                    minOneSd: 12.1,
                },
                36: {
                    median: 13.9,
                    plusOneSd: 15.8,
                    minOneSd: 12.2,
                },
                37: {
                    median: 14.0,
                    plusOneSd: 16.0,
                    minOneSd: 12.4,
                },
                38: {
                    median: 14.2,
                    plusOneSd: 16.3,
                    minOneSd: 12.5,
                },
                39: {
                    median: 14.4,
                    plusOneSd: 16.5,
                    minOneSd: 12.7,
                },
                40: {
                    median: 14.6,
                    plusOneSd: 16.7,
                    minOneSd: 12.8,
                },
                41: {
                    median: 14.8,
                    plusOneSd: 16.9,
                    minOneSd: 13.0,
                },
                42: {
                    median: 15.0,
                    plusOneSd: 17.2,
                    minOneSd: 13.1,
                },
                43: {
                    median: 15.2,
                    plusOneSd: 17.4,
                    minOneSd: 13.3,
                },
                44: {
                    median: 15.3,
                    plusOneSd: 17.6,
                    minOneSd: 13.4,
                },
                45: {
                    median: 15.5,
                    plusOneSd: 17.8,
                    minOneSd: 13.6,
                },
                46: {
                    median: 15.7,
                    plusOneSd: 18.1,
                    minOneSd: 13.7,
                },
                47: {
                    median: 15.9,
                    plusOneSd: 18.3,
                    minOneSd: 13.9,
                },
                48: {
                    median: 16.1,
                    plusOneSd: 18.5,
                    minOneSd: 14.0,
                },
                49: {
                    median: 16.3,
                    plusOneSd: 18.8,
                    minOneSd: 14.2,
                },
                50: {
                    median: 16.5,
                    plusOneSd: 19.0,
                    minOneSd: 14.3,
                },
                51: {
                    median: 16.7,
                    plusOneSd: 19.2,
                    minOneSd: 14.5,
                },
                52: {
                    median: 16.9,
                    plusOneSd: 19.5,
                    minOneSd: 14.6,
                },
                53: {
                    median: 17.1,
                    plusOneSd: 19.7,
                    minOneSd: 14.8,
                },
                54: {
                    median: 17.3,
                    plusOneSd: 20.0,
                    minOneSd: 14.9,
                },
                55: {
                    median: 17.5,
                    plusOneSd: 20.2,
                    minOneSd: 15.1,
                },
                56: {
                    median: 17.7,
                    plusOneSd: 20.5,
                    minOneSd: 15.2,
                },
                57: {
                    median: 17.9,
                    plusOneSd: 20.7,
                    minOneSd: 15.4,
                },
                58: {
                    median: 18.1,
                    plusOneSd: 21.0,
                    minOneSd: 15.5,
                },
                59: {
                    median: 18.3,
                    plusOneSd: 21.2,
                    minOneSd: 15.7,
                },
                60: {
                    median: 18.5,
                    plusOneSd: 21.5,
                    minOneSd: 15.8,
                },

        }
    };

    const genderKey = jenis_kelamin === 'Laki-Laki' ? 'Laki-Laki' : 'Perempuan';
    const ageData = data[genderKey][usia];

    if (!ageData) {
        return 'usia tidak valid';
    }

    const { median, plusOneSd, minOneSd } = ageData;
    const sdRujukan = zScore(bb, median, plusOneSd, minOneSd);

    // console.log(sdRujukan);

    if (sdRujukan < -3) {
        return 'Gizi Buruk';
    } else if (sdRujukan >= -3 && sdRujukan < -2) {
        return 'Gizi Kurang';
    } else if (sdRujukan >= -2 && sdRujukan <= 2) {
        return 'Gizi Baik';
    } else if (sdRujukan > 2) {
        return 'Gizi Lebih';
    }
};

// console.log(giziCalculation(0, 4, 'Perempuan'));  // Output the result
export default giziCalculation;