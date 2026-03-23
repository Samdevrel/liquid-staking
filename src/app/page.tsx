'use client';

import { useState } from 'react';

interface Position {
  id: string;
  stakingProvider: string;
  asset: string;
  stakedAmount: number;
  stakedValue: string;
  stETHBalance: number;
  rewards: number;
  apy: number;
  canWithdraw: boolean;
  pendingWithdrawal?: number;
}

const positions: Position[] = [
  {
    id: 'POS-001',
    stakingProvider: 'Lido',
    asset: 'ETH',
    stakedAmount: 10,
    stakedValue: '$18,980',
    stETHBalance: 9.8,
    rewards: 45.5,
    apy: 3.2,
    canWithdraw: true,
  },
  {
    id: 'POS-002',
    stakingProvider: 'Rocket Pool',
    asset: 'ETH',
    stakedAmount: 5,
    stakedValue: '$9,490',
    stETHBalance: 4.9,
    rewards: 22.7,
    apy: 3.5,
    canWithdraw: true,
  },
  {
    id: 'POS-003',
    stakingProvider: 'ether.fi',
    asset: 'ETH',
    stakedAmount: 3,
    stakedValue: '$5,694',
    stETHBalance: 2.95,
    rewards: 13.6,
    apy: 3.1,
    canWithdraw: true,
  },
];

const providers = [
  { name: 'Lido', logo: '💧', staked: '$3.5B', tvl: '$8.9B', apy: '3.2%', apr: '12.8%' },
  { name: 'Rocket Pool', logo: '🚀', staked: '$2.1B', tvl: '$5.4B', apy: '3.5%', apr: '14.0%' },
  { name: 'ether.fi', logo: '🔐', staked: '$1.8B', tvl: '$3.2B', apy: '3.1%', apr: '12.4%' },
  { name: 'Pooled Staking', logo: '🔗', staked: '$980M', tvl: '$2.1B', apy: '2.8%', apr: '11.2%' },
  { name: 'Frax Shares', logo: '💎', staked: '$450M', tvl: '$1.2B', apy: '2.5%', apr: '10.0%' },
];

export default function Home() {
  const [selectedProvider, setSelectedProvider] = useState(0);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b-4 border-blue-400 bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black">Liquid Staking</h1>
          <p className="text-gray-400 mt-2">Earn staking rewards while keeping your assets liquid</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 border-4 border-blue-400 p-4 text-center">
            <div className="text-3xl font-black text-blue-400">$14.8B</div>
            <div className="text-sm text-gray-400">TVL</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">$25.6B</div>
            <div className="text-sm text-gray-400">Total Staked</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black text-green-400">3.2%</div>
            <div className="text-sm text-gray-400">Avg APY</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">18M+</div>
            <div className="text-sm text-gray-400">Validators</div>
          </div>
        </section>

        {/* Providers */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">Staking Providers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
            {providers.map((provider, idx) => (
              <button
                key={provider.name}
                onClick={() => setSelectedProvider(idx)}
                className={`p-4 border-4 text-left transition-all ${
                  selectedProvider === idx
                    ? 'bg-blue-900/30 border-blue-400'
                    : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="text-3xl mb-2">{provider.logo}</div>
                <div className="font-bold text-blue-400 text-lg">{provider.name}</div>
                <div className="text-sm text-gray-400">{provider.staked}</div>
                <div className="mt-2 text-xs text-gray-500">{provider.tvl}</div>
                <div className="flex justify-between mt-2 text-xs">
                  <span className="text-green-400">APY: {provider.apy}</span>
                  <span>APR: {provider.apr}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Position Details */}
        {providers[selectedProvider] && (
          <section className="bg-gray-900 border-4 border-blue-400 p-6">
            <h2 className="text-xl font-black text-blue-400 mb-4">
              {providers[selectedProvider].logo} {providers[selectedProvider].name}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-gray-800 border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">Total Staked</div>
                  <div className="text-3xl font-bold">{providers[selectedProvider].staked}</div>
                </div>
                <div className="p-4 bg-gray-800 border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">TVL</div>
                  <div className="text-2xl font-bold">{providers[selectedProvider].tvl}</div>
                </div>
                <div className="p-4 bg-gray-800 border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">Current APY</div>
                  <div className={`text-3xl font-bold ${providers[selectedProvider].apy.includes('+') ? 'text-green-400' : 'text-blue-400'}`}>
                    {providers[selectedProvider].apy}
                  </div>
                </div>
                <button className="w-full py-4 bg-green-500 text-white font-bold border-4 border-green-400 hover:bg-green-400">
                  Deposit ETH
                </button>
                <button className="w-full py-4 bg-blue-500 text-white font-bold border-4 border-blue-400 hover:bg-blue-400">
                  Withdraw
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-800 border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">Current APY</div>
                  <div className={`text-3xl font-bold ${providers[selectedProvider].apy.includes('+') ? 'text-green-400' : 'text-blue-400'}`}>
                    {providers[selectedProvider].apy}
                  </div>
                </div>
                <div className="p-4 bg-gray-800 border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">Current APR</div>
                  <div className="text-3xl font-bold">{providers[selectedProvider].apr}</div>
                </div>
                <div className="p-4 bg-gray-800 border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">Estimated Monthly Reward</div>
                  <div className="text-2xl font-bold text-green-400">
                    {providers[selectedProvider].apy} × 12 = {providers[selectedProvider].apy}
                  </div>
                </div>
                <div className="p-4 bg-yellow-900/30 border border-yellow-600">
                  <div className="text-sm text-yellow-400 mb-1">⚠️ 32 ETH Minimum</div>
                  <div className="text-xs text-gray-400">
                    Rocket Pool requires 0.01 ETH minimum stake
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* My Positions */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">My Liquid Staking Positions</h2>
          <div className="space-y-3">
            {positions.map((pos) => (
              <div key={pos.id} className="p-4 bg-gray-800 border border-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-bold text-blue-400">{pos.stakingProvider}</span>
                    <span className="ml-2 text-gray-400">{pos.asset}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-400">+{pos.rewards.toFixed(2)}</div>
                    <div className="text-xs text-gray-400">{pos.apy}% APY</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm text-gray-400">
                  <div>
                    <span className="text-gray-500">Staked:</span> {pos.stakedAmount} {pos.asset}
                  </div>
                  <div>
                    <span className="text-gray-500">stETH:</span> {pos.stETHBalance}
                  </div>
                  <div>
                    <span className="text-gray-500">Value:</span> {pos.stakedValue}
                  </div>
                </div>
                {pos.pendingWithdrawal && (
                  <div className="mt-2 text-xs text-yellow-400">
                    ⏳ Pending withdrawal: {pos.pendingWithdrawal} {pos.asset}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">How Liquid Staking Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">1️⃣</div>
              <h3 className="font-bold text-blue-400 mb-2">Deposit ETH</h3>
              <p className="text-xs text-gray-400">Send ETH to staking pool</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">2️⃣</div>
              <h3 className="font-bold text-green-400 mb-2">Receive stETH</h3>
              <p className="text-xs text-gray-400">Get 1:1 stETH token</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">3️⃣</div>
              <h3 className="font-bold text-yellow-400 mb-2">Earn Rewards</h3>
              <p className="text-xs text-gray-400">APY accrues automatically</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">4️⃣</div>
              <h3 className="font-bold text-purple-400 mb-2">Use stETH</h3>
              <p className="text-xs text-gray-400">Trade, lend, stake in DeFi</p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-gray-900 border-4 border-green-400 p-6">
          <h2 className="text-xl font-black text-green-400 mb-4">Why Liquid Staking?</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-800 border border-gray-700">
              <div className="text-2xl mb-2">💧</div>
              <h3 className="font-bold text-blue-400 mb-2">Liquid Rewards</h3>
              <p className="text-sm text-gray-400">Rewards compound automatically</p>
            </div>
            <div className="p-4 bg-gray-800 border border-gray-700">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="font-bold text-green-400 mb-2">DeFi Integration</h3>
              <p className="text-sm text-gray-400">Use stETH across DeFi</p>
            </div>
            <div className="p-4 bg-gray-800 border border-gray-700">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-bold text-yellow-400 mb-2">No Lock-Up</h3>
              <p className="text-sm text-gray-400">Withdraw anytime (unbonding period)</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-8 border-t border-gray-800">
          <p>
            Built by <a href="https://x.com/samdevrel" className="text-blue-400 hover:underline">@samdevrel</a>
          <button
            onClick={() => window.location.href = '/docs/overview'}
            className="w-full py-4 bg-purple-500 text-white font-bold border-4 border-purple-400 hover:bg-purple-400 mb-4"
          >
            {buttonText}
          </button>
                    </p>
        </footer>
      </div>
    </main>
  );
}
