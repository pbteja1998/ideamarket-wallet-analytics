import classNames from 'classnames'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { TokenAmount } from 'src/pages/api/[market]/[token]'
import ReactTimeAgo from 'react-time-ago'
import { Transition } from '@headlessui/react'

type TokenType = {
  name: string
  rank: number
  dayChange: number
  price: number
  market: string
  lockedPercentage: number
  marketCap: number
}

function DetailsView({
  isOpen,
  setIsOpen,
  token,
}: {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  token: TokenType
}) {
  const tokenName = token.name[0] === '@' ? token.name.slice(1) : token.name

  if (!isOpen) {
    return <></>
  }
  return (
    <>
      <section
        className="fixed inset-0 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition
            className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            show={isOpen}
            aria-hidden="true"
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition
              show={isOpen}
              className="relative w-96"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Transition
                show={isOpen}
                className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4"
                enter="ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <button
                  className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="sr-only">Close panel</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </Transition>
              {isOpen && (
                <div className="h-full bg-white p-8 overflow-y-auto">
                  <div className="pb-16 space-y-6">
                    <div>
                      <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                        <img
                          src={`https://unavatar.backend.ideamarket.io/${token.market}/${tokenName}`}
                          alt=""
                          className="object-contain"
                        />
                      </div>
                      <div className="mt-4 flex items-start justify-between">
                        <div>
                          <h2 className="text-lg font-medium text-gray-900">
                            <span className="sr-only">Details for </span>
                            {token.name}
                          </h2>
                          <p className="text-sm font-medium text-gray-500">
                            Rank {token.rank}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="ml-4 h-8 w-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                          <span className="sr-only">Favorite</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Information</h3>
                      <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                        <div className="py-3 flex justify-between text-sm font-medium">
                          <dt className="text-gray-500">Price</dt>
                          <dd className="text-gray-900">${token.price}</dd>
                        </div>
                        <div className="py-3 flex justify-between text-sm font-medium">
                          <dt className="text-gray-500">Deposits</dt>
                          <dd className="text-gray-900">
                            ${(token.marketCap / 1e18).toFixed(2)}
                          </dd>
                        </div>
                        <div className="py-3 flex justify-between text-sm font-medium">
                          <dt className="text-gray-500">Percentage locked</dt>
                          <dd className="text-gray-900">
                            {token.lockedPercentage}%
                          </dd>
                        </div>
                        <div className="py-3 flex justify-between text-sm font-medium">
                          <dt className="text-gray-500">24H change</dt>
                          <dd className="text-gray-900">
                            {(token.dayChange * 100).toFixed(2)}%
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        className="flex-1 bg-brand-blue py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Buy
                      </button>
                      <button
                        type="button"
                        className="flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Sell
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Transition>
          </div>
        </div>
      </section>
    </>
  )
}

function Token({ token, sortBy }: { token: TokenAmount; sortBy: SortBy }) {
  const [isOpen, setIsOpen] = useState(false)
  const tokenName = token.name[0] === '@' ? token.name.slice(1) : token.name
  const twitterLogo = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      className="inline-block align-middle"
    >
      <path
        d="M17.857 20C19.04 20 20 19.04 20 17.857V2.143C20 .96 19.04 0 17.857 0H2.143C.96 0 0 .96 0 2.143v15.714C0 19.04.96 20 2.143 20h15.714zM7.353 15.8a8.297 8.297 0 01-4.496-1.313c.237.026.464.035.705.035 1.371 0 2.63-.464 3.634-1.25a2.93 2.93 0 01-2.736-2.03c.45.066.857.066 1.321-.055a2.927 2.927 0 01-2.343-2.874v-.036a2.92 2.92 0 001.32.37C4.04 8.17 3.456 7.08 3.456 6.215V6.21c0-.545.143-1.045.398-1.478a8.305 8.305 0 006.034 3.063c-.415-1.987 1.072-3.599 2.858-3.599.843 0 1.602.353 2.138.925a5.736 5.736 0 001.857-.706 2.923 2.923 0 01-1.286 1.612 5.832 5.832 0 001.688-.456 6.142 6.142 0 01-1.469 1.518c.009.125.009.255.009.38 0 3.87-2.946 8.33-8.33 8.33z"
        fillRule="nonzero"
        className=""
      ></path>
    </svg>
  )
  const substackLogo = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      className="inline-block align-middle"
    >
      <path
        d="M17.857 20C19.04 20 20 19.04 20 17.857V2.143C20 .96 19.04 0 17.857 0H2.143C.96 0 0 .96 0 2.143v15.714C0 19.04.96 20 2.143 20h15.714zM7.353 15.8a8.297 8.297 0 01-4.496-1.313c.237.026.464.035.705.035 1.371 0 2.63-.464 3.634-1.25a2.93 2.93 0 01-2.736-2.03c.45.066.857.066 1.321-.055a2.927 2.927 0 01-2.343-2.874v-.036a2.92 2.92 0 001.32.37C4.04 8.17 3.456 7.08 3.456 6.215V6.21c0-.545.143-1.045.398-1.478a8.305 8.305 0 006.034 3.063c-.415-1.987 1.072-3.599 2.858-3.599.843 0 1.602.353 2.138.925a5.736 5.736 0 001.857-.706 2.923 2.923 0 01-1.286 1.612 5.832 5.832 0 001.688-.456 6.142 6.142 0 01-1.469 1.518c.009.125.009.255.009.38 0 3.87-2.946 8.33-8.33 8.33z"
        fill="#fff"
      ></path>
      <path fill="#fff" d="M2.352 1.949h15.297v15.106H2.352z"></path>
      <path d="M15.278 6.697H4.721v1.421h10.557zM4.721 9.405v6.605L10 13.06l5.279 2.95V9.405zM15.278 3.99H4.721v1.42h10.557z"></path>
    </svg>
  )
  return (
    <>
      <DetailsView isOpen={isOpen} setIsOpen={setIsOpen} token={token} />
      <div className="rounded-lg bg-white overflow-hidden shadow">
        <h2 className="sr-only" id="profile-overview-title">
          Profile Overview
        </h2>
        <div className="bg-white p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <img
                  className="mx-auto h-20 w-20 rounded-full"
                  src={`https://unavatar.backend.ideamarket.io/${token.market}/${tokenName}`}
                  alt={token.name}
                />
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-sm font-medium text-gray-600">
                  Rank {token.rank}
                </p>
                <p className="text-xl font-bold text-gray-900 sm:text-xl">
                  {token.name}{' '}
                  <span>
                    {token.market === 'Twitter' ? twitterLogo : substackLogo}
                  </span>
                </p>
                <p className="text-sm font-medium text-gray-600">
                  ${token.price}
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              <button
                className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setIsOpen(true)}
              >
                View details
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          <div
            className={classNames(
              'px-6 py-5 text-sm font-medium text-center',
              sortBy === 'holders' && 'bg-indigo-100'
            )}
          >
            <span className="text-gray-900">{token.stats.holders}</span>{' '}
            <span className="text-gray-600">mutual holders</span>
          </div>
          <div
            className={classNames(
              'px-6 py-5 text-sm font-medium text-center',
              sortBy === 'amount' && 'bg-indigo-100'
            )}
          >
            <span className="text-gray-900">{token.stats.amount}</span>{' '}
            <span className="text-gray-600">tokens bought</span>
          </div>
          <div
            className={classNames(
              'px-6 py-5 text-sm font-medium text-center',
              sortBy === 'timestamp' && 'bg-indigo-100'
            )}
          >
            <span className="text-gray-600">Bought </span>
            <span className="text-gray-900">
              <ReactTimeAgo
                date={new Date(token.stats.timestamp * 1000)}
                locale="en-US"
              />
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

type SortBy = 'holders' | 'amount' | 'timestamp'

export default function RelatedTokens({
  token,
  market,
}: {
  token: string
  market: string
}) {
  const [sortBy, setSortBy] = useState<SortBy>('holders')
  const { isLoading, isError, data } = useQuery<TokenAmount[]>(
    `/api/${market}/${token}`,
    () =>
      fetch(`/api/${market}/${token}`).then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong!!')
        }
        return res.json()
      })
  )

  function sortedTokens() {
    if (isLoading || isError || !data) {
      return []
    }
    return data.sort(
      (a, b) => Number(b.stats[sortBy]) - Number(a.stats[sortBy])
    )
  }

  if (isLoading) {
    return <p>loading...</p>
  }
  if (isError) {
    return <p>Something went wrong!!!</p>
  }

  return (
    <>
      <div className="">
        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {sortedTokens().length > 0 && sortBy === 'holders' && (
                <>
                  Most holders of{' '}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800">
                    {token}
                  </span>{' '}
                  also bought
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-purple-100 text-purple-800">
                    {sortedTokens()[0].name}
                  </span>{' '}
                  tokens.
                </>
              )}

              {sortedTokens().length > 0 && sortBy === 'amount' && (
                <>
                  Holders of
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800">
                    {token}
                  </span>{' '}
                  bought most amount of
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-purple-100 text-purple-800">
                    {sortedTokens()[0].name}
                  </span>{' '}
                  tokens.
                </>
              )}

              {sortedTokens().length > 0 && sortBy === 'timestamp' && (
                <>
                  Holders of
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800">
                    {token}
                  </span>{' '}
                  most recently bought
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-purple-100 text-purple-800">
                    {sortedTokens()[0].name}
                  </span>{' '}
                  tokens.
                </>
              )}
            </h3>

            <div className="inline-block">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Sort By
              </label>
              <select
                id="location"
                name="location"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                onChange={(e) => setSortBy(e.target.value as any)}
                value={sortBy}
              >
                <option value="holders">Number of users who bought</option>
                <option value="amount">Amount of tokens bought</option>
                <option value="timestamp">Recently bought first</option>
              </select>
            </div>
          </div>

          <dl className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {sortedTokens().map((token, index) => (
              <Token token={token} key={token.name} sortBy={sortBy} />
            ))}
          </dl>
        </div>
      </div>
    </>
  )
}
