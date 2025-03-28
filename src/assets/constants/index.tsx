import fastTrade from '../../assets/images/eva--swap-fill 1.png';
import airtimeData from '../../assets/images/device-mobile.png';
import billPayment from '../../assets/images/healthicons_electricity.png';
import helpCenter from '../../assets/images/fluent_person-support-28-filled.png';
import chatUs from '../../assets/images/bxs_chat.png';
import faq from '../../assets/images/mdi_faq.png';
import aboutUs from '../../assets/images/zondicons_badge.png'
import building from '../../assets/images/md-library.png'
import news from '../../assets/images/mingcute_news-2-fill.png'
import education from '../../assets/images/game-icons_graduate-cap.png'
import money from '../../assets/images/cash.png'


export const tradeCryptoList = [
  {
    path: '/dashboard',
    image: fastTrade,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'Fast Trade'
  },
  {
    path: '/dashboard/bills_payment',
    image: airtimeData,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'Airtime & Data'
  },
  {
    path: '/dashboard/bills_payment',
    image: billPayment,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'Bills & Payment'
  },
];

export const supportList = [
  {
    path: '/support#help',
    image: helpCenter,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'Help Center'
  },
  {
    path: '/support#contact',
    image: chatUs,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'Chat Us'
  },
  {
    path: '/frequently-asked-questions',
    image: faq,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'Frequently Asked Questions'
  },
];

export const moreList = [
  {
    path: '/about-us',
    image: aboutUs,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'About Us'
  },
  {
    path: '/olamax-foundation',
    image: building,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'Olamax Foundation'
  },
  {
    path: '/news-and-announcement',
    image: news,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'News And Announcement'
  },
  {
    path: '/educational-center',
    image: education,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'Educational Center'
  },
  {
    path: '/referral-program',
    image: money,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'Referral Program'
  },
];

export const notificationList = [
{
  date: '2024-12-12T06:41:18.421Z',
  notifications: [
    {
      title: 'Transaction Successful',
      content: "Your crypto has been converted to Naira. Check your wallet for the updated balance.",
      alertType: 'transaction-alert'
    },
    {
      title: 'New Feature Alert!',
      content: "We’ve added a quick-buy option for USDT. Access faster transactions directly from your dashboard.",
      alertType: 'feature-update'
    },
  ],
},
{
  date: '2024-12-11T07:38:18.421Z',
  notifications: [
    {
      title: 'Security Update Required',
      content: "Please verify your email address and enable two-factor authentication to keep your account secure.",
      alertType: 'security-update'
    },
    {
      title: 'Referral Program Ending Soon!',
      content: "Only a few days left to earn extra BONK Tokens on every BTC purchase. Don’t miss out!",
      alertType: 'referral-update'
    },
    {
      title: 'Transaction Successful',
      content: 'Your crypto has been converted to Naira. Check your wallet for the updated balance.',
      alertType: 'transaction-alert'
    },
  ]
},
{
  date: '2024-12-10T11:31:18.421Z',
  notifications: [
    {
      title: 'Transaction Successful',
      content: 'Your crypto has been converted to Naira. Check your wallet for the updated balance.',
      alertType: 'transaction-alert'
    },
    {
      title: 'Referral Program Ending Soon!',
      content: "Only a few days left to earn extra BONK Tokens on every BTC purchase. Don’t miss out!",
      alertType: 'referral-update'
    },
]
}
];

export const transactionList = [
  {
    id: 1,
    date: '2025-01-09T23:00:00.000Z',
    transaction_id: 'TX12345ABC',
    type: 'Airtime',
    coins: 'USDT',
    payment_method: 'Bank Transfer',
    amount: 100000,
    status: 'Pending',
    fees: '0.5'
  },
  {
    id: 2,
    date: '2025-01-09T23:00:00.000Z',
    transaction_id: 'TX12345ABC',
    type: 'Data',
    coins: 'USDT',
    payment_method: 'Bank Transfer',
    amount: 100000,
    status: 'Completed',
    fees: '0.5'
  },
  {
    id: 3,
    date: '2025-01-09T23:00:00.000Z',
    transaction_id: 'TX12345ABC',
    type: 'Buy',
    coins: 'BTC',
    payment_method: 'Bank Transfer',
    amount: 100000,
    status: 'Cancelled',
    fees: '0.005'
  },
  {
    id: 4,
    date: '2025-01-09T23:00:00.000Z',
    transaction_id: 'TX12345ABC',
    type: 'Sell',
    coins: 'BTC',
    payment_method: 'Bank Transfer',
    amount: 100000,
    status: 'Completed',
    fees: '0.005'
  },
  {
    id: 5,
    date: '2025-01-09T23:00:00.000Z',
    transaction_id: 'TX12345ABC',
    type: 'Buy',
    coins: 'ETH',
    payment_method: 'Bank Transfer',
    amount: 100000,
    status: 'Completed',
    fees: '0.005'
  },
  {
    id: 6,
    date: '2025-01-09T23:00:00.000Z',
    transaction_id: 'TX12345ABC',
    type: 'Data',
    coins: 'SOL',
    payment_method: 'Bank Transfer',
    amount: 100000,
    status: 'Completed',
    fees: '0.005'
  },
  {
    id: 7,
    date: '2025-01-09T23:00:00.000Z',
    transaction_id: 'TX12345ABC',
    type: 'Airtime',
    coins: 'USDT',
    payment_method: 'Bank Transfer',
    amount: 100000,
    status: 'Completed',
    fees: '0.05'
  },
  {
    id: 8,
    date: '2025-01-09T23:00:00.000Z',
    transaction_id: 'TX12345ABC',
    type: 'Buy',
    coins: 'ETH',
    payment_method: 'Bank Transfer',
    amount: 100000,
    status: 'Cancelled',
    fees: '0.05'
  },
  {
    id: 9,
    date: '2025-01-09T23:00:00.000Z',
    transaction_id: 'TX12345ABC',
    type: 'Airtime',
    coins: 'USDT',
    payment_method: 'Bank Transfer',
    amount: 100000,
    status: 'Pending',
    fees: '0.5'
  },
];

export const referralsList = [
  {
    id: 1,
    date: '2025-01-09T23:00:00.000Z',
    referred_user: 'Samuel Sunday',
    trading_status: 'Traded',
    commission_amount: 1000,
    amount_traded: 10000,
    status: 'Verified',
    action: 'Remind Admin'
  },
  {
    id: 2,
    date: '2025-01-09T23:00:00.000Z',
    referred_user: 'Samuel Sunday',
    trading_status: 'Not Traded',
    commission_amount: 0,
    amount_traded: 0,
    status: 'Not Verified',
    action: 'Remind Admin'
  },
  {
    id: 3,
    date: '2025-01-09T23:00:00.000Z',
    referred_user: 'Samuel Sunday',
    trading_status: 'Not Traded',
    commission_amount: 0,
    amount_traded: 0,
    status: 'Not Verified',
    action: 'Remind Admin'
  },
  {
    id: 4,
    date: '2025-01-09T23:00:00.000Z',
    referred_user: 'Samuel Sunday',
    trading_status: 'Not Traded',
    commission_amount: 0,
    amount_traded: 0,
    status: 'Not Verified',
    action: 'Remind Admin'
  },
  {
    id: 5,
    date: '2025-01-09T23:00:00.000Z',
    referred_user: 'Samuel Sunday',
    trading_status: 'Traded',
    commission_amount: 1000,
    amount_traded: 10000,
    status: 'Verified',
    action: 'Remind Admin'
  },
];