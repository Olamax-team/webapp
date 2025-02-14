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
    path: '/fast-trade',
    image: fastTrade,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'Fast Trade'
  },
  {
    path: '/airtime-data',
    image: airtimeData,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'Airtime & Data'
  },
  {
    path: '/bill-payment',
    image: billPayment,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'Bills & Payment'
  },
];

export const supportList = [
  {
    path: '/help-center',
    image: helpCenter,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'Help Center'
  },
  {
    path: '/chat-us',
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