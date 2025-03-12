import { useState } from "react";
import { HiChevronRight } from "react-icons/hi";

const Blockchain = () => {
  const [activeTopic, setActiveTopic] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveTopic(index);
  };

  return (
    <div className="mt-10 lg:flex w-full h-auto justify-between">
      {/* Left-side Topics */}
      <div className="xl:w-[50%] w-full lg:sticky  z-10 lg:p-5">
        <h2 className="font-DM Sans font-bold text-[18px] xl:text-[29px] leading-[24px] xl:leading-[43.5px]">
          Selected Topics
        </h2>
        <ul className="list-disc list-inside pl-5  text-[#121826]">
          {['Introduction to Blockchain', 'Blockchain vs. Traditional Databases', 'Types of Blockchain', 'Key Blockchain Terms', 'Real-World Applications of Blockchain'].map((topic, index) => (
            <li
              key={index}
              className={`cursor-pointer p-2 ${activeTopic === index ? 'text-[#039AE4] font-bold' : 'text-[#121826]'}`}
              onClick={() => handleClick(index)}
            >
              <a href={`#section${index + 1}`}>{topic}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Right-side Content */}
      <div className="xl:w-[50%] w-full lg:p-5 lg:mt-0 mt-5 lg:overflow-y-scroll lg:max-h-screen">
        <section id="section1" className="p-5">
          <h2 className="font-Inter font-bold xl:text-[23px] text-[18px] xl:leading-[150%] leading-[150%]">
            Introduction to Blockchain
          </h2>
          <p className="font-medium font-Inter xl:text-[18px] text-[14px] xl:leading-[150%] leading-[150%] mt-3">
            Blockchain technology serves as a groundbreaking advancement in how data is securely stored, shared, and verified. By using a distributed ledger system, blockchain ensures that transactions are recorded across a network of computers, making it virtually impossible to alter or delete data without consensus. This system’s decentralized nature means that no central authority controls the information, offering a higher level of security, transparency, and integrity. Blockchain is particularly transformative in sectors where trust and traceability are crucial, laying the groundwork for innovations in finance, supply chain management, healthcare, and beyond.
          </p>
        </section>

        <section id="section2" className="p-5">
          <h2 className="font-Inter font-bold xl:text-[23px] text-[18px] xl:leading-[150%] leading-[150%]">
            Blockchain vs. Traditional Databases
          </h2>
          <p className="font-medium font-Inter xl:text-[18px] text-[14px] xl:leading-[150%] leading-[150%] mt-3">
            Unlike traditional databases, which are typically centralized and controlled by a single authority, blockchain operates on a decentralized model, providing enhanced trust, security, and transparency. In traditional databases, data changes can be made by authorized users, which poses risks to data integrity and security. Blockchain’s unique structure, where data is cryptographically secured and validated by network consensus, minimizes these risks. Every transaction on a blockchain is transparent and immutable, meaning changes are visible and unchangeable, making blockchain an attractive alternative in scenarios where data trust and accuracy are essential.
          </p>
        </section>

        <section id="section3" className="p-5">
          <h2 className="font-Inter font-bold xl:text-[23px] text-[18px] xl:leading-[150%] leading-[150%]">
            Types of Blockchain
          </h2>
          <p className="font-medium font-Inter xl:text-[18px] text-[14px] xl:leading-[27px] leading-[23x] mt-3">
            Blockchain technology can be implemented in various forms, each with unique features suited to different use cases. Public blockchains like Bitcoin and Ethereum are open to anyone and provide a fully decentralized structure where all transactions are visible and validated by a large community. Private blockchains are restricted to specific users within an organization, providing more control and privacy but with less decentralization. Hybrid blockchains blend aspects of both public and private blockchains, allowing selective access and ensuring both privacy and transparency where needed. These diverse structures enable blockchain to meet a wide range of industry needs, from secure, transparent data sharing to protected internal networks.
          </p>
        </section>

        <section id="section4" className="p-5">
          <h2 className="font-Inter font-bold xl:text-[23px] text-[18px] xl:leading-[150%] leading-[150%]">
            Key Blockchain Terms
          </h2>
          <p className="font-medium font-Inter xl:text-[18px] text-[14px] xl:leading-[150%] leading-[150%] mt-3">
            To understand blockchain, it's essential to familiarize yourself with key terms. Nodes are individual devices within the blockchain network that validate transactions and share data. Consensus mechanisms are methods by which nodes agree on the validity of transactions, with common mechanisms including Proof of Work (PoW) and Proof of Stake (PoS). Mining is a process used in PoW systems where nodes solve complex algorithms to validate transactions, adding them to the chain and earning rewards. Decentralization refers to the distributed nature of blockchain, which removes central authority control, making the system resilient, transparent, and secure. Other important terms include smart contracts, which are self-executing contracts with the terms of the agreement directly written into code, and tokens, which represent digital assets or utility within a blockchain network.
          </p>
        </section>

        <section id="section5" className="p-5">
          <h2 className="font-Inter font-bold xl:text-[23px] text-[18px] xl:leading-[150%] leading-[150%]">
            Real-World Applications of Blockchain
          </h2>
          <p className="font-medium font-Inter xl:text-[18px] text-[14px] xl:leading-[150%] leading-[150%] mt-3">
            Blockchain’s capabilities extend far beyond cryptocurrency. In finance, blockchain is transforming payments, lending, and investments, offering faster transactions and reduced fraud. In the supply chain, it provides transparent tracking of products from source to destination, reducing fraud and inefficiencies. Healthcare leverages blockchain for secure, patient-centered data sharing, ensuring patient information is tamper-proof and accessible to authorized providers. Blockchain is also being applied in sectors like real estate, legal contracts, and voting systems, where it offers robust solutions for security, transparency, and efficiency. These real-world applications highlight blockchain's potential to revolutionize a wide range of industries, bringing transformative changes to how business is conducted and how data is shared and trusted across the globe.
          </p>
        </section>

        <div className="flex justify-between items-center h-[40px] xl:h-[80px] w-full rounded-[10px] bg-[#039AE4] text-[#FFFFFF] mb-5 p-3">
          <p className="font-Inter font-bold text-[10px] xl:text-[20px] xl:leading-[30px] leading-[16px]">
            Cryptocurrency and Earning Opportunities
          </p>
          <p className="font-medium font-inter xl:text-[18px] text-[10px] xl:leading-[27px] leading-[16px] flex items-center">
            Up Next<HiChevronRight className="size-4 xl:size-6" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blockchain;
