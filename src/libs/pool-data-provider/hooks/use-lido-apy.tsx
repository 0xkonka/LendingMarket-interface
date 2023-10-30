import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/lidofinance/lido',
  cache: new InMemoryCache(),
});

const getLidoApy = async () => {
  let results = await client.query({
    query: gql`
      query {
        totalRewards(first: 7, orderBy: blockTime, orderDirection: desc) {
          apr
          blockTime
        }
      }
    `,
  });

  if (results && results.data) {
    return results.data;
  }

  return null;
};

export function useLidoApy() {
  const [lidoData, setLidoData] = useState(0);

  const retrieveLidoApr = async () => {
    let result = await getLidoApy();
    let lidoApr = 0;

    if (result && result.totalRewards && result.totalRewards.length) {
      let aprValues = result.totalRewards.map((reward: any) => parseFloat(reward.apr));
      let validAprValues = aprValues.filter((value: any) => !isNaN(value));

      let aprSum = validAprValues.reduce((sum: any, value: any) => sum + value, 0);
      lidoApr = aprSum / validAprValues.length;
    }

    return lidoApr;
  };

  useEffect(() => {
    retrieveLidoApr().then((aprData) => {
      setLidoData(aprData);
    });
  }, []);

  return lidoData;
}
