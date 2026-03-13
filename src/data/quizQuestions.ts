import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is your experience level with cryptocurrency trading?',
    options: [
      {
        label: 'Complete beginner — I\'ve never traded crypto',
        value: 'beginner',
        scores: { coinbase: 5, bitget: 4, kraken: 3, binance: 2, bybit: 2, okx: 2, kucoin: 2 },
      },
      {
        label: 'Intermediate — I\'ve traded a few times',
        value: 'intermediate',
        scores: { coinbase: 3, bitget: 4, kraken: 4, binance: 4, bybit: 4, okx: 4, kucoin: 3 },
      },
      {
        label: 'Advanced — I trade regularly',
        value: 'advanced',
        scores: { coinbase: 1, bitget: 3, kraken: 4, binance: 5, bybit: 5, okx: 5, kucoin: 4 },
      },
      {
        label: 'Professional — Trading is my full-time activity',
        value: 'professional',
        scores: { coinbase: 1, bitget: 2, kraken: 5, binance: 5, bybit: 5, okx: 4, kucoin: 3 },
      },
    ],
  },
  {
    id: 2,
    question: 'What matters most to you in an exchange?',
    options: [
      {
        label: 'Security and regulation',
        value: 'security',
        scores: { coinbase: 5, bitget: 3, kraken: 5, binance: 4, bybit: 3, okx: 3, kucoin: 2 },
      },
      {
        label: 'Low trading fees',
        value: 'fees',
        scores: { coinbase: 1, bitget: 4, kraken: 3, binance: 5, bybit: 4, okx: 5, kucoin: 4 },
      },
      {
        label: 'Wide selection of cryptocurrencies',
        value: 'selection',
        scores: { coinbase: 2, bitget: 3, kraken: 3, binance: 5, bybit: 3, okx: 4, kucoin: 5 },
      },
      {
        label: 'Advanced trading tools and features',
        value: 'tools',
        scores: { coinbase: 1, bitget: 3, kraken: 4, binance: 5, bybit: 5, okx: 5, kucoin: 3 },
      },
    ],
  },
  {
    id: 3,
    question: 'Are you interested in derivatives trading (futures, options)?',
    options: [
      {
        label: 'No, I only want to buy and hold',
        value: 'no',
        scores: { coinbase: 5, bitget: 2, kraken: 3, binance: 3, bybit: 1, okx: 2, kucoin: 3 },
      },
      {
        label: 'Maybe in the future',
        value: 'maybe',
        scores: { coinbase: 3, bitget: 4, kraken: 4, binance: 4, bybit: 3, okx: 4, kucoin: 3 },
      },
      {
        label: 'Yes, I want access to futures and leverage',
        value: 'yes',
        scores: { coinbase: 0, bitget: 4, kraken: 4, binance: 5, bybit: 5, okx: 5, kucoin: 4 },
      },
    ],
  },
  {
    id: 4,
    question: 'Do you want to use copy trading (auto-follow successful traders)?',
    options: [
      {
        label: 'Yes, I\'d love that!',
        value: 'yes',
        scores: { coinbase: 0, bitget: 5, kraken: 1, binance: 3, bybit: 5, okx: 4, kucoin: 2 },
      },
      {
        label: 'Maybe, it sounds interesting',
        value: 'maybe',
        scores: { coinbase: 2, bitget: 4, kraken: 2, binance: 3, bybit: 4, okx: 3, kucoin: 2 },
      },
      {
        label: 'No, I prefer to make my own decisions',
        value: 'no',
        scores: { coinbase: 3, bitget: 2, kraken: 4, binance: 4, bybit: 3, okx: 3, kucoin: 3 },
      },
    ],
  },
  {
    id: 5,
    question: 'Where are you primarily based?',
    options: [
      {
        label: 'United States',
        value: 'us',
        scores: { coinbase: 5, bitget: 1, kraken: 5, binance: 1, bybit: 1, okx: 1, kucoin: 2 },
      },
      {
        label: 'Europe',
        value: 'europe',
        scores: { coinbase: 3, bitget: 4, kraken: 4, binance: 5, bybit: 4, okx: 4, kucoin: 4 },
      },
      {
        label: 'Asia',
        value: 'asia',
        scores: { coinbase: 2, bitget: 4, kraken: 3, binance: 5, bybit: 5, okx: 5, kucoin: 4 },
      },
      {
        label: 'Other / Global',
        value: 'other',
        scores: { coinbase: 2, bitget: 4, kraken: 3, binance: 5, bybit: 4, okx: 4, kucoin: 4 },
      },
    ],
  },
  {
    id: 6,
    question: 'How important is earning passive income (staking, lending)?',
    options: [
      {
        label: 'Very important — I want to earn on my holdings',
        value: 'very',
        scores: { coinbase: 3, bitget: 3, kraken: 4, binance: 5, bybit: 3, okx: 4, kucoin: 4 },
      },
      {
        label: 'Somewhat important',
        value: 'somewhat',
        scores: { coinbase: 3, bitget: 3, kraken: 3, binance: 4, bybit: 3, okx: 3, kucoin: 3 },
      },
      {
        label: 'Not important — I just want to trade',
        value: 'not',
        scores: { coinbase: 3, bitget: 3, kraken: 3, binance: 3, bybit: 4, okx: 3, kucoin: 3 },
      },
    ],
  },
  {
    id: 7,
    question: 'What\'s your preferred trading method?',
    options: [
      {
        label: 'Mobile app',
        value: 'mobile',
        scores: { coinbase: 5, bitget: 4, kraken: 3, binance: 4, bybit: 4, okx: 3, kucoin: 3 },
      },
      {
        label: 'Desktop web platform',
        value: 'desktop',
        scores: { coinbase: 3, bitget: 3, kraken: 4, binance: 5, bybit: 4, okx: 5, kucoin: 4 },
      },
      {
        label: 'API / Automated trading',
        value: 'api',
        scores: { coinbase: 2, bitget: 3, kraken: 4, binance: 5, bybit: 4, okx: 4, kucoin: 4 },
      },
    ],
  },
];
