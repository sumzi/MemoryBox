/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import Cartegori from '../components/Mybox/Cartegori';
import BoxList from '../components/Mybox/BoxList';
import { Wrapper, MapContainer } from '../styles/variables';
import { useMutation, useQuery } from 'react-query';
import { getLogout } from '../api/user';
import { getAllBox } from '../api/box';
import Nodata from '../components/Mybox/Nodata';
import Loading from '../components/Loading/Loading';

export default function mybox() {
  // const [click, setNextToggle] = useState(true);
  const [categori, setCategori] = useState(0);

  const { data, isLoading, refetch } = useQuery('alldata', async () => {
    return getAllBox();
  });

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const arr = [[], [], [], []];
  if (data) {
    data.boxList[0].box.map((value, idx) => {
      arr[value.boxType].push(value);
    });
  }
  const open = arr[3];
  const close = arr.slice(0, 3);
  const ChangeBoxMode = num => {
    // console.log(
    //   close[0].length === 0 && close[1].length === 0 && close[2].length === 0,
    // );
    const boxdata = arr[num];
    if (categori === 0) {
      return (
        <>
          {close[0].length === 0 &&
          close[1].length === 0 &&
          close[2].length === 0 ? (
            <Nodata state="ready" />
          ) : (
            close.map(
              (value, idx) => {
                return (
                  <>
                    {value.map((v, i) => {
                      return (
                        <BoxList
                          boxInfo={v}
                          key={idx}
                          num={v.boxType}
                          categori={categori}
                        />
                      );
                    })}
                  </>
                );
              },
              // }
            )
          )}
        </>
      );
    }
    return (
      <>
        {open.length !== 0 ? (
          open.map((value, idx) => {
            if (value !== null) {
              return (
                <>
                  <BoxList
                    boxInfo={value}
                    key={idx}
                    num={value.boxType}
                    categori={categori}
                  />
                </>
              );
            }
          })
        ) : (
          <Nodata />
        )}
      </>
    );
  };

  function changreCartegori(num) {
    setCategori(num);
    // setFirstClick(false);
  }

  return (
    // <MapContainer>
    <Wrapper>
      <Cartegori set={changreCartegori} cat={categori} />
      {ChangeBoxMode(categori)}
      <div style={{ marginBottom: '50px', height: '100px' }} />
    </Wrapper>
    // </MapContainer>
  );
}
