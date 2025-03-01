exports.DEFAULT_POINT_THRESHOLD = 1;
exports.DEFAULT_BONUS_MULTIPLICATOR = 1;

exports.MARKETS_REWARDS_CONFIGURATIONS = {
  /** Core **/

  // vWETH_Core
  '0x52260ad4cb690c6b22629166f4d181477a9c157c':
    { SUPPLY_POINT_THRESHOLD: 1, SUPPLY_BONUS_MULTIPLICATOR: 4, BORROW_POINT_THRESHOLD: 1, BORROW_BONUS_MULTIPLICATOR: 4 },
  // vUSDCe_Core
  '0x87c69a8fb7f04b7890f48a1577a83788683a2036':
    { SUPPLY_POINT_THRESHOLD: 1, SUPPLY_BONUS_MULTIPLICATOR: 8, BORROW_POINT_THRESHOLD: 1, BORROW_BONUS_MULTIPLICATOR: 1 },
  // vscETH_Core 
  '0x04568db12221d60c93e1db9cb7933ad6b7c4280c':
    { SUPPLY_POINT_THRESHOLD: 1, SUPPLY_BONUS_MULTIPLICATOR: 4, BORROW_POINT_THRESHOLD: 1, BORROW_BONUS_MULTIPLICATOR: 4 },
  // vscUSD_Core 
  '0x6770af27fc5233a70b85bff631061400a09d2e1c':
    { SUPPLY_POINT_THRESHOLD: 1, SUPPLY_BONUS_MULTIPLICATOR: 8, BORROW_POINT_THRESHOLD: 1, BORROW_BONUS_MULTIPLICATOR: 1 },
  // vstS_Core 
  '0xe544e51bf20ab186b6b7b1a9095c8bc1e3f203f5':
    { SUPPLY_POINT_THRESHOLD: 1, SUPPLY_BONUS_MULTIPLICATOR: 1, BORROW_POINT_THRESHOLD: 1, BORROW_BONUS_MULTIPLICATOR: 4 },
  // vwS_Core
  '0xc96a4cd13c8fcb9886de0cdf7152b9f930d67e96':
    { SUPPLY_POINT_THRESHOLD: 1, SUPPLY_BONUS_MULTIPLICATOR: 6, BORROW_POINT_THRESHOLD: 1, BORROW_BONUS_MULTIPLICATOR: 4 },

  /** Liquid Staked **/

  // vwOS_LiquidStakedS
  '0x7fd79432cc704582235df11b92b783f07ed40e13':
    { SUPPLY_POINT_THRESHOLD: 1, SUPPLY_BONUS_MULTIPLICATOR: 1, BORROW_POINT_THRESHOLD: 1, BORROW_BONUS_MULTIPLICATOR: 2 },
  // vWS_LiquidStakedS
  '0x876e062420fb9a4861968ec2e0ff91be88142343':
    { SUPPLY_POINT_THRESHOLD: 1, SUPPLY_BONUS_MULTIPLICATOR: 8, BORROW_POINT_THRESHOLD: 1, BORROW_BONUS_MULTIPLICATOR: 2 },
  // vUSDCe_LiquidStakedS
  '0xb64b8585cece0e314d344c7f6437d97bf1eb0fe7':
    { SUPPLY_POINT_THRESHOLD: 1, SUPPLY_BONUS_MULTIPLICATOR: 4, BORROW_POINT_THRESHOLD: 1, BORROW_BONUS_MULTIPLICATOR: 1 },

  /** PT **/

  // vscUSD_SpectraPTscUSDPool
  '0x7d47cbf5fe9ccf2f99d0c2e8a3c59fb3498bc21b':
    { SUPPLY_POINT_THRESHOLD: 1, SUPPLY_BONUS_MULTIPLICATOR: 8, BORROW_POINT_THRESHOLD: 1, BORROW_BONUS_MULTIPLICATOR: 1 },
  // vPT-sw-wstkscUSD-1751241607_SpectraPTscUSDPool 
  '0xd1e8ec6eaed325006731f816f41fd5483373a8f2':
    { SUPPLY_POINT_THRESHOLD: 1, SUPPLY_BONUS_MULTIPLICATOR: 1, BORROW_POINT_THRESHOLD: 1, BORROW_BONUS_MULTIPLICATOR: 1 },
};